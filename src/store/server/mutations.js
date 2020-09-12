import types from 'src/store/server/types'
import helper from 'src/utils/helper'
import api from 'src/utils/api'
import fileStorage from 'src/utils/fileStorage'

export default {
  [types.INIT] (state, payload) {
    for (const key in state) {
      if (!helper.isNullOrEmpty(payload[key])) {
        state[key] = payload[key]
      }
    }
    return state
  },
  [types.LOGIN] (state, payload) {
    // replace the old state
    const { kbGuid, kbServer, lang, email, displayName, userGuid, token, isLogin } = payload
    if (!helper.isNullOrEmpty(kbServer)) {
      api.KnowledgeBaseApi.setBaseUrl(kbServer)
    }
    if (!helper.isNullOrEmpty(token)) {
      fileStorage.saveToLocalStorage('token', token)
    }
    const data = { kbGuid, kbServer, lang, email, displayName, userGuid, isLogin }
    Object.assign(state, data)
    state.currentNote = {}
    return state
  },
  [types.LOGOUT] (state) {
    for (const key in state) {
      state[key] = null
    }
    state.isLogin = false
    return state
  },
  [types.UPDATE_CURRENT_NOTES] (state, payload) {
    state.currentNotes = payload
    return state
  },
  [types.UPDATE_CURRENT_NOTE] (state, payload) {
    state.currentNote = payload
    return state
  },
  [types.SAVE_TO_LOCAL_STORE_SYNC] (state, [key, value]) {
    fileStorage.setItemInStore(key, value)
    return state
  },
  [types.UPDATE_ALL_CATEGORIES] (state, payload) {
    state.categories = payload
    return state
  },
  [types.UPDATE_CURRENT_CATEGORY] (state, category) {
    state.currentCategory = category
    return state
  },
  [types.UPDATE_CURRENT_NOTE_LOADING_STATE] (state, loadingState) {
    state.isCurrentNoteLoading = loadingState
    return state
  },
  [types.UPDATE_CURRENT_NOTES_LOADING_STATE] (state, loadingState) {
    state.isCurrentNotesLoading = loadingState
    return state
  }
}
