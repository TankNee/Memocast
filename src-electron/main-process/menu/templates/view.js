import * as actions from '../actions/view'
import i18n from '../../i18n'

export default function (keybindings) {
  return {
    id: 'viewMenuItem',
    label: i18n.t('view'),
    submenu: [{
      id: 'switchView',
      label: i18n.t('switchView'),
      accelerator: keybindings.getAccelerator('view.switch-view'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'switchView')
      }
    }, {
      id: 'sourceMode',
      label: i18n.t('sourceMode'),
      accelerator: keybindings.getAccelerator('view.source-mode'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'sourceMode')
      }
    }, {
      id: 'lockMode',
      label: i18n.t('lockMode'),
      accelerator: keybindings.getAccelerator('view.lock-mode'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'lockMode')
      }
    }, {
      type: 'separator'
    }, {
      id: 'devTool',
      label: i18n.t('openDevtool'),
      accelerator: keybindings.getAccelerator('view.devtool'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.openDevTools()
      }
    }]
  }
}
