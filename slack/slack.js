import { search, sendReport } from './api.js'

export const getTotalAlerts = async function() {
    const query = 'in: #oncall-alerts' // TODO: add from clause
    return search(query).then(result => result.messages.total)
}

export const getAcknowledgedAlerts = async function() {
    const query = 'in: #oncall-alerts hasmy::acknowledged:' // TODO: add from clause
    return search(query).then(result => result.messages.total)
}