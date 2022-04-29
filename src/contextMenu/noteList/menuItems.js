import * as contextMenu from './actions'

export const RENAME = {
  label: 'rename',
  id: 'renameMenuItem',
  click: contextMenu.rename()
}

export const COPY = {
  label: 'copy',
  id: 'copyNoteMenuItem',
  click: contextMenu.copy()
}

export const MOVE = {
  label: 'move',
  id: 'moveNoteMenuItem',
  click: contextMenu.move()
}

export const EXPORT = {
  label: 'export',
  id: 'exportNoteMenuItem', // not used yet!
  submenu: [
    {
      label: 'Markdown',
      id: 'exportAsMarkdownMenuItem',
      click: contextMenu.exportAsMarkdown()
    },
    {
      label: 'PNG',
      id: 'exportAsPNGMenuItem',
      click: contextMenu.exportAsPNG()
    }
  ]
}

export const DELETE = {
  label: 'delete',
  id: 'deleteNoteMenuItem',
  click: contextMenu.deleteNote()
}

export const SEPARATOR = {
  type: 'separator'
}
