import types from 'src/store/client/types'
import { Dark } from 'quasar'
import api from 'src/utils/api'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'

export default {
  initClientStore ({ commit, state }) {
    const localStore = ClientFileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
    Dark.set(state.darkMode)
  },
  toggleDarkMode ({ commit }, darkMode) {
    commit(types.TOGGLE_DARK_MODE, darkMode)
    Dark.set(darkMode)
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, ['darkMode', darkMode])
  },
  toggleChanged ({ commit }, { key, value }) {
    commit(types.TOGGLE_CHANGED, { key, value })
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, [key, value])
  },
  updateStateAndStore ({ commit }, options) {
    commit(types.UPDATE_STATES, options)
    commit(types.SAVE_ITEMS_TO_LOCAL_STORE_SYNC, options)
  },
  async getLatestVersion () {
    return await api.ThirdPartApi.getLatestVersion()
  }
}
