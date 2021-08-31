import { i18n } from 'boot/i18n'
import bus from 'src/components/bus'
import events from 'src/constants/events'

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

  notifyAction () {
    switch (this._returnCode) {
      case 301:
        return [
          {
            icon: 'refresh',
            textColor: 'white',
            handler: () => {
              bus.$emit(events.RELOGIN)
            }
          }
        ]
      default:
        break
    }
    return null
  }
}
export default NeetoError
