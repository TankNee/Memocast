import * as actions from '../actions/view'

export default function (keybindings) {
  return {
    id: 'viewMenuItem',
    label: 'V&iew',
    submenu: [{
      id: 'switchView',
      label: 'Switch View',
      accelerator: keybindings.getAccelerator('view.switch-view'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'switchView')
      }
    }, {
      id: 'sourceMode',
      label: 'Source Mode',
      accelerator: keybindings.getAccelerator('view.source-mode'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'sourceMode')
      }
    }, {
      id: 'lockMode',
      label: 'Lock Mode',
      accelerator: keybindings.getAccelerator('view.lock-mode'),
      click (menuItem, browserWindow) {
        actions.view(browserWindow, 'lockMode')
      }
    }, {
      type: 'separator'
    }, {
      id: 'devTool',
      label: 'Open Devtool',
      accelerator: keybindings.getAccelerator('view.devtool'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.openDevTools()
      }
    }]
  }
}
