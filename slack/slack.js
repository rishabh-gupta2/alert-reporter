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
        }
    ]
}

export async function sendReport(total, acknowledged, noisy) {
    const missedAlerts = total - acknowledged - noisy
    const noiseSignalRatio = ((noisy/total)*100).toFixed(2)

    reportPayload.blocks[2].fields[0].text += total + " :alert:"
    reportPayload.blocks[3].fields[0].text += acknowledged + " :acknowledged:"
    reportPayload.blocks[3].fields[1].text += noisy + " :ignore:"
    reportPayload.blocks[4].fields[0].text += missedAlerts + " :confused:"
    reportPayload.blocks[4].fields[1].text += noiseSignalRatio + "%"

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