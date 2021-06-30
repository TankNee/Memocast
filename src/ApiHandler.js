import { ipcRenderer } from 'electron'
import { Notify } from 'quasar'
import bus from 'components/bus'
import events from 'src/constants/events'

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

    handleApi('editor-paragraph-action', (event, { type }) => {
      bus.$emit(events.PARAGRAPH_SHORTCUT_CALL, type)
    }).catch(err => throw err)

    handleApi('editor-edit-action', (event, { type }) => {
      bus.$emit(events.EDIT_SHORTCUT_CALL[type], type)
    }).catch(err => throw err)

    handleApi('editor-format-action', (event, { type }) => {
      bus.$emit(events.FORMAT_SHORTCUT_CALL, type)
    }).catch(err => throw err)

    handleApi('editor-view-action', (event, { type }) => {
      console.log(type)
      bus.$emit(events.VIEW_SHORTCUT_CALL[type], type)
    }).catch(err => throw err)

    handleApi('updater-update-available', (event, info) => {
      console.log(info)
      bus.$emit(events.UPDATE_EVENTS.UPDATE_AVAILABLE, info)
    })
  },
  UnregisterApiHandler () {
    console.log('[API Handler] Render Process unregisters handler successfully!')
    ipcRenderer.removeAllListeners('show-notification')
  }
}
