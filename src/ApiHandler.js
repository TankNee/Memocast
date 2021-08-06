import { ipcRenderer, shell } from 'electron'
import { Notify } from 'quasar'
import bus from 'components/bus'
import events from 'src/constants/events'
import { i18n } from '../src/boot/i18n'
import debugLogger from './utils/debugLogger'

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
    debugLogger.Info('[API Handler] Render Process registers handler successfully!')

    handleApi('show-notification', (event, payload) => {
      const { msg, type = 'primary', icon = 'check', filePath } = payload
      if (filePath) {
        Notify.create({
          type: type,
          message: i18n.t(msg),
          icon: icon,
          actions: [
            {
              icon: 'open_in_new',
              textColor: 'white',
              handler: () => {
                shell.showItemInFolder(filePath)
              }
            }
          ]
        })
      } else {
        Notify.create({
          type: type,
          message: msg,
          icon: icon
        })
      }
    }).catch(err => throw err)

    handleApi('editor-paragraph-action', (event, { type }) => {
      bus.$emit(events.PARAGRAPH_SHORTCUT_CALL, type)
    }).catch(err => throw err)

    handleApi('editor-edit-action', (event, { type }) => {
      bus.$emit(events.EDIT_SHORTCUT_CALL[type], type)
    }).catch(err => throw err)

    handleApi('editor-format-action', (event, { type }) => {
      if (type === 'format-document') {
        bus.$emit(events.EDIT_SHORTCUT_CALL.formatDocumentByPangu)
        return
      }
      bus.$emit(events.FORMAT_SHORTCUT_CALL, type)
    }).catch(err => throw err)

    handleApi('editor-view-action', (event, { type }) => {
      debugLogger.Log(type)
      bus.$emit(events.VIEW_SHORTCUT_CALL[type], type)
    }).catch(err => throw err)

    handleApi('editor-note-action', (event, { type }) => {
      bus.$emit(events.NOTE_SHORTCUT_CALL[type], true)
    }).catch(err => throw err)

    handleApi('updater-update-available', (event, info) => {
      debugLogger.Log(info)
      bus.$emit(events.UPDATE_EVENTS.updateAvailable, info)
    }).catch(err => throw err)

    handleApi('updater-update-not-available', (event, info) => {
      debugLogger.Log(info)
      bus.$emit(events.UPDATE_EVENTS.updateNotAvailable, info)
    }).catch(err => throw err)

    handleApi('updater-update-downloading', (event, progress) => {
      debugLogger.Log(progress)
      bus.$emit(events.UPDATE_EVENTS.updateDownloading, progress)
    }).catch(err => throw err)

    handleApi('updater-update-downloaded', (event, info) => {
      debugLogger.Log(info)
      bus.$emit(events.UPDATE_EVENTS.updateDownloaded)
    }).catch(err => throw err)

    handleApi('updater-update-error', (event, error) => {
      debugLogger.Log(error)
      bus.$emit(events.UPDATE_EVENTS.updateError, error)
    }).catch(err => throw err)
  },
  UnregisterApiHandler () {
    debugLogger.Info('[API Handler] Render Process unregisters handler successfully!')
    ipcRenderer.removeAllListeners('show-notification')
  }
}
