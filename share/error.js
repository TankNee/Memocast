import { i18n } from 'boot/i18n'

class NeetoError extends Error {
  constructor (message, returnCode, externCode) {
    super()
    this._message = message
    this._returnCode = returnCode
    if (externCode) {
      this._externCode = externCode
    }
  }

  get message () {
    return this._message
  }

  get externCode () {
    return this._externCode
  }

  get returnCode () {
    return this._returnCode
  }

  get localMessage () {
    return i18n.t(this.returnCode)
  }

  get notifyActions () {
    return null
  }
}
export default NeetoError
