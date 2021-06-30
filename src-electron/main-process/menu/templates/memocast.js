import { app } from 'electron'
import openAboutWindow from 'about-window'
import path from 'path'
import packageJSON from '../../../../package.json'

export default function (keybindings) {
  return {
    label: 'Memocast',
    submenu: [{
      label: 'About Memocast',
      click (menuItem, browserWindow) {
        openAboutWindow({
          product_name: 'Memocast',
          copyright: 'TankNee',
          homepage: 'https://github.com/TankNee/Memocast',
          description: 'An elegant Wiz Note Editor, proudly powered by Electron, Vue, Quasar, Muya and Monaco.',
          license: 'MIT',
          bug_report_url: 'https://github.com/TankNee/Memocast/issues/new',
          icon_path: path.resolve('src-electron/icons', 'icon.ico'),
          about_page_dir: path.resolve('src-electron/main-process/menu/templates'),
          package_json_dir: path.resolve('.'),
          version: packageJSON.version
        })
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
      accelerator: keybindings.getAccelerator('mc.quit'),
      click: app.quit
    }]
  }
}
