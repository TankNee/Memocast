import types from 'src/store/server/types'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'
export default {
  initServerStore ({ commit, state }) {
    const localStore = fileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
  },
  async login ({ commit }, payload) {
    const { url } = payload
    api.AccountServerApi.setBaseUrl(url)
    const result = await api.AccountServerApi.Login(payload)
    const { userId, password } = payload
    fileStorage.setItemsInStore({ userId, password })
    commit(types.LOGIN, { ...result, isLogin: true })
    return result
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
    await api.KnowledgeBaseApi.getCategories({ kbGuid })
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
