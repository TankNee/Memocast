import schedule from 'node-schedule'
import api from 'src/utils/api'
import debugLogger from './utils/debugLogger'
import ServerFileStorage from './utils/storage/ServerFileStorage'
const refreshWizToken = (app) => {
  schedule.scheduleJob('30 * * * * *', async () => {
    if (!ServerFileStorage.isKeyExistsInLocalStorage('token') || !app.isLogin) return
    try {
      debugLogger.Log('Keep Token Alive')
      await api.AccountServerApi.keepTokenAlive()
    } catch (e) {
      await app.reLogin()
    }
  })
}

export default {
  RegisterScheduleJobs (app) {
    debugLogger.Info('[API Handler] Render Process registers schedule handler successfully!')
    refreshWizToken(app)
  }
}
