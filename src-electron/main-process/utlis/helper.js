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

export function getTempNoteDir (kbGuid, docGuid) {
  const root = path.join(app.getPath('temp'), 'MemocastTempDir')
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

export async function cacheNoteImage (imageUrl, kbGuid, docGuid) {
  const dir = getTempNoteDir(kbGuid, docGuid)
  const base64 = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  return saveFileInTempPath(base64, '.png', dir)
}

export function isBase64 (str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  return str.indexOf('data:') !== -1 && str.indexOf('base64') !== -1
}
