import axios from 'axios'
import bus from 'components/bus'
import events from 'src/constants/events'
import fileStorage from 'src/utils/fileStorage'
import NeetoError from 'app/share/error'

axios.defaults.timeout = 5000 // 响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
const baseUrl = 'https://ac.wiz.cn'
axios.defaults.baseURL = baseUrl

/**
 * exec network request
 * @param method
 * @param url
 * @param body
 * @param token
 * @param extraConfig
 * @param returnFullResult
 * @returns {Promise<*>}
 */
export async function execRequest (method, url, body, token, extraConfig, returnFullResult = false) {
  const config = {
    url,
    method,
    data: body
  }

  if (token) {
    config.headers = {
      'X-Wiz-Token': token
    }
  } else if (fileStorage.isKeyExistsInLocalStorage('token')) {
    config.headers = {
      'X-Wiz-Token': fileStorage.getValueFromLocalStorage('token')
    }
  }

  Object.assign(config, extraConfig)

  const res = await axios(config)
  const data = res.data

  if (data.returnCode !== 200 && data.code !== 200) {
    const { returnMessage, returnCode, externCode } = data
    bus.$emit(events.REQUEST_ERROR, new NeetoError(returnMessage, returnCode, externCode))
    const err = new Error(returnMessage)
    err.code = returnCode
    err.externCode = data.externCode
    throw err
  }

  return ('result' in data || !returnFullResult) ? data.result : data
}

export default ({ app }) => {
  // Set axios instance on app
  app.axios = axios
}
