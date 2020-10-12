import types from 'src/store/server/types'
import api from 'src/utils/api'
import { Notify, Dialog } from 'quasar'
import helper from 'src/utils/helper'
import { i18n } from 'boot/i18n'
import bus from 'components/bus'
import events from 'src/constants/events'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'
import ServerFileStorage from 'src/utils/storage/ServerFileStorage'
import _ from 'lodash'
import FormData from 'form-data'
export default {
  /**
   * 从本地缓存中读取数据，初始化状态树
   * @param commit
   * @param state
   */
  async initServerStore ({ commit, state }) {
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
      await this.dispatch('server/login', { userId, password, url })
    }
  },
  /**
   * 用户登录接口
   * @param commit
   * @param rootState
   * @param payload
   * @returns {Promise<*>}
   */
  async login ({ commit, rootState }, payload) {
    const { url } = payload
    api.AccountServerApi.setBaseUrl(url)
    const { userId, password } = payload
    const result = await api.AccountServerApi.Login(payload)

    if (rootState.client.rememberPassword) {
      ClientFileStorage.setItemsInStore({ userId, password, url })
    } else {
      if (ClientFileStorage.isKeyExistInStore('password')) {
        ClientFileStorage.removeItemFromStore('password')
      }
      ClientFileStorage.setItemsInStore({ userId, url })
    }
    if (
      !rootState.client.enableSelfHostServer &&
      ClientFileStorage.isKeyExistInStore('url')
    ) {
      ClientFileStorage.removeItemFromStore('url')
    }

    commit(types.LOGIN, { ...result, isLogin: true })

    this.dispatch('server/getCategoryNotes', {
      category: ''
    })
    this.dispatch('server/getAllCategories')

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
  async getCategoryNotes ({ commit, state }, payload = {}) {
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const { kbGuid, currentCategory } = state
    const { category, start, count } = payload
    const result = await api.KnowledgeBaseApi.getCategoryNotes({
      kbGuid,
      data: {
        category: category || currentCategory,
        start: start || 0,
        count: count || 100,
        withAbstract: true
      }
    })
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, false)
    commit(types.UPDATE_CURRENT_NOTES, result)
  },
  /**
   * 获取所有的笔记
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async getAllCategories ({ commit, state }) {
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
  async getNoteContent ({ commit, state }, payload) {
    commit(types.UPDATE_CURRENT_NOTE_LOADING_STATE, true)
    const { kbGuid } = state
    const { docGuid } = payload
    const { info } = await api.KnowledgeBaseApi.getNoteContent({
      kbGuid,
      docGuid,
      data: {
        downloadInfo: 1
      }
    })
    // dataModified
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

    commit(types.UPDATE_CURRENT_NOTE, result)
    commit(types.UPDATE_CURRENT_NOTE_LOADING_STATE, false)
  },
  /**
   * 设置当前显示的笔记文件夹，并在显示之前从网络刷新文件夹的内容
   * @param commit
   * @param category
   * @returns {Promise<void>}
   */
  async updateCurrentCategory ({ commit }, category) {
    await this.dispatch('server/getCategoryNotes', { category })
    commit(types.UPDATE_CURRENT_CATEGORY, category)
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, ['currentCategory', category])
  },
  /**
   * 更新笔记信息，例如笔记title等
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async updateNoteInfo ({ commit, state }, payload) {
    const { docGuid, kbGuid } = payload
    await api.KnowledgeBaseApi.updateNoteInfo({
      kbGuid,
      docGuid,
      data: payload
    })
    this.dispatch('server/getCategoryNotes')
  },
  /**
   * 更新笔记内容
   * @param commit
   * @param state
   * @param markdown
   * @returns {Promise<void>}
   */
  async updateNote ({ commit, state }, markdown) {
    const { kbGuid, docGuid, category } = state.currentNote.info
    let { title } = state.currentNote.info
    const { resources } = state.currentNote
    const isLite = category.replace(/\//g, '') === 'Lite'
    const html = helper.embedMDNote(markdown, resources, { wrapWithPreTag: isLite })

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
        { info: result, html },
        api.KnowledgeBaseApi.getCacheKey(kbGuid, docGuid)
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
  async createNote ({ commit, state, rootState }, title) {
    const { kbGuid, currentCategory = '' } = state
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
  /**
   * 删除笔记
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async deleteNote ({ commit, state }, payload) {
    const { kbGuid, docGuid } = payload
    await api.KnowledgeBaseApi.deleteNote({ kbGuid, docGuid })
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
  async createCategory ({ commit, state }, childCategoryName) {
    const { kbGuid, currentCategory } = state
    await api.KnowledgeBaseApi.createCategory({
      kbGuid,
      data: {
        parent: helper.isNullOrEmpty(currentCategory) ? '/' : currentCategory,
        pos: Math.floor(Date.now() / 1000).toFixed(0),
        child: childCategoryName
      }
    })
    await this.dispatch('server/getAllCategories')
    await this.dispatch(
      'server/updateCurrentCategory',
      helper.isNullOrEmpty(currentCategory)
        ? `/${childCategoryName}/`
        : `${currentCategory}${childCategoryName}/`
    )
  },
  async deleteCategory ({ commit, state }, category) {
    const { kbGuid } = state
    await api.KnowledgeBaseApi.deleteCategory({ kbGuid, data: { category } })
    await this.dispatch('server/getAllCategories')
    await this.dispatch('server/updateCurrentCategory', '')
    Notify.create({
      color: 'red-10',
      message: i18n.t('deleteCategorySuccessfully'),
      icon: 'delete'
    })
  },
  async uploadImage ({ commit, getters, state, rootState }, file) {
    // TODO: 实现图片上传
    const token = getters.wizNoteToken
    const {
      kbGuid,
      currentNote: {
        info: { docGuid }
      }
    } = state

    const formData = new FormData()
    const {
      client: {
        imageUploadService,
        apiServerUrl,
        postParam,
        jsonPath,
        customHeader,
        customBody
      }
    } = rootState

    let data = {},
      options = {}
    switch (imageUploadService) {
      case 'wizOfficialImageUploadService':
        formData.append('data', file)
        formData.append('kbGuid', kbGuid)
        formData.append('docGuid', docGuid)
        data = {
          kbGuid,
          docGuid,
          formData: formData,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Wiz-Token': token
            }
          }
        }
        break
      case 'smmsImageUploadService':
        data = file
        break
      case 'customWebUploadService':
        data = file
        options = {
          apiServerUrl,
          postParam,
          jsonPath,
          customHeader,
          customBody
        }
        break
      default:
        break
    }

    const result = await api.UploadImageApi(imageUploadService, data, options)
    if (result) {
      bus.$emit(
        events.INSERT_IMAGE,
        getters.imageUrl(result, imageUploadService)
      )
    }
  },
  async moveNote ({ commit }, noteInfo) {
    const { kbGuid, docGuid } = noteInfo
    await api.KnowledgeBaseApi.updateNoteInfo({
      kbGuid,
      docGuid,
      data: noteInfo
    })
    await this.dispatch('server/getCategoryNotes')
  },
  async copyNote ({ commit, state }, noteInfo) {
    const { kbGuid, docGuid, category, title, type } = noteInfo
    const { currentCategory } = state
    const userId = ClientFileStorage.getItemFromStore('userId')

    const noteContent = await api.KnowledgeBaseApi.getNoteContent({
      kbGuid,
      docGuid,
      data: {
        downloadInfo: 1,
        downloadData: 1
      }
    })
    const { html } = noteContent
    const isCurrentCategory = category === noteContent.info.category
    await api.KnowledgeBaseApi.createNote({
      kbGuid,
      data: {
        category: category,
        kbGuid,
        title: isCurrentCategory
          ? `${title.replace(/\.md/, '')}-${i18n.t('duplicate')}${
              title.indexOf('.md') !== -1 ? '.md' : ''
            }`
          : title,
        owner: userId,
        html,
        type: category === '/Lite/' ? 'lite/markdown' : type
      }
    })
    if (isCurrentCategory || helper.isNullOrEmpty(currentCategory)) {
      await this.dispatch('server/getCategoryNotes')
    }
  },
  async searchNote ({ commit, state }, searchText) {
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
  updateContentsList ({ commit }, editorRootElement) {
    const list = helper.updateContentsList(editorRootElement)
    commit(types.UPDATE_CONTENTS_LIST, list)
  }
}
