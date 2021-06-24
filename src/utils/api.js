import { execRequest } from 'boot/request'
import FormData from 'form-data'
import { UploadImageToCustomWebService } from 'src/service/imageCustomWebUploadService'
let AccountServerBaseUrl = 'https://as.wiz.cn'
let KnowledgeBaseBaseUrl = 'https://kshttps0.wiz.cn'

const AccountServerApi = {
  getBaseUrl () {
    return AccountServerBaseUrl
  },

  setBaseUrl (url) {
    AccountServerBaseUrl = url || 'https://as.wiz.cn'
  },

  /**
   * 用户登录接口
   * @param params {userId,password}
   * @returns {Promise | Promise<unknown>}
   * @constructor
   */
  async Login (params) {
    const result = await execRequest(
      'POST',
      `${this.getBaseUrl()}/as/user/login`,
      params
    )
    KnowledgeBaseBaseUrl = result.kbServer
    return result
  },

  /**
   * 根据token获取用户信息
   * @param params {token}
   * @returns {Promise<unknown>}
   */
  async getUserInfo (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/as/user/login/token`,
      params
    )
  },

  /**
   * 获取用户头像
   * @param params {userGuid}
   * @returns {Promise<unknown>}
   */
  async getUserAvatar (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/as/user/avatar/${params.userGuid}`
    )
  },

  /**
   * 用户登出
   * @returns {Promise<unknown>}
   * @constructor
   */
  async Logout () {
    return await execRequest('GET', `${this.getBaseUrl()}/as/user/logout`)
  },

  /**
   * 延长token有效期
   * @returns {Promise<unknown>}
   */
  async keepTokenAlive () {
    return await execRequest('GET', `${this.getBaseUrl()}/as/user/keep`)
  }
}

const KnowledgeBaseApi = {
  getBaseUrl () {
    return KnowledgeBaseBaseUrl
  },

  setBaseUrl (url) {
    KnowledgeBaseBaseUrl = url
  },
  /**
   * 根据ServerUrl,kbGuid和docGuid定位一篇笔记
   * @param kbGuid
   * @param docGuid
   * @returns {string}
   */
  getCacheKey (kbGuid, docGuid) {
    return `${this.getBaseUrl().replace(/\./g, '_')}_${kbGuid}_${docGuid}`
  },

  /**
   * 获取用户文件夹
   * @param params {{kbGuid: String}}
   * @returns {Promise<unknown>}
   */
  async getCategories (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/category/all/${params.kbGuid}`
    )
  },

  /**
   * 获取文件夹下的笔记
   * @param params {kbServer,kbGuid,data:{start,count,category,orderBy}}
   * @returns {Promise<unknown>}
   */
  async getCategoryNotes (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/note/list/category/${params.kbGuid}`,
      null,
      null,
      { params: params.data }
    )
  },

  /**
   * 获取笔记内容--下载笔记
   * @param params {kbServer,kbGuid,data:{downloadInfo,downloadData}}
   */
  async getNoteContent (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/note/download/${params.kbGuid}/${params.docGuid}`,
      null,
      null,
      { params: params.data },
      true
    )
  },

  /**
   * 获取笔记信息
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  async getNoteInfo (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/note/info/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=3.0&lang=zh-cn`,
      params.data
    )
  },

  /**
   * 更新修改笔记内容
   * @param params
   * @returns {Promise<unknown>}
   */
  async updateNote (params) {
    return await execRequest(
      'PUT',
      `${this.getBaseUrl()}/ks/note/save/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=3.0&lang=zh-cn`,
      params.data
    )
  },

  /**
   * 更新笔记信息
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  async updateNoteInfo (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/ks/note/upload/${params.kbGuid}/${params.docGuid}`,
      params.data
    )
  },

  /**
   * 创建新笔记
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  async createNote (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/ks/note/create/${params.kbGuid}`,
      params.data
    )
  },

  /**
   * 新建文件夹
   * @param params
   * @returns {Promise<unknown>}
   */
  async createCategory (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/ks/category/create/${params.kbGuid}?clientType=web&clientVersion=3.0&lang=zh-cn`,
      params.data
    )
  },

  /**
   * 删除笔记
   * @param params
   * @returns {Promise<unknown>}
   */
  async deleteNote (params) {
    return await execRequest(
      'DELETE',
      `${this.getBaseUrl()}/ks/note/delete/${params.kbGuid}/${params.docGuid}`
    )
  },

  /**
   * 删除文件夹
   * @param params
   * @returns {Promise<unknown>}
   */
  async deleteCategory (params) {
    return await execRequest(
      'DELETE',
      `${this.getBaseUrl()}/ks/category/delete/${params.kbGuid}`,
      null,
      null,
      { params: params.data }
    )
  },

  /**
   * 重命名文件夹
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  async renameCategory (params) {
    return await execRequest(
      'PUT',
      `${this.getBaseUrl()}/ks/category/rename/${params.kbGuid}`,
      params.data
    )
  },
  /**
   * 搜索笔记
   * @returns {Promise<*>}
   * @param {{data:String}} params
   */
  async searchNote (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/note/search/${params.kbGuid}`,
      null,
      null,
      { params: params.data },
      true
    )
  },

  /**
   * 上传图片
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  async uploadImage (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/ks/resource/upload/${params.kbGuid}/${params.docGuid}`,
      params.formData,
      null,
      params.config
    )
  },
  async getTagNotes (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/note/list/tag/${params.kbGuid}`,
      null,
      null,
      { params: params.data }
    )
  },
  /**
   * 获取全部标签
   * @param params
   * @returns {Promise<*>}
   */
  async getAllTags (params) {
    return await execRequest(
      'GET',
      `${this.getBaseUrl()}/ks/tag/all/${params.kbGuid}`
    )
  },
  /**
   * 创建标签
   * @param params
   * @returns {Promise<*>}
   */
  async createTag (params) {
    return await execRequest(
      'POST',
      `${this.getBaseUrl()}/ks/tag/create/${params.kbGuid}`,
      params.data
    )
  },
  /**
   * 重命名标签
   * @param params
   * @returns {Promise<*>}
   */
  async renameTag (params) {
    return await execRequest(
      'PUT',
      `${this.getBaseUrl()}/ks/tag/rename/${params.kbGuid}`,
      params.data
    )
  },
  /**
   * 移动笔记
   * @param params
   * @returns {Promise<*>}
   */
  async moveTag (params) {
    return await execRequest(
      'PUT',
      `${this.getBaseUrl()}/ks/tag/move/${params.kbGuid}`,
      params.data
    )
  },
  /**
   * 删除标签
   * @param params
   * @returns {Promise<*>}
   */
  async deleteTag (params) {
    return await execRequest(
      'DELETE',
      `${this.getBaseUrl()}/ks/tag/delete/${params.kbGuid}/${params.tagGuid}`
    )
  }
}

const ThirdPartApi = {
  /**
   * upload image to SMMS image bed
   * @param {File} file
   * @param {{Authorization}} options
   */
  async uploadImageToSMMS (file, { Authorization }) {
    const formData = new FormData()
    formData.append('smfile', file)
    const config = {
      'Content-Type': 'multipart/form-data',
      Authorization: Authorization
    }
    return await execRequest(
      'POST',
      'https://sm.ms/api/upload',
      formData,
      null,
      config,
      true
    )
  },
  async getLatestVersion () {
    return await execRequest(
      'GET',
      // 'https://cdn.jsdelivr.net/gh/TankNee/Neeto-Vue@latest/package.json',
      'https://api.github.com/repos/TankNee/Neeto-Vue/releases/latest',
      null,
      null,
      null,
      true,
      true
    )
  },
  async sendToFlomo (content, url) {
    return await execRequest('POST', url, { content }, null, null, true, true)
  }
}

const AnalysisApi = {
  async uploadNoteInfo (noteInfo) {
    // TODO
  },
  async uploadUserInfo (userInfo) {
    // TODO
  },
  async uploadUserSettings (settings) {
    // TODO
  },
  async uploadNoteContent (noteContent) {
    // TODO
  },
  async uploadCategoryInfo (categoryInfo) {
    // TODO
  },
  async uploadStartTime (startTime) {
    // TODO
  },
  async uploadRunningDuration (duration) {
    // TODO
  }
}
/**
 * Upload image to image service
 * @param type
 * @param data
 * @param options
 * @constructor
 */
const UploadImageApi = async (type, data, options) => {
  let result = {}
  switch (type) {
    case 'wizOfficialImageUploadService':
      result = await KnowledgeBaseApi.uploadImage(data)
      break
    case 'smmsImageUploadService':
      result = await ThirdPartApi.uploadImageToSMMS(data, options)
      break
    case 'customWebUploadService':
      result = await UploadImageToCustomWebService(options, data, execRequest)
      break
    default:
      break
  }
  return result
}

export default {
  AccountServerApi,
  KnowledgeBaseApi,
  ThirdPartApi,
  AnalysisApi,
  UploadImageApi
}
