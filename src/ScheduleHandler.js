import schedule from 'node-schedule'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'
const refreshWizToken = (app) => {
  schedule.scheduleJob('30 * * * * *', async () => {
    if (!fileStorage.isKeyExistsInLocalStorage('token') || !app.isLogin) return
    await api.AccountServerApi.keepTokenAlive()
  })
}

export default {
  RegisterScheduleJobs (app) {
    refreshWizToken(app)
  }
}
