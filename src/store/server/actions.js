import types from 'src/store/server/types'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'
export default {
  initServerStore ({ commit, state }) {
    const localStore = fileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
    fileStorage.removeItemFromLocalStorage('token')
    const [
      autoLogin,
      userId,
      password,
      url
    ] = fileStorage.getItemsFromStore([
      'autoLogin',
      'userId',
      'password',
      'url'
    ])
    if (autoLogin) {
      this.dispatch('server/login', { userId, password, url })
    }
  },
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
    if (!rootState.client.enableSelfHostServer && fileStorage.isKeyExistInStore('url')) {
      fileStorage.removeItemFromStore('url')
    }

    commit(types.LOGIN, { ...result, isLogin: true })

    this.dispatch('server/getCategoryNotes', { category: '', kbGuid: result.kbGuid })
    this.dispatch('server/getAllCategories')

    return result
  },
  async logout ({ commit }) {
    await api.AccountServerApi.Logout()
    commit(types.LOGOUT)
  },
  async getCategoryNotes ({ commit, state }, payload) {
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
    commit(types.UPDATE_CURRENT_NOTES, result)
  },
  async getAllCategories ({ commit, state }) {
    const { kbGuid } = state
    const result = await api.KnowledgeBaseApi.getCategories({ kbGuid })
    commit(types.UPDATE_ALL_CATEGORIES, result)
  },
  async getNoteContent ({ commit, state }, payload) {
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
  }
}
