import api from 'src/utils/api'
import _ from 'lodash'
import helper from 'src/utils/helper'
export default {
  avatarUrl: ({ userGuid }) => {
    return userGuid ? `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${userGuid}` : null
  },
  currentNotes: ({ currentNotes }, getters, rootState) => {
    if (_.isArray(currentNotes)) {
      return currentNotes.map((note) => {
        const { title, abstractText, docGuid } = note
        return { title: title, summary: abstractText, docGuid: docGuid }
      }).filter(note => {
        if (rootState.client.markdownOnly) {
          return _.endsWith(note.title, '.md')
        }
        return true
      })
    }
    return []
  },
  currentNote: ({ currentNote }) => (isHtml = false) => {
    if (helper.isNullOrEmpty(currentNote) || Object.keys(currentNote).length === 0) return ''

    const { html, info: { docGuid, kbGuid }, resources } = currentNote
    let result = ''
    if (isHtml) {
      result = currentNote.html
    } else {
      result = helper.extractMarkdownFromMDNote(html, kbGuid, docGuid, resources)
    }
    return result
  },
  categories: ({ categories }) => {
    return helper.generateCategoryNodeTree(categories)
  }
}
