import EventEmitter from 'events'
import Store from 'electron-store'
import schema from './schema'
import { ipcMain } from 'electron'
import events from 'src/constants/events'
import debugLogger from 'src/utils/debugLogger'
import i18n from 'boot/i18n'
class Settings extends EventEmitter {
  /**
   * Settings Class
   * @param path A Path Instance
   */
  constructor () {
    super()
    this._store = new Store({
      name: this.ClassName,
      schema
    })
  }

  get ClassName () {
    return 'Settings'
  }

  getAllSettings () {
    return this._store.store
  }

  getSettings (type) {
    return this._store.get(type)
  }

  updateSetting (key, value) {
    ipcMain.emit(events.SETTINGS_EVENT.SETTINGS_UPDATE, { [key]: value })
    return this._store.set(key, value)
  }

  updateSettings (settings) {
    if (!settings) {
      debugLogger.Error(i18n.t('updateSettingsWithNullObject'))
      return
    }

    Object.keys(settings).map(key => {
      this.updateSetting(key, settings[key])
    })
  }

  openSettingsFileInEditor () {
    return this._store.openInEditor()
  }
}
export default Settings
