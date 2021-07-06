import * as contextMenu from './actions'

export const RENAME = {
  label: 'rename',
  id: 'renameMenuItem',
  click (menuItem, browserWindow, sth) {
    contextMenu.rename()
  }
}

export const COPY = {
  label: 'copy',
  id: 'copyNoteMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.copy()
  }
}

export const MOVE = {
  label: 'move',
  id: 'moveNoteMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.move()
  }
}

export const EXPORT = {
  label: 'export',
  id: 'exportNoteMenuItem', // not used yet!
  submenu: [
    {
      label: 'Markdown',
      id: 'exportAsMarkdownMenuItem',
      click (menuItem, browserWindow) {
        contextMenu.exportAsMarkdown()
      }
    },
    {
      label: 'PNG',
      id: 'exportAsPNGMenuItem',
      click (menuItem, browserWindow) {
        contextMenu.exportAsPNG()
      }
    }
  ]
}

export const DELETE = {
  label: 'delete',
  id: 'deleteNoteMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.deleteNote()
  }
}

export const SEPARATOR = {
  type: 'separator'
}
