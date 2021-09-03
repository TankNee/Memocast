import * as actions from '../actions/note'
import i18n from '../../i18n'

export default function (keybindings) {
  return {
    id: 'noteMenuItem',
    label: i18n.t('note'),
    submenu: [{
      id: 'saveNote',
      label: i18n.t('save'),
      accelerator: keybindings.getAccelerator('note.save'),
      click (menuItem, browserWindow) {
        actions.note(browserWindow, 'save')
      }
    }, {
      id: 'searchNote',
      label: i18n.t('searchNote'),
      accelerator: keybindings.getAccelerator('note.search-note'),
      click (menuItem, browserWindow) {
        actions.note(browserWindow, 'searchNote')
      }
    }, {
      id: 'exportNote',
      label: i18n.t('export'),
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
