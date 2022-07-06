import axios from 'axios'
import querystring from 'querystring'

const WEBHOOK_ID = ""
const APP_TOKEN = "xoxp-3776221443361-3765989721828-3763770876691-4dc6a49336fb8b70360a31462c833a7c"

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
}


export const sendReport = async function() {
}

export async function search() {

    const query = querystring.stringify(
        {
            query: 'in:#oncall-alerts',
            count: 100,
        }
    )
    return axios({
        method: "get",
        url: `https://slack.com/api/search.all?${query}`,
        headers: {
            Authorization: `Bearer ${APP_TOKEN}`,
          },
    }).then(res => console.log(res.data))
}
