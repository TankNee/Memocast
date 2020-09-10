import types from 'src/store/client/types'
import helper from 'src/utils/helper'
import fileStorage from 'src/utils/fileStorage'

export default {
  [types.INIT] (state, payload) {
    for (const key in state) {
      if (!helper.isNullOrEmpty(payload[key])) {
        state[key] = payload[key]
      }
    }
  },
  [types.SET_LANGUAGE] (state, language) {
    state.language = language
  },
  [types.TOGGLE_DARK_MODE] (state, darkMode) {
    state.darkMode = darkMode
  },
  [types.TOGGLE_MARKDOWN_ONLY] (state, markdownOnly) {
    state.markdownOnly = markdownOnly
  },
  [types.SAVE_TO_LOCAL_STORE_SYNC] (state, [key, value]) {
    fileStorage.setItemInStore(key, value)
  }
}
