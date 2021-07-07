import channels from 'app/share/channels'

const { ipcRenderer } = require('electron')

/**
 * 导出markdown文件到本地
 * @param note 笔记对象
 * @returns {Promise<void>}
 */
async function exportMarkdownFile (note) {
  return ipcRenderer.invoke(channels.exportMarkdownFile, note)
}

async function exportPng (note) {
  return ipcRenderer.invoke(channels.exportPng, note)
}

/**
 * 批量导出markdown文件
 * @param notes 笔记列表
 * @returns {Promise<any>}
 */
async function exportMarkdownFiles (notes) {
  return ipcRenderer.invoke(channels.exportMarkdownFiles, notes)
}

/**
 * import images
 * @returns {Promise<string[]>}
 */
async function importImages () {
  return ipcRenderer.invoke(channels.importImages)
}

/**
 * @param {({ext: string, file: (*|string)} | string)[]} imagePaths
 * @returns {Promise<any>}
 */
async function uploadImages (imagePaths, type, options = {}) {
  return ipcRenderer.invoke(channels.uploadImages, { imagePaths, type, options })
}

async function checkUpdate () {
  return ipcRenderer.invoke(channels.checkUpdate)
}

async function needUpdate (need) {
  return ipcRenderer.invoke(channels.needUpdate, need)
}

async function quitAndUpdate () {
  return ipcRenderer.invoke(channels.quitAndUpdate)
}

async function remoteRequest (config) {
  return ipcRenderer.invoke(channels.remoteRequest, config)
}

/**
 * 拿到缓存在本地的文件
 * @param {{imageUrl:string, kbGuid:string, docGuid:string}} bundle
 * @returns {Promise<any>}
 */
async function getCacheImage (bundle) {
  return ipcRenderer.invoke(channels.getCacheImage, bundle)
}

/**
 * 将文件保存到临时文件夹
 * @param {{file:string, kbGuid:string, docGuid:string}} bundle
 * @returns {string}
 */
async function saveTempImage (bundle) {
  return ipcRenderer.invoke(channels.saveTempImage, bundle)
}

async function getLocalFileData (filePath) {
  return ipcRenderer.invoke(channels.getLocalFileData, filePath)
}

async function saveUploadedImage (buffer, kbGuid, docGuid, name) {
  return ipcRenderer.invoke(channels.saveUploadedImage, { buffer, kbGuid, docGuid, name })
}

export {
  exportMarkdownFile,
  exportPng,
  exportMarkdownFiles,
  importImages,
  uploadImages,
  checkUpdate,
  needUpdate,
  quitAndUpdate,
  remoteRequest,
  getCacheImage,
  saveTempImage,
  getLocalFileData,
  saveUploadedImage
}
