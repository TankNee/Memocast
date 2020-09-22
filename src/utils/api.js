import { execRequest } from '../boot/request'
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
      `${AccountServerBaseUrl}/as/user/login`,
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
      `${AccountServerBaseUrl}/as/user/login/token`,
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
      `${AccountServerBaseUrl}/as/user/avatar/${params.userGuid}`
    )
  },

  /**
   * 用户登出
   * @returns {Promise<unknown>}
   * @constructor
   */
  async Logout () {
    return await execRequest('GET', `${AccountServerBaseUrl}/as/user/logout`)
  },

  /**
   * 延长token有效期
   * @returns {Promise<unknown>}
   */
  async keepTokenAlive () {
    return await execRequest('GET', `${AccountServerBaseUrl}/as/user/keep`)
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
   * 获取用户文件夹
   * @param params {{kbGuid: String}}
   * @returns {Promise<unknown>}
   */
  async getCategories (params) {
    return await execRequest(
      'GET',
      `${KnowledgeBaseBaseUrl}/ks/category/all/${params.kbGuid}`
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
      `${KnowledgeBaseBaseUrl}/ks/note/list/category/${params.kbGuid}`,
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
      `${KnowledgeBaseBaseUrl}/ks/note/download/${params.kbGuid}/${params.docGuid}`,
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
      `${KnowledgeBaseBaseUrl}/ks/note/info/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`
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
      `${KnowledgeBaseBaseUrl}/ks/note/save/${params.kbGuid}/${params.docGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`,
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
      `${KnowledgeBaseBaseUrl}/ks/note/upload/${params.kbGuid}/${params.docGuid}`,
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
      `${KnowledgeBaseBaseUrl}/ks/note/create/${params.kbGuid}`,
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
      `${KnowledgeBaseBaseUrl}/ks/category/create/${params.kbGuid}?clientType=web&clientVersion=4.0&lang=zh-cn`,
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
      `${KnowledgeBaseBaseUrl}/ks/note/delete/${params.kbGuid}/${params.docGuid}`
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
      `${KnowledgeBaseBaseUrl}/ks/category/delete/${params.kbGuid}`,
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
      `${KnowledgeBaseBaseUrl}/ks/category/rename/${params.kbGuid}`,
      params.data
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
      `${KnowledgeBaseBaseUrl}/ks/resource/upload/${params.kbGuid}/${params.docGuid}`,
      params.formData,
      null,
      params.config
    )
  }
}

const ThirdPartApi = {
  /**
   * upload image to SMMS image bed
   * @param {File} files
   */
  async uploadImageToSMMS (file) {
    const formData = new FormData()
    formData.append('smfile', file)
    return await execRequest(
      'POST',
      'https://sm.ms/api/upload',
      formData,
      null,
      null,
      true
    )
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
      result = await ThirdPartApi.uploadImageToSMMS(data)
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
  UploadImageApi
}
