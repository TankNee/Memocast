import api from 'src/utils/api'
import _ from 'lodash'
export default {
  avatarUrl: ({ userGuid }) => {
    return userGuid ? `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${userGuid}` : ''
  },
  currentNotes: ({ currentNotes }) => {
    if (_.isArray(currentNotes)) {
      return currentNotes.map((note) => {
        return { title: note.title }
      })
    }
    return []
  }
}
