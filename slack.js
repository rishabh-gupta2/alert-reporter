const axios = require('axios');

const WEBHOOK_ID = "T03NU6HD1AM/B03NU7BF5LZ/amMqQsYoTUjLdu59iGBxLdi0"
const APP_TOKEN = "xoxp-3776221443361-3765989721828-3763770876691-4dc6a49336fb8b70360a31462c833a7c"
const SEARCH_ALL_BASE_URL = "https://slack.com/api/search.all"
const SEND_MESSAGE_BASE_URL = "https://hooks.slack.com/services/"

const headers = {
    'Authorization': 'Bearer ' + APP_TOKEN,
    'Content-Type': 'application/json'
};

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
                    text: "_Total Alerts_ -"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "_Acknowledged Alerts_ -"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "_Duplicate Alerts_ -"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "_Noisy Alerts_ -"
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: "_Signal to Noise Ratio_ -"
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
                    text: "*Error Code*"
                },
                {
                    type: "mrkdwn",
                    text: "*Count*"
                }
            ]
        }
    ]
};


const sendReport = async function() {
    let requestBody = JSON.stringify(reportPayload)
    console.log(requestBody)
    axios.post(
        SEND_MESSAGE_BASE_URL + WEBHOOK_ID,
        requestBody
    ).then(function(response) {
        console.log(response)
        if (response.data.error) {
            return alert(response.data.error.description);
        }
        return 0
    }).catch(function(error){
        // console.log(error)
        return Promise.reject(error)
    })
}

const search = async function() {
}

module.exports = {
    sendReport,
    search
};
