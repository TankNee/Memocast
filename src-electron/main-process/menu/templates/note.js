import * as actions from '../actions/note'

export default function (keybindings) {
  return {
    id: 'noteMenuItem',
    label: '&Note',
    submenu: [{
      id: 'saveNote',
      label: 'Save',
      accelerator: keybindings.getAccelerator('note.save'),
      click (menuItem, browserWindow) {
        actions.note(browserWindow, 'save')
      }
    }, {
      id: 'exportNote',
      label: 'Export',
      submenu: [{
        id: 'exportNoteAsMarkdown',
        label: 'Markdown',
        click (menuItem, browserWindow) {
          actions.note(browserWindow, 'exportNoteAsMarkdown')
        }
      }, {
        id: 'exportNoteAsPNG',
        label: 'PNG',
        click (menuItem, browserWindow) {
          actions.note(browserWindow, 'exportNoteAsPNG')
        }
      }]
    }]
  }
}
