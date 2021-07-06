import bus from 'src/components/bus'
import events from 'src/constants/events'

export const openCategory = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.openCategory)
}

export const renameCategory = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.renameCategory)
}

export const createCategory = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.createCategory)
}

export const createNote = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.createNote)
}

export const exportCategoryAsMarkdown = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.exportCategory.markdown)
}

export const deleteCategory = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.delete)
}
