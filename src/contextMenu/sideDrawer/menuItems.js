import * as contextMenu from './actions'

export const OPEN_CATEGORY = {
  label: 'open',
  id: 'openCategoryMenuItem',
  click: contextMenu.openCategory()
}

export const RENAME = {
  label: 'rename',
  id: 'renameCategoryMenuItem',
  click: contextMenu.renameCategory()
}

export const CREATE_CATEGORY = {
  label: 'createCategory',
  id: 'createCategoryMenuItem',
  click: contextMenu.createCategory()
}

export const CREATE_NOTE = {
  label: 'createNote',
  id: 'createNoteMenuItem',
  click: contextMenu.createNote()
}

export const EXPORT = {
  label: 'export',
  id: 'exportCategoryMenuItem',
  submenu: [
    {
      label: 'Markdown',
      id: 'exportCategoryAsMarkdownMenuItem',
      click: contextMenu.exportCategoryAsMarkdown()
    }
  ]
}

export const DELETE = {
  label: 'delete',
  id: 'deleteFolderMenuItem',
  click: contextMenu.deleteCategory()
}

export const SEPARATOR = {
  type: 'separator'
}
