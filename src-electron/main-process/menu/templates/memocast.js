import { app } from 'electron'
import i18n from '../../i18n'

export default function (keybindings) {
  return {
    label: 'Memocast',
    submenu: [{
      label: i18n.t('aboutMemocast'),
      click () {
        app.showAboutPanel()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('services'),
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: i18n.t('hideMemocast'),
      accelerator: keybindings.getAccelerator('mc.hide'),
      role: 'hide'
    }, {
      label: i18n.t('hideOthers'),
      accelerator: keybindings.getAccelerator('mc.hide-others'),
      role: 'hideothers'
    }, {
      label: i18n.t('showAll'),
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: i18n.t('quitMemocast'),
      accelerator: keybindings.getAccelerator('mc.quit'),
      click: app.quit
    }]
  }
}
