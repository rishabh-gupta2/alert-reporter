import {getTotalAlerts, getAcknowledgedAlerts, getNoisyAlerts, sendReport, getTotalAlertsMap} from './slack/slack.js'

const totalAlerts = await getTotalAlerts()
const acknowledgedAlerts = await getAcknowledgedAlerts()
const noisyAlerts = await getNoisyAlerts()
const totalAlertsMap = await getTotalAlertsMap()

console.log(totalAlerts, acknowledgedAlerts, noisyAlerts)
console.log(totalAlertsMap)

sendReport(totalAlerts, acknowledgedAlerts, noisyAlerts, totalAlertsMap).then(res => console.log(res.data))
