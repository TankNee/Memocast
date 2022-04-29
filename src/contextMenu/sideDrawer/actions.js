import events from 'src/constants/events'
import { packClickFunction } from 'src/contextMenu/utils'

export const openCategory = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.openCategory)
}

export const renameCategory = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.renameCategory)
}

export const createCategory = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.createCategory)
}

export const createNote = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.createNote)
}

export const exportCategoryAsMarkdown = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.exportCategory.markdown)
}

export const deleteCategory = (menuItem, browserWindow) => {
  return packClickFunction(events.SIDE_DRAWER_CONTEXT_MENU.delete)
}
