import menu from './menu'
import api from './api'
import electronMain from './electron-main'
export default {
  ...menu,
  ...api,
  ...electronMain
}
