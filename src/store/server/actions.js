import types from 'src/store/server/types'
import api from 'src/utils/api'
import { Notify, Dialog, Loading, QSpinnerGears, Dark } from 'quasar'
import helper from 'src/utils/helper'
import { i18n } from 'boot/i18n'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'
import ServerFileStorage from 'src/utils/storage/ServerFileStorage'
import _ from 'lodash'
import { exportMarkdownFile, exportMarkdownFiles, saveTempImage, uploadImages, exportPng } from 'src/ApiInvoker'
import html2canvas from 'html2canvas'

export async function _getContent (kbGuid, docGuid) {
  const { info } = await api.KnowledgeBaseApi.getNoteContent({
    kbGuid,
    docGuid,
    data: {
      downloadInfo: 1
    }
  })
  const cacheKey = api.KnowledgeBaseApi.getCacheKey(kbGuid, docGuid)
  const note = ClientFileStorage.getCachedNote(info, cacheKey)
  let result
  if (!helper.isNullOrEmpty(note)) {
    result = note
  } else {
    result = await api.KnowledgeBaseApi.getNoteContent({
      kbGuid,
      docGuid,
      data: {
        downloadInfo: 1,
        downloadData: 1
      }
    })
    ClientFileStorage.setCachedNote(result, cacheKey)
  }
  return result
}

function readFileAsync (f) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const base64 = event.target.result
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(f)
  })
}

export default {
  /**
   * 从本地缓存中读取数据，初始化状态树
   * @param commit
   * @param state
   */
  async initServerStore ({
    commit,
    state
  }) {
    const localStore = ClientFileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
    ServerFileStorage.removeItemFromLocalStorage('token')
    const [
      autoLogin,
      userId,
      password,
      url
    ] = ClientFileStorage.getItemsFromStore([
      'autoLogin',
      'userId',
      'password',
      'url'
    ])
    if (autoLogin) {
      await this.dispatch('server/login', {
        userId,
        password,
        url
      })
    }
  },
  async getContent (payload, {
    kbGuid,
    docGuid
  }) {
    return await _getContent(kbGuid, docGuid)
  },
  /**
   * 用户登录接口
   * @param commit
   * @param rootState
   * @param payload
   * @returns {Promise<*>}
   */
  async login ({
    commit,
    rootState
  }, payload) {
    const { url } = payload
    api.AccountServerApi.setBaseUrl(url)
    const {
      userId,
      password
    } = payload
    const result = await api.AccountServerApi.Login(payload)

    if (rootState.client.rememberPassword) {
      ClientFileStorage.setItemsInStore({
        userId,
        password,
        url
      })
    } else {
      if (ClientFileStorage.isKeyExistInStore('password')) {
        ClientFileStorage.removeItemFromStore('password')
      }
      ClientFileStorage.setItemsInStore({
        userId,
        url
      })
    }
    if (
      !rootState.client.enableSelfHostServer &&
      ClientFileStorage.isKeyExistInStore('url')
    ) {
      ClientFileStorage.removeItemFromStore('url')
    }

    commit(types.LOGIN, {
      ...result,
      isLogin: true
    })
    await this.dispatch('server/getAllTags')
    this.dispatch('server/getAllCategories')
    this.dispatch('server/getCategoryNotes')

    return result
  },
  /**
   * 登出
   * @param commit
   * @returns {Promise<void>}
   */
  async logout ({ commit }) {
    await api.AccountServerApi.Logout()
    ServerFileStorage.removeItemFromLocalStorage('token')
    commit(types.LOGOUT)
  },
  /**
   * 重新登录
   * @param commit
   * @returns {Promise<void>}
   */
  async reLogin ({ commit }) {
    const [userId, password, url] = ClientFileStorage.getItemsFromStore([
      'userId',
      'password',
      'url'
    ])
    await this.dispatch('server/login', {
      userId,
      password,
      url
    })
  },
  /**
   * 获取指定文件夹下的笔记
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async getCategoryNotes ({
    commit,
    state
  }, payload = {}) {
    const {
      kbGuid,
      currentCategory,
      tags
    } = state
    const {
      category,
      start,
      count
    } = payload
    const isTagCategory = tags.map(t => t.tagGuid).includes(helper.isNullOrEmpty(category) ? currentCategory : category)
    if (isTagCategory) {
      this.dispatch('server/getTagNotes', { tag: currentCategory })
      return
    }
    // commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const result = await api.KnowledgeBaseApi.getCategoryNotes({
      kbGuid,
      data: {
        category: category || currentCategory,
        start: start || 0,
        count: count || 100,
        withAbstract: true
      }
    })
    // commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, false)
    commit(types.UPDATE_CURRENT_NOTES, result)
  },
  /**
   * 获取所有的笔记
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async getAllCategories ({
    commit,
    state
  }) {
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const { kbGuid } = state
    const result = await api.KnowledgeBaseApi.getCategories({ kbGuid })
    commit(types.UPDATE_ALL_CATEGORIES, result)
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, false)
  },
  /**
   * 获取笔记内容
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async getNoteContent ({
    commit,
    state
  }, payload) {
    commit(types.UPDATE_CURRENT_NOTE_LOADING_STATE, true)
    const { kbGuid } = state
    const { docGuid } = payload
    const result = await _getContent(kbGuid, docGuid)

    commit(types.UPDATE_CURRENT_NOTE_LOADING_STATE, false)
    commit(types.UPDATE_CURRENT_NOTE, result)
  },
  /**
   * 设置当前显示的笔记文件夹，并在显示之前从网络刷新文件夹的内容
   * @param commit
   * @param category
   * @returns {Promise<void>}
   */
  async updateCurrentCategory ({ commit }, payload) {
    const {
      type,
      data
    } = payload
    commit(types.UPDATE_CURRENT_CATEGORY, data)
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, ['currentCategory', data])
    if (type === 'category') {
      await this.dispatch('server/getCategoryNotes', { category: data })
    } else if (type === 'tag') {
      await this.dispatch('server/getTagNotes', { tag: data })
    } else {
      await this.dispatch('server/getCategoryNotes', { category: '' })
    }
  },
  /**
   * 更新笔记信息，例如笔记title等
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async updateNoteInfo ({
    commit,
    state
  }, payload) {
    const {
      docGuid,
      kbGuid
    } = payload
    await api.KnowledgeBaseApi.updateNoteInfo({
      kbGuid,
      docGuid,
      data: payload
    })
    commit(types.UPDATE_CURRENT_NOTE, payload)
    this.dispatch('server/getCategoryNotes')
  },
  /**
   * 更新笔记内容
   * @param commit
   * @param state
   * @param markdown
   * @returns {Promise<void>}
   */
  async updateNote ({
    commit,
    state
  }, markdown) {
    const {
      kbGuid,
      docGuid,
      category,
      noteState
    } = state.currentNote.info
    if (noteState === 'default') return
    let { title } = state.currentNote.info
    const { resources } = state.currentNote
    const isLite = category.replace(/\//g, '') === 'Lite'
    const html = helper.embedMDNote(markdown, resources, {
      wrapWithPreTag: isLite,
      kbGuid,
      docGuid
    })

    const _updateNote = async title => {
      const result = await api.KnowledgeBaseApi.updateNote({
        kbGuid,
        docGuid,
        data: {
          html,
          title,
          kbGuid,
          docGuid,
          category,
          resources: resources.map(r => r.name),
          type: isLite ? 'lite/markdown' : 'document'
        }
      })

      ClientFileStorage.setCachedNote(
        {
          info: result,
          html
        },
        api.KnowledgeBaseApi.getCacheKey(kbGuid, docGuid),
        null
      )
      Notify.create({
        color: 'primary',
        message: i18n.t('saveNoteSuccessfully'),
        icon: 'check'
      })
      await this.dispatch('server/getCategoryNotes')
      commit(types.UPDATE_CURRENT_NOTE, result)
    }
    if (!_.endsWith(title, '.md')) {
      Dialog.create({
        title: i18n.t('convertToMarkdownNote'),
        message: i18n.t('convertToMarkdownNoteHint'),
        ok: {
          label: i18n.t('ok')
        },
        cancel: {
          label: i18n.t('cancel')
        }
      }).onOk(async () => {
        title = `${title}.md`
        await _updateNote(title)
      })
    } else {
      await _updateNote(title)
    }
  },
  /**
   * 创建笔记
   * @param commit
   * @param state
   * @param rootState
   * @param title
   * @returns {Promise<void>}
   */
  async createNote ({
    commit,
    state,
    rootState
  }, title) {
    const {
      kbGuid,
      currentCategory = ''
    } = state
    const userId = ClientFileStorage.getItemFromStore('userId')
    const isLite = currentCategory.replace(/\//g, '') === 'Lite'
    const result = await api.KnowledgeBaseApi.createNote({
      kbGuid,
      data: {
        category: currentCategory,
        kbGuid,
        title,
        owner: userId,
        html: helper.embedMDNote(`# ${title}`, [], { wrapWithPreTag: isLite }),
        type: isLite ? 'lite/markdown' : 'document'
      }
    })
    await this.dispatch('server/getNoteContent', result)
    await this.dispatch('server/getCategoryNotes')
    // if (/\.md$/.test(title) && rootState.client.markdownOnly) {
    //   commit(types.js.UPDATE_CURRENT_NOTE, result)
    // }
  },
  importNote ({
    commit,
    state
  }, importFile) {
    const {
      kbGuid,
      currentCategory = ''
    } = state
    const title = importFile.name
    const userId = ClientFileStorage.getItemFromStore('userId')
    const isLite = currentCategory.replace(/\//g, '') === 'Lite'
    const reader = new FileReader()
    reader.readAsText(importFile)
    reader.onload = async () => {
      const text = reader.result
      const result = await api.KnowledgeBaseApi.createNote({
        kbGuid,
        data: {
          category: currentCategory,
          kbGuid,
          title,
          owner: userId,
          html: helper.embedMDNote(text, [], { wrapWithPreTag: isLite }),
          type: isLite ? 'lite/markdown' : 'document'
        }
      })
      await this.dispatch('server/getNoteContent', result)
      await this.dispatch('server/getCategoryNotes')
    }
  },
  /**
   * 删除笔记
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async deleteNote ({
    commit,
    state
  }, payload) {
    const {
      kbGuid,
      docGuid
    } = payload
    await api.KnowledgeBaseApi.deleteNote({
      kbGuid,
      docGuid
    })
    const { currentNote } = state
    if (currentNote && currentNote.info.docGuid === docGuid) {
      commit(types.CLEAR_CURRENT_NOTE)
    }
    await this.dispatch('server/getCategoryNotes')
    Notify.create({
      color: 'red-10',
      message: i18n.t('deleteNoteSuccessfully'),
      icon: 'delete'
    })
  },
  /**
   * 创建笔记目录
   * @param commit
   * @param state
   * @param childCategoryName
   * @returns {Promise<void>}
   */
  async createCategory ({
    commit,
    state
  }, { childCategoryName, parentCategory }) {
    const {
      kbGuid,
      // currentCategory,
      categories
    } = state
    if (helper.checkCategoryExistence(categories, parentCategory, childCategoryName)) {
      Notify.create({
        color: 'red-10',
        message: i18n.t('categoryExisted'),
        icon: 'error'
      })
      return
    }
    await api.KnowledgeBaseApi.createCategory({
      kbGuid,
      data: {
        parent: helper.isNullOrEmpty(parentCategory) ? '/' : parentCategory,
        pos: Math.floor(Date.now() / 1000).toFixed(0),
        child: childCategoryName
      }
    })
    await this.dispatch('server/getAllCategories')
    await this.dispatch(
      'server/updateCurrentCategory', {
        data:
          helper
            .isNullOrEmpty(parentCategory)
            ? `/${childCategoryName}/`
            : `${parentCategory}${childCategoryName}/`,
        type: 'category'
      }
    )
  },
  async deleteCategory ({
    commit,
    state
  }, category) {
    const { kbGuid } = state
    await api.KnowledgeBaseApi.deleteCategory({
      kbGuid,
      data: { category }
    })
    await this.dispatch('server/getAllCategories')
    await this.dispatch('server/updateCurrentCategory', {
      type: 'category',
      data: ''
    })
    Notify.create({
      color: 'red-6',
      message: i18n.t('deleteCategorySuccessfully'),
      icon: 'delete'
    })
  },
  async uploadImage ({
    commit,
    getters,
    state,
    rootState
  }, file) {
    // TODO: 实现图片上传
    const token = getters.wizNoteToken
    const {
      kbGuid,
      currentNote: {
        info: { docGuid }
      }
    } = state

    const {
      client: {
        imageUploadService
      }
    } = rootState
    // eslint-disable-next-line no-case-declarations
    let base64

    switch (imageUploadService) {
      case 'wizOfficialImageUploadService':
        if (file instanceof File) {
          base64 = await readFileAsync(file)
          file = {
            file: base64,
            ext: file.name
          }
        }
        // eslint-disable-next-line no-case-declarations
        const result = await uploadImages([file], imageUploadService, { kbGuid, docGuid, wizToken: token, baseUrl: api.KnowledgeBaseApi.getBaseUrl() })
        commit(types.UPDATE_CURRENT_NOTE_RESOURCE, result.result)
        // await saveUploadedImage(buffer, kbGuid, docGuid, result.name)
        if (!result.success) {
          Notify.create({
            message: i18n.t('failToUpload'),
            type: 'negative',
            icon: 'clear'
          })
          return helper.isNullOrEmpty(base64) ? file : base64
        } else {
          return helper.isNullOrEmpty(result.result) ? file : helper.isNullOrEmpty(result.result[0]) ? file : result.result[0].url
        }
      case 'picgoServer':
        if (file instanceof File) {
          base64 = await readFileAsync(file)
          file = {
            file: base64,
            ext: file.name
          }
        }
        // eslint-disable-next-line no-case-declarations
        const res = await uploadImages([file], imageUploadService)
        if (!res.success) {
          Notify.create({
            message: i18n.t('failToUpload'),
            type: 'negative',
            icon: 'clear'
          })
          return helper.isNullOrEmpty(base64) ? file : base64
        } else {
          return helper.isNullOrEmpty(res.result) ? file : helper.isNullOrEmpty(res.result[0]) ? file : res.result[0]
        }
      case 'none':
        if (file instanceof File) {
          const base64 = await readFileAsync(file)
          file = await saveTempImage({
            file: base64,
            kbGuid,
            docGuid
          })
        }
        return file
      default:
        break
    }
  },
  async moveNote ({ commit }, noteInfo) {
    const {
      kbGuid,
      docGuid,
      category,
      type
    } = noteInfo
    const isLite = category === '/Lite/' ? 'lite/markdown' : type
    await api.KnowledgeBaseApi.updateNoteInfo({
      kbGuid,
      docGuid,
      data: {
        ...noteInfo,
        type: isLite ? 'lite/markdown' : type
      }
    })
    await this.dispatch('server/getCategoryNotes')
  },
  async copyNote ({
    commit,
    state
  }, noteInfo) {
    const {
      kbGuid,
      docGuid,
      category
    } = noteInfo
    const { currentCategory } = state
    await api.KnowledgeBaseApi.copyNote({
      kbGuid,
      docGuid,
      data: {
        targetCategory: category
      }
    })
    const isCurrentCategory = category === currentCategory
    if (isCurrentCategory || helper.isNullOrEmpty(currentCategory)) {
      await this.dispatch('server/getCategoryNotes')
    }
  },
  async searchNote ({
    commit,
    state
  }, searchText) {
    const { kbGuid } = state
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const result = await api.KnowledgeBaseApi.searchNote({
      data: {
        ss: searchText
      },
      kbGuid
    })
    commit(types.UPDATE_CURRENT_NOTES, result)
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, false)
  },
  async updateContentsList ({ commit }, editorRootElement) {
    const list = await helper.updateContentsList(editorRootElement) || []
    commit(types.UPDATE_CONTENTS_LIST, list)
  },
  updateNoteState ({ commit }, noteState) {
    commit(types.UPDATE_NOTE_STATE, noteState)
  },
  async getTagNotes ({
    commit,
    state
  }, payload) {
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const { kbGuid } = state
    const {
      tag,
      start,
      count
    } = payload
    const result = await api.KnowledgeBaseApi.getTagNotes({
      kbGuid,
      data: {
        tag,
        withAbstract: true,
        start: start || 0,
        count: count || 100,
        orderBy: 'modified'
      }
    })
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, false)
    commit(types.UPDATE_CURRENT_NOTES, result)
  },
  async getAllTags ({
    commit,
    state
  }) {
    const { kbGuid } = state
    const tags = await api.KnowledgeBaseApi.getAllTags({ kbGuid })
    commit(types.UPDATE_ALL_TAGS, tags)
  },
  /**
   * 创建一个标签，但没有指定哪篇笔记拥有这个标签
   * @param state
   * @param parentTag
   * @param name
   * @returns {Promise<void>}
   */
  async createTag ({ state }, {
    parentTag = {},
    name
  }) {
    const { kbGuid } = state
    const { tagGuid: parentTagGuid } = parentTag
    return await api.KnowledgeBaseApi.createTag({
      kbGuid,
      data: {
        parentTagGuid,
        name
      }
    })
  },
  /**
   * 将指定的标签添加到当前笔记上
   * @param state
   * @param commit
   * @param tagGuid
   * @returns {Promise<void>}
   */
  async attachTag ({
    state,
    commit
  }, { tagGuid }) {
    const {
      currentNote: { info }
    } = state
    const newTagList = info.tags?.split('*') || []
    newTagList.push(tagGuid)
    commit(types.UPDATE_CURRENT_NOTE_TAGS, newTagList.join('*'))
    this.dispatch('server/updateNoteInfo', {
      ...state.currentNote.info,
      tags: newTagList.join('*')
    })
    this.dispatch('server/getAllTags')
  },
  async renameTag ({ state }, tag) {
    const { kbGuid } = state
    const {
      tagGuid,
      name
    } = tag
    await api.KnowledgeBaseApi.renameTag({
      kbGuid,
      data: {
        tagGuid,
        name
      }
    })
    this.dispatch('server/getAllTags')
  },
  async moveTag ({ state }, {
    tag,
    parentTag = {}
  }) {
    const { kbGuid } = state
    const { tagGuid } = tag
    const { tagGuid: parentTagGuid } = parentTag
    await api.KnowledgeBaseApi.moveTag({
      kbGuid,
      data: {
        tagGuid,
        parentTagGuid
      }
    })
    this.dispatch('server/getAllTags')
  },
  /**
   * 移除某篇笔记上的tag标记，不会删除这个tag
   * @returns {Promise<void>}
   */
  async removeTag ({
    state,
    commit
  }, { tagGuid }) {
    const {
      currentNote: { info }
    } = state
    const newTagList =
      info.tags?.split('*').filter(t => t !== tagGuid) || []
    commit(types.UPDATE_CURRENT_NOTE_TAGS, newTagList.join('*'))
    this.dispatch('server/updateNoteInfo', {
      ...state.currentNote.info,
      tags: newTagList.join('*')
    })
    this.dispatch('server/getAllTags')
  },
  /**
   * 将一个tag永久删除
   * @param state
   * @param tag
   * @returns {Promise<void>}
   */
  async deleteTag ({ state }, tag) {
    const { kbGuid } = state
    const { tagGuid } = tag
    await api.KnowledgeBaseApi.deleteTag({
      kbGuid,
      tagGuid
    })
    this.dispatch('server/getAllTags')
  },
  /**
   * 导出markdown文件到本地
   * @param state
   * @param noteField
   * @returns {Promise<void>}
   */
  async exportMarkdownFile ({ state }, noteField) {
    const { kbGuid } = state
    const { docGuid } = noteField
    Loading.show({
      spinner: QSpinnerGears,
      message: i18n.t('prepareExportData')
    })
    const result = await _getContent(kbGuid, docGuid)
    const isHtml = !_.endsWith(result.info.title, '.md')
    const {
      html,
      resources
    } = result
    let content
    if (isHtml) {
      content = helper.convertHtml2Markdown(html, kbGuid, docGuid, resources)
    } else {
      content = helper.extractMarkdownFromMDNote(
        html,
        kbGuid,
        docGuid,
        resources
      )
    }
    Loading.hide()
    await exportMarkdownFile(content)
  },
  async exportPng ({
    commit,
    state
  }, noteField) {
    Loading.show({
      spinner: QSpinnerGears,
      message: i18n.t('prepareExportData')
    })
    const canvasID = document.getElementById('muya')
    const color = Dark.isActive
    console.log(color)
    html2canvas(canvasID, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: color ? '#35373e' : '#ffffff'
    }).then(canvas => {
      const dom = document.body.appendChild(canvas)
      dom.style.display = 'none'
      document.body.removeChild(dom)
      const content = dom.toDataURL('image/png')
      Loading.hide()
      exportPng(content)
    })
  },
  /**
   * 批量导出markdown笔记到本地
   * @param state
   * @param noteFields
   * @returns {Promise<void>}
   */
  async exportMarkdownFiles ({ state }, noteFields = []) {
    const { kbGuid, currentCategory } = state
    const results = []
    Loading.show({
      spinner: QSpinnerGears,
      message: i18n.t('prepareExportData')
    })
    for (const noteField of noteFields) {
      const { docGuid } = noteField
      const result = await _getContent(kbGuid, docGuid)
      results.push(result)
    }
    const contents = results.map(result => {
      const isHtml = !_.endsWith(result.info.title, '.md')
      const {
        html,
        info: { docGuid },
        resources
      } = result
      let content
      if (isHtml) {
        content = helper.convertHtml2Markdown(html, kbGuid, docGuid, resources)
      } else {
        content = helper.extractMarkdownFromMDNote(
          html,
          kbGuid,
          docGuid,
          resources
        )
      }
      return {
        content,
        title: isHtml ? result.info.title : result.info.title.replace('.md', '')
      }
    })
    Loading.hide()
    const category = currentCategory.split('/')[1]
    await exportMarkdownFiles({ contents, category })
  }
}
