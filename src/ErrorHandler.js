import { Notify } from 'quasar'
import bus from 'components/bus'
import events from 'src/constants/events'
import { i18n } from 'boot/i18n'

function registerRequestErrorHandler () {
  bus.$on(events.REQUEST_ERROR, (error) => {
    Notify.create({
      message: error.localMessage,
      color: 'red-10',
      caption: i18n.t('requestError'),
      actions: error.notifyActions,
      icon: 'error'
    })
  })
}

export default {
  RegisterErrorHandler () {
    registerRequestErrorHandler()
  }
}
