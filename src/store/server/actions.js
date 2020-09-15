import types from 'src/store/server/types'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'
import { Notify } from 'quasar'
import helper from 'src/utils/helper'
import { i18n } from 'boot/i18n'
export default {
  /**
   * 从本地缓存中读取数据，初始化状态树
   * @param commit
   * @param state
   */
  initServerStore ({ commit, state }) {
    const localStore = fileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
    fileStorage.removeItemFromLocalStorage('token')
    const [autoLogin, userId, password, url] = fileStorage.getItemsFromStore([
      'autoLogin',
      'userId',
      'password',
      'url'
    ])
    if (autoLogin) {
      this.dispatch('server/login', { userId, password, url })
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
      fileStorage.setItemsInStore({ userId, password, url })
    } else {
      if (fileStorage.isKeyExistInStore('password')) {
        fileStorage.removeItemFromStore('password')
      }
      fileStorage.setItemsInStore({ userId, url })
    }
    if (
      !rootState.client.enableSelfHostServer &&
      fileStorage.isKeyExistInStore('url')
    ) {
      fileStorage.removeItemFromStore('url')
    }

    commit(types.LOGIN, { ...result, isLogin: true })

    this.dispatch('server/getCategoryNotes', {
      category: ''
    })
    this.dispatch('server/getAllCategories')

    return result
  },
  async logout ({ commit }) {
    await api.AccountServerApi.Logout()
    commit(types.LOGOUT)
  },
  /**
   * 获取指定文件夹下的笔记
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async getCategoryNotes ({ commit, state }, payload) {
    commit(types.UPDATE_CURRENT_NOTES_LOADING_STATE, true)
    const { kbGuid } = state
    const { category, start, count } = payload
    const result = await api.KnowledgeBaseApi.getCategoryNotes({
      kbGuid,
      data: {
        category,
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

    const result = await api.KnowledgeBaseApi.getNoteContent({
      kbGuid,
      docGuid,
      data: {
        downloadInfo: 1,
        downloadData: 1
      }
    })

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
  },
  /**
   * 更新笔记信息，例如笔记title等
   * @param commit
   * @param state
   * @param payload
   * @returns {Promise<void>}
   */
  async updateNoteInfo ({ commit, state }, payload) {
    const { currentCategory } = state
    const { docGuid, kbGuid } = payload
    await api.KnowledgeBaseApi.updateNoteInfo({
      kbGuid,
      docGuid,
      data: payload
    })
    this.dispatch('server/getCategoryNotes', {
      category: currentCategory
    })
  },
  /**
   * 更新笔记内容
   * @param commit
   * @param state
   * @param markdown
   * @returns {Promise<void>}
   */
  async updateNote ({ commit, state }, markdown) {
    const { kbGuid, docGuid, category, title } = state.currentNote.info
    const { resources } = state.currentNote
    const isLite = category.replace(/\//g, '') === 'Lite'
    await api.KnowledgeBaseApi.updateNote({
      kbGuid,
      docGuid,
      data: {
        title,
        kbGuid,
        docGuid,
        category,
        resources,
        html: helper.embedMDNote(markdown, { wrapWithPreTag: isLite }),
        type: isLite ? 'lite/markdown' : 'document'
      }
    })
    Notify.create({
      color: 'primary',
      message: i18n.t('saveNoteSuccessfully'),
      icon: 'check'
    })
    await this.dispatch('server/getCategoryNotes', { category: state.currentCategory })
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
    const { kbGuid, currentCategory } = state
    const userId = fileStorage.getItemFromStore('userId')
    const isLite = currentCategory.replace(/\//g, '') === 'Lite'
    const result = await api.KnowledgeBaseApi.createNote({
      kbGuid,
      data: {
        category: currentCategory,
        kbGuid,
        title,
        owner: userId,
        html: helper.embedMDNote(`# ${title}`, { wrapWithPreTag: isLite }),
        type: isLite ? 'lite/markdown' : 'document'
      }
    })
    await this.dispatch('server/getNoteContent', result)
    await this.dispatch('server/getCategoryNotes', {
      category: currentCategory
    })
    // if (/\.md$/.test(title) && rootState.client.markdownOnly) {
    //   commit(types.UPDATE_CURRENT_NOTE, result)
    // }
  },
  /**
   * 删除笔记
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  async deleteNote ({ commit, state }, payload) {
    const { kbGuid, docGuid } = payload
    await api.KnowledgeBaseApi.deleteNote({ kbGuid, docGuid })
    const { currentNote, currentCategory } = state
    if (currentNote && currentNote.info.docGuid === docGuid) {
      commit(types.CLEAR_CURRENT_NOTE)
    }
    await this.dispatch('server/getCategoryNotes', {
      category: currentCategory
    })
    Notify.create({
      color: 'red-10',
      message: i18n.t('deleteNoteSuccessfully'),
      icon: 'delete'
    })
  },
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
    await this.dispatch('server/updateCurrentCategory', helper.isNullOrEmpty(currentCategory) ? `/${childCategoryName}/` : `${currentCategory}${childCategoryName}/`)
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
  }
}
