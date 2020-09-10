import axios from 'axios'
import bus from 'components/bus'
import events from 'src/constants/events'
import fileStorage from 'src/utils/fileStorage'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
// var baseUrl = 'http://127.0.0.1:6880';
var baseUrl = 'https://oj.tanknee.cn'
// axios.defaults.baseURL = 'http://nezha.neeto.cn';   //配置接口地址
axios.defaults.baseURL = baseUrl

export async function execRequest (method, url, body, token, extraConfig) {
  const config = {
    url,
    method,
    data: body
  }

  if (token) {
    config.headers = {
      'X-Wiz-Token': token
    }
  } else if (fileStorage.isKeyExists('token')) {
    config.headers = {
      'X-Wiz-Token': fileStorage.getValueFromLocalStorage('token')
    }
  }

  Object.assign(config, extraConfig)

  const res = await axios(config)
  const data = res.data

  if (data.returnCode !== 200) {
    const { returnMessage, returnCode } = data
    bus.$emit(events.REQUEST_ERROR, returnMessage)
    const err = new Error(returnMessage)
    err.code = returnCode
    err.externCode = data.externCode
    throw err
  }

  return ('result' in data) ? data.result : data
}

export default ({ app }) => {
  // Set axios instance on app
  app.axios = axios
}
