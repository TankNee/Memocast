import * as actions from '../actions/edit'
import i18n from '../../i18n'

export default function (keybindings) {
  return {
    label: i18n.t('edit'),
    submenu: [{
      label: i18n.t('undo'),
      accelerator: keybindings.getAccelerator('edit.undo'),
      click: (menuItem, browserWindow) => {
        actions.edit(browserWindow, 'undo')
      }
    }, {
      label: i18n.t('redo'),
      accelerator: keybindings.getAccelerator('edit.redo'),
      click: (menuItem, browserWindow) => {
        actions.edit(browserWindow, 'redo')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('cut'),
      accelerator: keybindings.getAccelerator('edit.cut'),
      role: 'cut'
    }, {
      label: i18n.t('copy'),
      accelerator: keybindings.getAccelerator('edit.copy'),
      role: 'copy'
    }, {
      label: i18n.t('paste'),
      accelerator: keybindings.getAccelerator('edit.paste'),
      role: 'paste'
    }, {
      type: 'separator'
    }, {
      label: i18n.t('copyAsMarkdown'),
      accelerator: keybindings.getAccelerator('edit.copy-as-markdown'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'copyAsMarkdown')
      }
    }, {
      label: i18n.t('copyAsHtml'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'copyAsHtml')
      }
    }, {
      label: i18n.t('pasteAsPlainText'),
      accelerator: keybindings.getAccelerator('edit.paste-as-plaintext'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'pasteAsPlainText')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('selectAll'),
      accelerator: keybindings.getAccelerator('edit.select-all'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'selectAll')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('duplicate'),
      accelerator: keybindings.getAccelerator('edit.duplicate'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'duplicate')
      }
    }, {
      label: i18n.t('createParagraph'),
      accelerator: keybindings.getAccelerator('edit.create-paragraph'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'createParagraph')
      }
    }, {
      label: i18n.t('deleteParagraph'),
      accelerator: keybindings.getAccelerator('edit.delete-paragraph'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'deleteParagraph')
      }
    }]
  }
}
