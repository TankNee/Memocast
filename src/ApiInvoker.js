import channels from 'app/share/channels'

const { ipcRenderer } = require('electron')

/**
 * 导出markdown文件到本地
 * @param note 笔记对象
 * @returns {Promise<void>}
 */
async function exportMarkdownFile (note) {
  return await ipcRenderer.invoke(channels.exportMarkdownFile, note)
}

/**
 * 批量导出markdown文件
 * @param notes 笔记列表
 * @returns {Promise<any>}
 */
async function exportMarkdownFiles (notes) {
  return await ipcRenderer.invoke(channels.exportMarkdownFiles, notes)
}

/**
 * import images
 * @returns {Promise<string[]>}
 */
async function importImages () {
  return await ipcRenderer.invoke(channels.importImages)
}

/**
 * @param {({ext: string, file: (*|string)} | string)[]} imagePaths
 * @returns {Promise<any>}
 */
async function uploadImages (imagePaths) {
  return await ipcRenderer.invoke(channels.uploadImages, imagePaths)
}

async function checkUpdate () {
  return await ipcRenderer.invoke(channels.checkUpdate)
}

async function needUpdate (need) {
  return await ipcRenderer.invoke(channels.needUpdate, need)
}

async function quitAndUpdate () {
  return await ipcRenderer.invoke(channels.quitAndUpdate)
}

export {
  exportMarkdownFile,
  exportMarkdownFiles,
  importImages,
  uploadImages,
  checkUpdate,
  needUpdate,
  quitAndUpdate
}
