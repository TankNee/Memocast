import api from 'src/utils/api'
import _ from 'lodash'
import helper from 'src/utils/helper'
import bus from 'components/bus'
import events from 'src/constants/events'
export default {
  avatarUrl: ({ userGuid }) => {
    return userGuid ? `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${userGuid}` : ''
  },
  currentNotes: ({ currentNotes }) => {
    if (_.isArray(currentNotes)) {
      return currentNotes.map((note) => {
        const { title, abstractText, docGuid } = note
        return { title: title, summary: abstractText, docGuid: docGuid }
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

    bus.$emit(events.UPDATE_CURRENT_NOTE, result)
  }
}
