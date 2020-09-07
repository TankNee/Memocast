import types from 'src/store/server/types'
import api from 'src/utils/api'
import helper from 'src/utils/helper'
export default {
  async login ({ commit }, payload) {
    const { url } = payload
    if (!helper.isNullOrEmpty(url)) {
      api.AccountServerApi.setBaseUrl(url)
    }
    const result = await api.AccountServerApi.Login(payload)
    commit(types.LOGIN, result)
    return result
  },
  async getCurrentFolderNotes ({ commit, state }, payload) {
    const { kbGuid } = state
    const { category } = payload
    const result = await api.KnowledgeBaseApi.getFolderNotes({ kbGuid, data: { category, start: 0, count: 100 } })
    commit(types.UPDATE_CURRENT_NOTES, result)
  },
  async getAllFolders ({ commit, state }) {
    const { kbGuid } = state
    await api.KnowledgeBaseApi.getFolders({ kbGuid })
  }
}
