// import channels from 'app/share/channels'
// import i18n from 'boot/i18n'
import fs from 'fs-extra'
import path from 'path'
import { sendNotification } from './api-invoker'
import { BrowserWindow } from 'electron'
import { checkUpdates, needUpdate, quitAndInstall } from './menu/actions/memocast'
import { cacheNoteImage, saveTempImage, saveBuffer } from './utlis/helper'
import { uploadImagesByWiz } from './utlis/wiz-resource-helper'
import { execRequest } from './service/request'

const { uploadImagesByPicGo } = require('./3rd-part/PicGoUtils')

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
    handleApi('export-markdown-file', (event, { content, title }) => {
      return dialog.showSaveDialog({
        title: 'Export',
        defaultPath: path.join(app.getPath('documents'), `${title}`),
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
            }, event).catch(err => throw err)
          })
      }).catch(err => throw err)
    }).catch(err => throw err)
    handleApi('export-png', (event, { content, title }) => {
      return dialog.showSaveDialog({
        title: 'Export',
        defaultPath: path.join(app.getPath('documents'), `${title}`),
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
          }, event).catch(err => throw err)
        })
          .catch(err => {
            sendNotification({
              msg: err.msg,
              type: 'negative',
              icon: 'delete'
            }, event).catch(err => throw err)
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
          }, event).catch(err => throw err)
        })
          .catch(err => {
            sendNotification({
              msg: err.msg,
              type: 'negative',
              icon: 'delete'
            }, event).catch(err => throw err)
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
    handleApi('upload-images', async (event, { imagePaths, type, options }) => {
      if (type === 'picgoServer') {
        const uploadResult = await uploadImagesByPicGo(imagePaths).catch(err => {
          if (err.errno === 'ECONNREFUSED') {
            sendNotification({
              msg: 'PicGo Upload Server Not Found!',
              type: 'negative',
              icon: 'delete'
            }, event).catch(err => throw err)
          }
        })
        return uploadResult
      } else if (type === 'wizOfficialImageUploadService') {
        const uploadResult = await uploadImagesByWiz(imagePaths, options).then()
        return uploadResult
      }
    }).catch(err => throw err)

    handleApi('get-cache-image', async (e, {
      imageUrl,
      kbGuid,
      docGuid
    }) => {
      return await cacheNoteImage(imageUrl, kbGuid, docGuid)
    }).catch(err => throw err)

    handleApi('save-temp-image', async (e, {
      file,
      kbGuid,
      docGuid
    }) => {
      return saveTempImage(file, kbGuid, docGuid)
    }).catch(err => throw err)

    handleApi('get-local-file-data', async (e, filePath) => {
      if (!fs.existsSync(filePath)) return null
      return fs.readFileSync(filePath)
    }).catch(err => throw err)

    handleApi('save-uploaded-image', async (e, { buffer, name, kbGuid, docGuid }) => {
      return saveBuffer(buffer, kbGuid, docGuid, name)
    }).catch(err => throw err)

    handleApi('check-update', async (e) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      checkUpdates(win)
    }).catch(err => throw err)

    handleApi('need-update', async (e, need) => {
      needUpdate(need)
    }).catch(err => throw err)

    handleApi('quit-and-install', async (e) => {
      quitAndInstall()
    }).catch(err => throw err)

    handleApi('remote-request', async (e, config) => {
      return execRequest(config)
    }).catch(err => throw err)
  }
}
