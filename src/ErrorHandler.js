import { Notify } from 'quasar'
import bus from 'components/bus'
import events from 'src/constants/events'
import { i18n } from 'boot/i18n'
export default {
  RegisterErrorHandler () {
    bus.$on(events.REQUEST_ERROR, (payload) => {
      Notify.create({
        message: payload,
        color: 'red-10',
        caption: i18n.t('requestError')
      })
    })
  }
}
