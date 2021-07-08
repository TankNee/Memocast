import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'
const local = ClientFileStorage.getItemFromStore('language')
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: local,
  fallbackLocale: local,
  messages,
  availableLocales: ['en-us', 'zh-cn']
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
