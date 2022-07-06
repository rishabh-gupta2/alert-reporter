import { getTotalAlerts, getAcknowledgedAlerts } from './slack/slack.js'

const totalAlerts = await getTotalAlerts()
const acknowledgedAlerts = await getAcknowledgedAlerts()
console.log(totalAlerts, acknowledgedAlerts)

// 
