import bus from 'src/components/bus'
import events from 'src/constants/events'

export const openFolder = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.openFolder)
}

export const createFolder = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.createFolder)
}

export const createNote = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.createNote)
}

export const exportFolderAsMarkdown = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.exportFolder.markdown)
}

export const deleteFolder = (menuItem, browserWindow) => {
  bus.$emit(events.SIDE_DRAWER_CONTEXT_MENU.delete)
}
