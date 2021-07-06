import * as contextMenu from './actions'

export const OPEN_CATEGORY = {
  label: 'open',
  id: 'openCategoryMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.openCategory()
  }
}

export const RENAME = {
  label: 'rename',
  id: 'renameCategoryMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.renameCategory()
  }
}

export const CREATE_CATEGORY = {
  label: 'createCategory',
  id: 'createCategoryMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.createCategory()
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
  id: 'exportCategoryMenuItem',
  submenu: [
    {
      label: 'Markdown',
      id: 'exportCategoryAsMarkdownMenuItem',
      click (menuItem, browserWindow) {
        contextMenu.exportCategoryAsMarkdown()
      }
    }
  ]
}

export const DELETE = {
  label: 'delete',
  id: 'deleteFolderMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.deleteCategory()
  }
}

export const SEPARATOR = {
  type: 'separator'
}
