import { search, send } from './api.js'

const reportPayload = {
    blocks: [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: "Oncall Report",
                emoji: true
            }
        },
        {
            type: "divider"
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Total Alerts*\n"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Acknowledged Alerts*\n"
                },
                {
                    type: "mrkdwn",
                    text: "*Noisy Alerts*\n"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Missed Alerts*\n"
                },
                {
                    type: "mrkdwn",
                    text: "*Noise to Signal Ratio*\n"
                }
            ]
        },
        {
            type: "divider"
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Error Code*\n"
                },
                {
                    type: "mrkdwn",
                    text: "*Count*\n"
                }
            ]
        },
        {
            type: "divider"
        }
    ]
}

export async function sendReport(total, acknowledged, noisy, totalAlertsMap) {
    const missedAlerts = total - acknowledged - noisy
    const noiseSignalRatio = ((noisy/total)*100).toFixed(2)

    reportPayload.blocks[2].fields[0].text += total + " :alert:"
    reportPayload.blocks[3].fields[0].text += acknowledged + " :acknowledged:"
    reportPayload.blocks[3].fields[1].text += noisy + " :ignore:"
    reportPayload.blocks[4].fields[0].text += missedAlerts + " :confused:"
    reportPayload.blocks[4].fields[1].text += noiseSignalRatio + "%"

    let errorCode = '';
    let errorCount = '';
    for (const [key, value] of totalAlertsMap[0].entries()) {
        let severity = totalAlertsMap[1].get(key)
        let e = key + ' - ' + severity
        let v = value
        if (severity === 'P0') {
            e = '*' + e + '*'
            v = '*' + v + '*'
        }
        errorCode += (e + '\n');
        errorCount += (v + '\n');
    }

    reportPayload.blocks[6].fields[0].text += errorCode
    reportPayload.blocks[6].fields[1].text += errorCount

    return send(reportPayload)
}

export const getTotalAlerts = async function() {
    const query = 'in: #oncall-alerts from:@AlertManager'
    return search(query).then(res => res.data.messages.total)
}

export const getAcknowledgedAlerts = async function() {
    const query = 'in: #oncall-alerts from:@AlertManager hasmy::acknowledged:'
    return search(query).then(res => res.data.messages.total)
}

export const getNoisyAlerts = async function() {
    const query = 'in: #oncall-alerts from:@AlertManager hasmy::ignore:'
    return search(query).then(res => res.data.messages.total)
}

export const getTotalAlertsMap = async function() {
    let countMap = new Map();
    let priorityMap = new Map();
    const query = 'in: #oncall-alerts from:@AlertManager'
    return search(query).then(function (res){
        let matches = res.data.messages.matches
        for (let i = 0; i < matches.length; i++) {
            let attachments = matches[i].attachments
            if (Array.isArray(attachments) === false || attachments.length === 0) {
                console.log("Empty attachments array");
                continue;
            }
            let t = attachments[0].title
            if (countMap.has(t)) {
                let value = countMap.get(t)
                countMap.set(t, value + 1);
            } else {
                countMap.set(t, 1);
            }
            let f = attachments[0].fields
            if (Array.isArray(f) === false || f.length === 0) {
                console.log("Empty fields array");
                continue;
            }
            for (let i = 0; i < f.length; i++) {
                if(f[i].title === 'severity'){
                    priorityMap.set(t, f[i].value)
                }
            }
        }
        return [countMap, priorityMap];
    });
}