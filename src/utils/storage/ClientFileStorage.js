import BaseFileStorage from 'src/utils/storage/BaseFileStorage'
import Store from 'electron-store'
class ClientFileStorage extends BaseFileStorage {
  constructor () {
    super()
    // init electron store
    this._store = new Store({
      name: 'ClientFileStorage'
    })
    console.log(this._store.path)
  }
}
export default new ClientFileStorage()
