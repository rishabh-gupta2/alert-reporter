import {getTotalAlerts, getAcknowledgedAlerts, getNoisyAlerts, sendReport} from './slack/slack.js'

const totalAlerts = await getTotalAlerts()
const acknowledgedAlerts = await getAcknowledgedAlerts()
const noisyAlerts = await getNoisyAlerts()

console.log(totalAlerts, acknowledgedAlerts, noisyAlerts)

sendReport(totalAlerts, acknowledgedAlerts, noisyAlerts).then(res => console.log(res.data))
