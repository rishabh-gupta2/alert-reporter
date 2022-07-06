const axios = require('axios');

const WEBHOOK_ID = ""
const APP_TOKEN = ""

const reportPayload = {
    blocks: [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Edge Performance Report"
            }
        },
        {
            "type": "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: ""
            }
        },
        {
            "type": "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: ""
            }
        },
        {
            "type": "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: ""
            }
        }
    ]
};


export function sendReport() {
}

export function search() {
}
