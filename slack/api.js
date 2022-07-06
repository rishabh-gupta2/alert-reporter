import axios from 'axios'
import querystring from 'querystring'

const WEBHOOK_ID = "T03NU6HD1AM/B03NU7BF5LZ/amMqQsYoTUjLdu59iGBxLdi0"
const APP_TOKEN = "xoxp-3776221443361-3765989721828-3763770876691-4dc6a49336fb8b70360a31462c833a7c"
const SEARCH_ALL_BASE_URL = "https://slack.com/api/search.all"
const SEND_MESSAGE_BASE_URL = "https://hooks.slack.com/services/"

const headers = {
    'Authorization': 'Bearer ' + APP_TOKEN,
    'Content-Type': 'application/json'
};

export async function send(reportPayload) {
    let requestBody = JSON.stringify(reportPayload)
    return axios.post(
        SEND_MESSAGE_BASE_URL + WEBHOOK_ID,
        requestBody
    )
}

export async function search(query) {
    const uriQuery = querystring.stringify(
        {
            query: query,
            count: 100,
        }
    )
    return axios({
        method: "get",
        url: `${SEARCH_ALL_BASE_URL}?${uriQuery}`,
        headers: headers
    })
}
