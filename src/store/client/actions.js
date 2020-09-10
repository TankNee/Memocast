import types from 'src/store/client/types'
import fileStorage from 'src/utils/fileStorage'
import { Dark } from 'quasar'

export default {
  initClientStore ({ commit, state }) {
    const localStore = fileStorage.getItemsFromStore(state)
    commit(types.INIT, localStore)
    Dark.set(state.darkMode)
  },
  setLanguage ({ commit }, language) {
    commit(types.SET_LANGUAGE, language)
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, ['language', language])
  },
  toggleDarkMode ({ commit }, darkMode) {
    commit(types.TOGGLE_DARK_MODE, darkMode)
    Dark.set(darkMode)
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, ['darkMode', darkMode])
  },
  toggleChanged ({ commit }, { key, value }) {
    commit(types.TOGGLE_CHANGED, { key, value })
    commit(types.SAVE_TO_LOCAL_STORE_SYNC, [key, value])
  }
}
