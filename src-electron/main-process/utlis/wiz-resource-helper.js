import FormData from 'form-data'
import fs from 'fs'
import request from 'request'
import { isBase64, saveBuffer, saveFileInTempPath } from './helper'
import path from 'path'

function postRequestAsync (url, options) {
  return new Promise((resolve, reject) => {
    request.post(url, options, (err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}

export async function uploadImagesByWiz (imagePaths, options) {
  const { kbGuid, docGuid, wizToken, baseUrl } = options
  const results = []
  try {
    for (const image of imagePaths) {
      const formData = new FormData()
      let buffer, filePath

      if (image instanceof Object && isBase64(image.file)) {
        const base64Data = image.file.replace(/^data:image\/\w+;base64,/, '')
        buffer = Buffer.from(base64Data, 'base64')
        filePath = saveFileInTempPath(buffer, path.extname(image.ext))
      } else {
        filePath = image
      }

      formData.append('data', fs.createReadStream(filePath))
      formData.append('kbGuid', kbGuid)
      formData.append('docGuid', docGuid)

      const result = await postRequestAsync(
        `${baseUrl}/ks/resource/upload/${kbGuid}/${docGuid}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Wiz-Token': wizToken
          },
          json: true,
          formData: {
            kbGuid,
            docGuid,
            data: fs.createReadStream(filePath)
          }
        }
      )
      const data = result.body.result
      saveBuffer(fs.readFileSync(filePath), kbGuid, docGuid, data.name)
      results.push({
        url: `memocast://memocast.app/${kbGuid}/${docGuid}/${data.name}`,
        name: data.name
      })
    }
    return {
      success: true,
      result: results
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      result: error
    }
  }
}
