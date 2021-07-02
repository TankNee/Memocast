import { app } from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * 将文件保存到本地
 * @param {Buffer} file
 * @param name
 * @param {string} ext
 * @returns {string}
 */
export function saveFileInTempPath (file, name = Date.now(), ext = '.png') {
  console.log('Save', file, name = Date.now(), ext = '.png')
  const p = path.join(app.getPath('temp'), `${name}${ext}`)
  fs.writeFileSync(p, file)
  console.log(p)
  return p
}

export function isBase64 (str) {
  if (str === '' || str.trim() === '') {
    return false
  }
  return str.indexOf('data:') !== -1 && str.indexOf('base64') !== -1
}
