import events from 'src/constants/events'
import { packClickFunction } from 'src/contextMenu/utils'

export const rename = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_ITEM_CONTEXT_MENU.rename)
}

export const copy = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_ITEM_CONTEXT_MENU.copy)
}

export const move = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_ITEM_CONTEXT_MENU.move)
}

export const exportAsMarkdown = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_SHORTCUT_CALL.exportNoteAsMarkdown)
}

export const exportAsPNG = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_SHORTCUT_CALL.exportNoteAsPNG)
}

export const deleteNote = (menuItem, browserWindow) => {
  return packClickFunction(events.NOTE_ITEM_CONTEXT_MENU.delete)
}
