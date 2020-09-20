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
  [types.SET_IMAGE_UPLOAD_SERVICE] (state, imageUploadService) {
    state.imageUploadService = imageUploadService
  },
  [types.TOGGLE_DARK_MODE] (state, darkMode) {
    state.darkMode = darkMode
  },
  [types.SAVE_TO_LOCAL_STORE_SYNC] (state, [key, value]) {
    fileStorage.setItemInStore(key, value)
  },
  [types.SAVE_ITEMS_TO_LOCAL_STORE_SYNC] (state, object) {
    fileStorage.setItemsInStore(object)
  },
  [types.TOGGLE_CHANGED] (state, { key, value }) {
    state[key] = value
  },
  [types.UPDATE_STATES] (state, object) {
    for (const key in object) {
      state[key] = object[key]
    }
  }
}
