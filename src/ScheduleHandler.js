import schedule from 'node-schedule'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'
import ServerStore from './store/server'
const refreshWizToken = () => {
  schedule.scheduleJob('30 * * * * *', async () => {
    if (!ServerStore.state.isLogin || !fileStorage.isKeyExists('token')) return
    await api.AccountServerApi.keepTokenAlive()
  })
}

// const initializeApplication = () => {
//   ServerStore.actions('server/init')
//   ClientStore.actions('client/init')
// }

export default {
  RegisterScheduleJobs () {
    refreshWizToken()
  }
}
