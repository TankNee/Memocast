// import channels from 'app/share/channels'
// import i18n from 'boot/i18n'
import fs from 'fs-extra'
import path from 'path'
import { sendNotification } from './api-invoker'
import { BrowserWindow } from 'electron'
import { checkUpdates, needUpdate } from './menu/actions/memocast'
const { uploadImages } = require('./3rd-part/PicGoUtils')
const {
  ipcMain,
  app,
  dialog
} = require('electron')
const sanitize = require('sanitize-filename')
/**
 * 在本地注册对应的事件句柄，用于解决对应的事件
 * @param {string} channel 频道名称
 * @param {Function} api 操作函数
 * @returns {Promise<void>}
 */
async function handleApi (channel, api) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      const ret = await api(event, ...args)
      return ret
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
  registerApiHandler () {
    /**
     *  export single note
     */
    handleApi('export-markdown-file', (event, content) => {
      return dialog.showSaveDialog({
        title: 'Export',
        defaultPath: app.getPath('documents'),
        filters: [
          {
            name: 'Markdown File',
            extensions: ['md', 'markdown']
          }
        ]
      }).then((result) => {
        if (result.canceled) return
        fs.writeFile(result.filePath, content).then(() => {
          sendNotification({
            msg: 'ExportSuccessfully',
            type: 'positive',
            icon: 'check',
            filePath: result.filePath
          }).catch(err => throw err)
        })
          .catch(err => {
            sendNotification({
              msg: err.msg,
              type: 'negative',
              icon: 'delete'
            }).catch(err => throw err)
          })
      }).catch(err => throw err)
    }).catch(err => throw err)
    handleApi('export-png', (event, content) => {
      return dialog.showSaveDialog({
        title: 'Export',
        defaultPath: app.getPath('documents'),
        filters: [
          {
            name: 'Portable Network Graphics',
            extensions: ['png']
          }
        ]
      }).then((result) => {
        if (result.canceled) return
        const base64 = content.replace(/^data:image\/\w+;base64,/, '')
        const baseUrl = Buffer.from(base64, 'base64')
        fs.writeFile(result.filePath, baseUrl).then(() => {
          sendNotification({
            msg: 'ExportSuccessfully',
            type: 'positive',
            icon: 'check',
            filePath: result.filePath
          }).catch(err => throw err)
        })
          .catch(err => {
            sendNotification({
              msg: err.msg,
              type: 'negative',
              icon: 'delete'
            }).catch(err => throw err)
          })
      }).catch(err => throw err)
    }).catch(err => throw err)

    /**
     * batch export notes
     */
    handleApi('export-markdown-files', (event, { contents, category }) => {
      return dialog.showOpenDialog({
        title: 'Export',
        defaultPath: app.getPath('documents'),
        properties: [
          'openDirectory',
          'createDirectory'
        ],
        buttonLabel: 'Confirm'
      }).then((result) => {
        const directoryPath = path.join(result.filePaths[0], category)
        if (result.canceled) return
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath)
        }
        const promises = contents.map(({
          content,
          title
        }) => {
          title = sanitize(title)
          return fs.writeFile(path.join(directoryPath, `${title}.md`), content).catch(err => throw err)
        })
        return Promise.all(promises).then(() => {
          sendNotification({
            msg: 'ExportSuccessfully',
            type: 'positive',
            icon: 'check',
            filePath: directoryPath
          }).catch(err => throw err)
        })
          .catch(err => {
            sendNotification({
              msg: err.msg,
              type: 'negative',
              icon: 'delete'
            }).catch(err => throw err)
          })
      }).catch(err => throw err)
    }).catch(err => throw err)
    /**
     * batch import images
     */
    handleApi('import-images', async (event) => {
      const result = await dialog.showOpenDialog({
        title: 'Import Images',
        defaultPath: app.getPath('pictures'),
        properties: ['multiSelections', 'openFile']
      })
      if (result.canceled) return
      return result.filePaths
    }).catch(err => throw err)
    /**
     *  Upload Images
     */
    handleApi('upload-images', async (event, imagePaths) => {
      const uploadResult = await uploadImages(imagePaths).catch(err => {
        if (err.errno === 'ECONNREFUSED') {
          sendNotification({
            msg: 'PicGo Upload Server Not Found!',
            type: 'negative',
            icon: 'delete'
          }).catch(err => throw err)
        }
      })
      return uploadResult
    }).catch(err => throw err)

    handleApi('check-update', async (e) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      checkUpdates(win)
    }).catch(err => throw err)

    handleApi('need-update', async (e, need) => {
      needUpdate(need)
    }).catch(err => throw err)
  }
}
