import * as contextMenu from './actions'

// export const RENAME = {
//   label: 'rename',
//   id: 'renameMenuItem',
//   click (menuItem, browserWindow, sth) {
//     console.log(menuItem, browserWindow, sth)
//     contextMenu.rename()
//   }
// }

export const OPEN_FOLDER = {
  label: 'openFolder',
  id: 'openFolderMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.createFolder()
  }
}

export const CREATE_FOLDER = {
  label: 'createFolder',
  id: 'createFolderMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.createFolder()
  }
}

export const CREATE_NOTE = {
  label: 'createNote',
  id: 'createNoteMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.createNote()
  }
}

export const EXPORT = {
  label: 'export',
  id: 'exportFolderMenuItem',
  submenu: [
    {
      label: 'markdown',
      id: 'exportFolderAsMarkdownMenuItem',
      click (menuItem, browserWindow) {
        contextMenu.exportFolderAsMarkdown()
      }
    }
  ]
}

export const DELETE = {
  label: 'delete',
  id: 'deleteFolderMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.deleteFolder()
  }
}

export const SEPARATOR = {
  type: 'separator'
}
