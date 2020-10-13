import types from 'src/store/server/types'
import helper from 'src/utils/helper'
import api from 'src/utils/api'
import ServerFileStorage from 'src/utils/storage/ServerFileStorage'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'

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
      ServerFileStorage.saveToLocalStorage('token', token)
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
    if (payload.html) {
      state.currentNote = payload
    } else {
      const { currentNote } = state
      currentNote.info = payload
      state.currentNote = currentNote
    }
    return state
  },
  [types.UPDATE_CURRENT_NOTE_RESOURCE] (state, newResource) {
    if (state.currentNote && state.currentNote.resources) {
      if (Array.isArray(newResource)) {
        newResource.forEach(nr => state.currentNote.resources.push({ name: nr.name }))
      } else {
        state.currentNote.resources.push({ name: newResource.name })
      }
    }
  },
  [types.SAVE_TO_LOCAL_STORE_SYNC] (state, [key, value]) {
    ClientFileStorage.setItemInStore(key, value)
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
  },
  [types.CLEAR_CURRENT_NOTE] (state) {
    state.currentNote = {}
  },
  [types.UPDATE_CONTENTS_LIST] (state, list) {
    state.contentsList = list
  }
}
