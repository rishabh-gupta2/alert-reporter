import { search, sendReport } from './slack.js'

search().then(res => console.log(res.data))
sendReport().then(res => console.log(res.data))
