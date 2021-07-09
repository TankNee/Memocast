export default class I18n {
  constructor (options = {}) {
    const {
      locale,
      availableLocales,
      messages
    } = options
    this._locale = locale
    this._availableLocales = availableLocales
    this._messages = messages
  }

  /**
   * translation
   * @param {string} key
   */
  t (key) {
    if (this._messages[this._locale] && this._messages[this._locale][key]) {
      return this._messages[this._locale][key]
    }
    return key
  }
}
