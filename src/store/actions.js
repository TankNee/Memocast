import helper from 'src/utils/helper'
import api from 'src/utils/api'
import types from 'src/store/user/types'

export default {
  async login ({ commit }, payload) {
    const { url } = payload
    if (!helper.isNullOrEmpty(url)) {
      api.AccountServerApi.setBaseUrl(url)
    }
    const result = await api.AccountServerApi.Login(payload)
    commit(types.LOGIN, result)
    return result
  }
}
