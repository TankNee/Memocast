import BaseFileStorage from 'src/utils/storage/BaseFileStorage'
import Store from 'electron-store'
// import { session } from 'electron'
class ServerFileStorage extends BaseFileStorage {
  constructor () {
    super()
    // init electron store
    this._store = new Store({
      name: 'ServerFileStorage'
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

  /**
   * 设置cookie
   * @param name
   * @param value
   */
  setCookie (name, value) {
    this._cookie.set({ name, value })
  }
}
export default new ServerFileStorage()
