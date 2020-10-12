import BaseFileStorage from 'src/utils/storage/BaseFileStorage'
import Store from 'electron-store'
class ServerFileStorage extends BaseFileStorage {
  constructor () {
    super()
    // init electron store
    this._store = new Store({
      name: 'ServerFileStorage',
      encryptionKey: 'server.file.storage'
    })
  }

  // Chrome LocalStorage
  saveToLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getValueFromLocalStorage (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return localStorage.getItem(key)
    }
  }

  isKeyExistsInLocalStorage (key) {
    return !!this.getValueFromLocalStorage(key)
  }

  removeItemFromLocalStorage (key) {
    return localStorage.removeItem(key)
  }

  clearUpLocalStorage () {
    return localStorage.clear()
  }
}
export default new ServerFileStorage()
