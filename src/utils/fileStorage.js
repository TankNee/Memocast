import Store from 'electron-store'
import debugLogger from 'src/utils/debugLogger'
import i18n from 'boot/i18n'
import _ from 'lodash'
import helper from 'src/utils/helper'

class FileStorage {
  constructor () {
    // init electron store
    this._store = new Store({
      name: 'RenderThreadFileStorage',
      encryptionKey: 'render.thread.file.storage'
    })
  }

  // Chrome LocalStorage
  saveToLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getValueFromLocalStorage (key) {
    return JSON.parse(localStorage.getItem(key))
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

  // Electron Store
  setItemInStore (key, value) {
    return this._store.set(key, value)
  }

  setItemsInStore (settings) {
    if (!settings) {
      debugLogger.Error(i18n.t('updateSettingsWithNullObject'))
      return
    }
    Object.keys(settings).forEach(key => {
      if (helper.isNullOrEmpty(settings[key])) return null
      this.setItemInStore(key, settings[key])
    })
  }

  getAllItemsFromStore () {
    return this._store.store
  }

  getItemFromStore (key) {
    return this._store.get(key)
  }

  /**
   * get item by key array
   * @param {string[] | Object} keys
   * @returns {*}
   */
  getItemsFromStore (keys) {
    let result = {}
    if (_.isArray(keys)) {
      return keys.map(key => {
        return this.getItemFromStore(key)
      })
    }
    for (const key in keys) {
      if (helper.isNullOrEmpty(key)) continue
      result = {
        ...result,
        [key]: this.getItemFromStore(key)
      }
    }
    return result
  }

  isKeyExistInStore (key) {
    return this._store.has(key)
  }

  removeItemFromStore (key) {
    return this._store.delete(key)
  }
}
export default new FileStorage()
