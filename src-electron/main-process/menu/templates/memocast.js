import { app } from 'electron'

export default function (keybindings) {
  return {
    label: 'Memocast',
    submenu: [{
      label: 'About Memocast',
      click (menuItem, browserWindow) {
        // showAboutDialog(browserWindow)
      }
    }, {
      label: 'Open Devtools',
      click (menuItem, browserWindow) {
        browserWindow.webContents.openDevTools()
      }
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: 'Hide Memocast',
      accelerator: keybindings.getAccelerator('mc.hide'),
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: keybindings.getAccelerator('mc.hide-others'),
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit Memocast',
      accelerator: keybindings.getAccelerator('file.quit'),
      click: app.quit
    }]
  }
}
