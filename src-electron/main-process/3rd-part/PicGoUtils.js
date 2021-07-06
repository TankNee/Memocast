// eslint-disable-next-line import/named
import { isBase64, saveFileInTempPath } from '../utlis/helper'
import path from 'path'

const axios = require('axios')

/**
 * upload images
 * @param {({ext: string, file: (*|string)} | string)[]} imagePaths
 * @returns Promise<response>
 */
export async function uploadImagesByPicGo (imagePaths) {
  const uploadPaths = []
  for (let i = 0; i < imagePaths.length; i++) {
    const image = imagePaths[i]
    if (image instanceof Object && isBase64(image.file)) {
      const base64Data = image.file.replace(/^data:image\/\w+;base64,/, '')
      const dataBuffer = Buffer.from(base64Data, 'base64')
      uploadPaths.push(saveFileInTempPath(dataBuffer, path.extname(image.ext)))
    } else {
      uploadPaths.push(image)
    }
  }

  const result = await axios.post('http://127.0.0.1:36677/upload', { list: uploadPaths }, { timeout: 60 * 1000 })
  return result.data
}
