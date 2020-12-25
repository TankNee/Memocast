const axios = require('axios')
/**
 * upload images
 * @param {string[]} imagePaths
 * @returns Promise<response>
 */
export async function uploadImages (imagePaths) {
  const result = await axios.post('http://127.0.0.1:36677/upload', { list: imagePaths }, { timeout: 60 * 1000 })
  return result.data
}
