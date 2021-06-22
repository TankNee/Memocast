import { ipcRenderer } from 'electron'
import { Notify } from 'quasar'

/**
 * 在本地注册对应的事件句柄，用于解决对应的事件
 * @param {string} channel 频道名称
 * @param {Function} api 操作函数
 * @returns {Promise<void>}
 */
async function handleApi (channel, api) {
  ipcRenderer.setMaxListeners(200000)
  ipcRenderer.on(channel, async (event, ...args) => {
    try {
      return await api(event, ...args)
    } catch (err) {
      console.error(err)
      return {
        error: {
          code: err.code,
          message: err.message,
          externCode: err.externCode,
          sourceStack: err.stack,
          isNetworkError: err.isAxiosError,
          networkStatus: err.response?.status
        }
      }
    }
  })
}

export default {
  RegisterApiHandler () {
    console.log('[API Handler] Render Process registers handler successfully!')

    handleApi('show-notification', (event, payload) => {
      const { msg, type = 'primary', icon = 'check' } = payload
      Notify.create({
        type: type,
        message: msg,
        icon: icon
      })
    }).catch(err => throw err)
  },
  UnregisterApiHandler () {
    console.log('[API Handler] Render Process unregisters handler successfully!')
    ipcRenderer.removeAllListeners('show-notification')
  }
}
