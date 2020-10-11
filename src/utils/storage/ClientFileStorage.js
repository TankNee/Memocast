import BaseFileStorage from 'src/utils/storage/BaseFileStorage'
import Store from 'electron-store'
class ClientFileStorage extends BaseFileStorage {
  constructor () {
    super()
    // init electron store
    this._store = new Store({
      name: 'ClientFileStorage',
      encryptionKey: 'client.file.storage'
    })
  }
}
export default new ClientFileStorage()
