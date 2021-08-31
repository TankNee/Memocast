import api from 'src/utils/api'
import _ from 'lodash'
import helper from 'src/utils/helper'
import ServerFileStorage from 'src/utils/storage/ServerFileStorage'

export default {
  avatarUrl: ({ userGuid }) => {
    return userGuid ? `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${userGuid}` : null
  },
  imageUrl: ({
    kbGuid,
    currentNote: { info: { docGuid } }
  }) => (url, imageUploadService) => {
    let img = ''
    switch (imageUploadService) {
      case 'wizOfficialImageUploadService':
        img = url.url
        // img = docGuid ? `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/${url.url}` : url
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
      const filteredNotes = _currentNotes.map((note) => {
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
      if (rootState.client.noteOrderType === 'orderByNoteTitle') {
        return filteredNotes.sort((n1, n2) => {
          if (n1.title === n2.title) return 0
          return n1.title > n2.title ? 1 : -1
        })
      }
      return filteredNotes
    }
    return []
  },
  currentNote: ({ currentNote }) => {
    if (helper.isNullOrEmpty(currentNote) || Object.keys(currentNote).length === 0) return ''
    const isHtml = !_.endsWith(currentNote.info.title, '.md')

    const {
      html,
      info: {
        docGuid,
        kbGuid
      },
      resources
    } = currentNote
    let result = ''
    if (isHtml) {
      result = helper.convertHtml2Markdown(currentNote.html, kbGuid, docGuid, resources)
    } else {
      result = helper.extractMarkdownFromMDNote(html, kbGuid, docGuid, resources)
    }

    return helper.isNullOrEmpty(result) ? `# ${currentNote.info.title}` : result
  },
  currentNoteResources: ({ currentNote }) => {
    const { resources } = currentNote
    return resources
  },
  currentNoteResourceUrl: ({ currentNote }) => {
    const {
      info: {
        docGuid,
        kbGuid
      }
    } = currentNote
    return `${api.KnowledgeBaseApi.getBaseUrl()}/${kbGuid}/${docGuid}`
  },
  categories: ({ categories, categoriesPos }) => {
    return helper.generateCategoryNodeTree(categories, categoriesPos)
  },
  tags: ({ tags }) => {
    return helper.generateTagNodeTree(tags)
  },
  activeNote: ({ currentNote }) => ({ docGuid }) => {
    return currentNote && currentNote.info && currentNote.info.docGuid === docGuid
  },
  uploadImageUrl: ({
    uploadImageUrl,
    kbGuid,
    currentNote
  }) => {
    if (!helper.isNullOrEmpty(uploadImageUrl) || helper.isNullOrEmpty(currentNote.info)) return uploadImageUrl
    const { info: { docGuid } } = currentNote
    return `${api.KnowledgeBaseApi.getBaseUrl()}/ks/resource/upload/${kbGuid}/${docGuid}`
  },
  wizNoteToken: () => {
    return ServerFileStorage.getValueFromLocalStorage('token')
  },
  tagsOfCurrentNote: ({
    currentNote,
    tags
  }) => {
    if (helper.isNullOrEmpty(currentNote?.info?.tags)) return []
    const tagGuids = currentNote.info.tags.split('*')
    return tags.filter(t => tagGuids.includes(t.tagGuid))
  }
}
