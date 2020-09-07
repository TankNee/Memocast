import types from 'src/store/user/types'
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
  }
}
