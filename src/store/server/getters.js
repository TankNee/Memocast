import api from 'src/utils/api'
import _ from 'lodash'
import helper from 'src/utils/helper'
import fileStorage from 'src/utils/fileStorage'
export default {
  avatarUrl: ({ userGuid }) => {
    return userGuid ? `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${userGuid}` : null
  },
  imageUrl: ({ kbGuid, currentNote: { info: { docGuid } } }) => (url, imageUploadService) => {
    let img = ''
    switch (imageUploadService) {
      case 'wizOfficialImageUploadService':
        img = docGuid ? `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/${url}` : url
        break
      case 'smmsImageUploadService':
      case 'customWebUploadService':
        img = url
        break
      default:
        break
    }
    return img
  },
  currentNotes: ({ currentNotes }, getters, rootState) => {
    const _currentNotes = _.cloneDeep(currentNotes)
    if (_.isArray(_currentNotes)) {
      return _currentNotes.map((note) => {
        if (_.endsWith(note.title, '.md')) {
          note.abstractText = helper.removeMarkdownTag(note.abstractText)
        }
        return note
      }).filter(note => {
        if (rootState.client.markdownOnly) {
          return _.endsWith(note.title, '.md')
        }
        return true
      })
    }
    return []
  },
  currentNote: ({ currentNote }) => {
    if (helper.isNullOrEmpty(currentNote) || Object.keys(currentNote).length === 0) return ''
    const isHtml = !_.endsWith(currentNote.info.title, '.md')

    const { html, info: { docGuid, kbGuid }, resources } = currentNote
    let result = ''
    if (isHtml) {
      result = helper.convertHtml2Markdown(currentNote.html, kbGuid, docGuid, resources)
    } else {
      result = helper.extractMarkdownFromMDNote(html, kbGuid, docGuid, resources)
    }
    return result
  },
  categories: ({ categories }) => {
    return helper.generateCategoryNodeTree(categories)
  },
  activeNote: ({ currentNote }) => ({ docGuid }) => {
    return currentNote.info && currentNote.info.docGuid === docGuid
  },
  uploadImageUrl: ({ uploadImageUrl, kbGuid, currentNote }) => {
    if (!helper.isNullOrEmpty(uploadImageUrl) || helper.isNullOrEmpty(currentNote.info)) return uploadImageUrl
    const { info: { docGuid } } = currentNote
    return `${api.KnowledgeBaseApi.getBaseUrl()}/ks/resource/upload/${kbGuid}/${docGuid}`
  },
  wizNoteToken: () => {
    return fileStorage.getValueFromLocalStorage('token')
  }
}
