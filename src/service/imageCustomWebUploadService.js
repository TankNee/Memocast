/**
 * @Description: 将图片上传到任意的图片托管服务器
 * @Author: TankNee
 * @Date: 9/20/2020 10:50 AM
 **/
import FormData from 'form-data'
/**
 * generate post header as well as body
 * @param {File} image
 * @param {string} customHeader
 * @param {string} customBody
 * @param {string} url
 * @param {string} paramName
 * @param {string} fileName
 * @returns {{headers: {'User-Agent': string, contentType: string}, method: string, formData: {}, url: *}}
 * @origin https://github.com/yuki-xin/picgo-plugin-web-uploader/blob/8b38dc4f886d845940acb5db8cde776b203309d9/src/index.js#L61
 */
const generatePostOptions = (image, customHeader, customBody, url, paramName, fileName) => {
  let headers = {
    contentType: 'multipart/form-data'
  }
  if (customHeader) {
    headers = Object.assign(headers, JSON.parse(customHeader))
  }
  const formData = new FormData()
  // if (customBody) {
  //   formData = Object.assign(formData, JSON.parse(customBody))
  // }
  const opts = {
    method: 'POST',
    url: url,
    headers: headers,
    body: formData
  }
  opts.body.append(paramName, image)
  opts.body.append('options', { filename: fileName })
  return opts
}

/**
 * Upload image to custom web service
 * @param {apiServerUrl, postParam, jsonPath, customHeader, customBody} options
 * @param file
 * @param execRequest
 * @returns {Promise<*>}
 * @constructor
 */
export async function UploadImageToCustomWebService (options, file, execRequest) {
  const { apiServerUrl, postParam, jsonPath, customHeader, customBody } = options
  try {
    const { method, url, body, headers } = generatePostOptions(file, customHeader, customBody, apiServerUrl, postParam, file.name)
    const result = await execRequest(method, url, body, null, { headers }, true)
    if (!jsonPath) {
      return result
    } else {
      let imageUrl = result
      for (const path of jsonPath.split('.')) {
        imageUrl = imageUrl[path]
      }
      if (imageUrl) {
        return imageUrl
      }
    }
  } catch (e) {
    //
  }
}
