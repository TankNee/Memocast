import request from 'boot/request'

const fetchPost = request.fetchPost
const fetchGet = request.fetchGet
const fetchPut = request.fetchPut
const fetchDelete = request.fetchDelete
const setBaseUrl = request.setBaseUrl
const getBaseUrl = request.getBaseUrl
export default {
  getBaseUrl () {
    return getBaseUrl()
  },
  /**
   * 设置基础url地址
   * @param url
   */
  setBaseUrl (url) {
    return setBaseUrl(url)
  },
  /**
   * 用户登录接口
   * @param params {userId,password}
   * @returns {Promise | Promise<unknown>}
   */
  Login (params) {
    return fetchPost('/as/user/login', params)
  },
  /**
   * 根据token获取用户信息
   * @param params {token}
   * @returns {Promise<unknown>}
   */
  getUserInfo (params) {
    return fetchPost('/as/user/login/token', params)
  },
  /**
   * 获取用户头像
   * @param params {userGuid}
   * @returns {Promise<unknown>}
   */
  getUserAvatar (params) {
    return fetchGet(`/as/user/avatar/${params.userGuid}`)
  },
  /**
   * 用户登出
   * @param params {none}
   * @returns {Promise<unknown>}
   * @constructor
   */
  Logout (params) {
    return fetchGet('/as/user/logout')
  },
  /**
   * 获取用户文件夹
   * @param params {kbServer,kbGuid}
   * @returns {Promise<unknown>}
   */
  getFolders (params) {
    return fetchGet(`/ks/category/all/${params.kbGuid}`)
  },
  /**
   * 获取文件夹下的笔记
   * @param params {kbServer,kbGuid,data:{start,count,category,orderBy}}
   * @returns {Promise<unknown>}
   */
  getFolderNotes (params) {
    return fetchGet(`/ks/note/list/category/${params.kbGuid}`, params.data)
  },
  /**
   * 获取笔记内容--下载笔记
   * @param params {kbServer,kbGuid,data:{downloadInfo,downloadData}}
   */
  getNoteContent (params) {
    return fetchGet(`/ks/note/download/${params.kbGuid}/${params.docGuid}`, params.data)
  },
  /**
   * 获取笔记信息
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  getNoteInfo (params) {
    return fetchGet(`/ks/note/info/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`)
  },
  /**
   * 更新修改笔记内容
   * @param params
   * @returns {Promise<unknown>}
   */
  updateNote (params) {
    return fetchPut(`/ks/note/save/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`, params.data)
  },
  /**
   * 更新笔记信息
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  updateNoteInfo (params) {
    return fetchPost(`/ks/note/upload/${params.kbGuid}/${params.docGuid}`, params.data)
  },
  /**
   * 创建新笔记
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  createNote (params) {
    return fetchPost(`/ks/note/create/${params.kbGuid}`, params.data)
  },
  /**
   * 新建文件夹
   * @param params
   * @returns {Promise<unknown>}
   */
  createCategory (params) {
    return fetchPost(`/ks/category/create/${params.kbGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`, params.data)
  },
  /**
   * 删除笔记
   * @param params
   * @returns {Promise<unknown>}
   */
  deleteNote (params) {
    return fetchDelete(`/ks/note/delete/${params.kbGuid}/${params.docGuid}`)
  },
  /**
   * 删除文件夹
   * @param params
   * @returns {Promise<unknown>}
   */
  deleteCategory (params) {
    return fetchDelete(`/ks/category/delete/${params.kbGuid}`, params.data)
  },
  /**
   * 重命名文件夹
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  renameCategory (params) {
    return fetchPut(`/ks/category/rename/${params.kbGuid}`, params.data)
  },
  /**
   * 上传图片
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  uploadImage (params) {
    return fetchPost(`/ks/resource/upload/${params.kbGuid}/${params.docGuid}`, params.formData)
  },
  /**
   * 延长token有效期
   * @param params
   * @returns {Promise<unknown>}
   */
  keepTokenAlive (params) {
    return fetchGet('/as/user/keep')
  }
}
