import axios from 'axios'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
// var baseUrl = 'http://127.0.0.1:6880';
var baseUrl = 'https://oj.tanknee.cn'
// axios.defaults.baseURL = 'http://nezha.neeto.cn';   //配置接口地址
axios.defaults.baseURL = baseUrl
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject()
    }
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

// 返回一个Promise(发送post请求)
function fetchPost (url, params) {
  var token
  if (localStorage.getItem('userSettings')) {
    token = JSON.parse(localStorage.getItem('userSettings')).token
    axios.defaults.headers.post['X-Wiz-Token'] = token
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
function fetchGet (url, params) {
  var token, config
  config = { params: params }
  if (localStorage.getItem('userSettings')) {
    token = JSON.parse(localStorage.getItem('userSettings')).token
    config.headers = {
      'X-Wiz-Token': token
    }
  }
  console.log(token)
  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 更新操作
function fetchPut (url, params) {
  let token
  const config = {}
  if (localStorage.getItem('userSettings')) {
    token = JSON.parse(localStorage.getItem('userSettings')).token
    config.headers = {
      'X-Wiz-Token': token
    }
  }
  console.log(token)
  return new Promise((resolve, reject) => {
    axios.put(url, params, config)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 删除操作
function fetchDelete (url, params) {
  var token, config
  config = { params: params }
  if (localStorage.getItem('userSettings')) {
    token = JSON.parse(localStorage.getItem('userSettings')).token
    config.headers = {
      'X-Wiz-Token': token
    }
  }
  return new Promise((resolve, reject) => {
    axios.delete(url, config)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 设置基础url地址
function setBaseUrl (url) {
  axios.defaults.baseURL = url
}

// 获取基础url地址
function getBaseUrl () {
  return axios.defaults.baseURL
}
export default ({ app }) => {
  // Set axios instance on app
  app.axios = axios
}
export {
  fetchPost,
  fetchGet,
  fetchPut,
  fetchDelete,
  setBaseUrl,
  getBaseUrl
}
