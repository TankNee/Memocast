import axios from 'axios'

axios.defaults.timeout = 50000 // 响应时间
const baseUrl = 'https://ac.wiz.cn'
axios.defaults.baseURL = baseUrl

export async function execRequest (config) {
  const response = await axios(config)
  return response.data
}
