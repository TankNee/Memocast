import * as actions from '../actions/edit'

export default function (keybindings) {
  return {
    label: '&Edit',
    submenu: [{
      label: 'Undo',
      accelerator: keybindings.getAccelerator('edit.undo'),
      click: (menuItem, browserWindow) => {
        actions.edit(browserWindow, 'undo')
      }
    }, {
      label: 'Redo',
      accelerator: keybindings.getAccelerator('edit.redo'),
      click: (menuItem, browserWindow) => {
        actions.edit(browserWindow, 'redo')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: keybindings.getAccelerator('edit.cut'),
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: keybindings.getAccelerator('edit.copy'),
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: keybindings.getAccelerator('edit.paste'),
      role: 'paste'
    }, {
      type: 'separator'
    }, {
      label: 'Copy as Markdown',
      accelerator: keybindings.getAccelerator('edit.copy-as-markdown'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'copyAsMarkdown')
      }
    }, {
      label: 'Copy as HTML',
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'copyAsHtml')
      }
    }, {
      label: 'Paste as Plain Text',
      accelerator: keybindings.getAccelerator('edit.copy-as-plaintext'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'pasteAsPlainText')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Select All',
      accelerator: keybindings.getAccelerator('edit.select-all'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'selectAll')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Duplicate',
      accelerator: keybindings.getAccelerator('edit.duplicate'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'duplicate')
      }
    }, {
      label: 'Create Paragraph',
      accelerator: keybindings.getAccelerator('edit.create-paragraph'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'createParagraph')
      }
    }, {
      label: 'Delete Paragraph',
      accelerator: keybindings.getAccelerator('edit.delete-paragraph'),
      click (menuItem, browserWindow) {
        actions.edit(browserWindow, 'deleteParagraph')
      }
    }]
  }
}
