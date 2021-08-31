import { app } from 'electron'
import fs from 'fs'
import path from 'path'
import md5 from 'md5'
import axios from 'axios'

/**
 * 将文件保存到本地
 * @param {Buffer} file
 * @param {string} ext
 * @param specificPath
 * @returns {string}
 */
export function saveFileInTempPath (file, ext = '.png', specificPath = null) {
  const p = path.join(specificPath || app.getPath('temp'), `${md5(file)}${ext}`)
  if (fs.existsSync(p)) return p
  fs.writeFileSync(p, file)
  console.log(p)
  return p
}

export function getTempNoteDir (kbGuid, docGuid, rootDir = 'temp') {
  const root = path.join(app.getPath(rootDir), 'MemocastTempDir')
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }
  const kb = path.join(root, kbGuid)
  if (!fs.existsSync(kb)) {
    fs.mkdirSync(kb)
  }
  const doc = path.join(kb, docGuid)
  if (!fs.existsSync(doc)) {
    fs.mkdirSync(doc)
  }
  return doc
}

export async function cacheNoteImage (imageUrl, kbGuid, docGuid, resName = 'image.png') {
  const dir = path.join(getTempNoteDir(kbGuid, docGuid, 'appData'), resName)
  const result = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  fs.writeFileSync(dir, result.data)
  return dir
}

export function saveTempImage (file, kbGuid, docGuid) {
  const dir = getTempNoteDir(kbGuid, docGuid)
  const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = Buffer.from(base64Data, 'base64')
  return saveFileInTempPath(dataBuffer, '.png', dir)
}

export function isResourceExist (kbGuid, docGuid, resName) {
  const dir = getTempNoteDir(kbGuid, docGuid, 'appData')
  return fs.existsSync(path.join(dir, resName))
}

export function saveBuffer (file, kbGuid, docGuid, resName) {
  const dir = getTempNoteDir(kbGuid, docGuid, 'appData')
  fs.writeFileSync(path.join(dir, resName), file)
  return path.join(dir, resName)
}

export function isBase64 (str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  return str.indexOf('data:') !== -1 && str.indexOf('base64') !== -1
}

export function exportImageOfMarkdown (markdown, kbGuid, docGuid, resources = [], targetDir) {
  if (resources.length === 0 || !kbGuid || !docGuid || !targetDir) return markdown
  targetDir = path.parse(targetDir).dir
  if (!fs.existsSync(path.join(targetDir, 'ExportImage'))) {
    fs.mkdirSync(path.join(targetDir, 'ExportImage'))
  }
  resources.filter(r => fs.existsSync(path.join(getTempNoteDir(kbGuid, docGuid, 'appData'), r.name))).forEach(r => {
    const fullName = `memocast://memocast.app/${kbGuid}/${docGuid}/${r.name}`
    const srcDir = path.join(getTempNoteDir(kbGuid, docGuid, 'appData'), r.name)
    const destDir = path.join(targetDir, 'ExportImage')
    const imageSource = fs.readFileSync(srcDir)
    fs.writeFileSync(path.join(destDir, r.name), imageSource)
    markdown = markdown.replace(fullName, `ExportImage/${r.name}`)
  })
  // path.join(getTempNoteDir(kbGuid, docGuid, 'appData'), resName)
  return markdown
}
