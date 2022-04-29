import events from 'src/constants/events'
import { packClickFunction } from 'src/contextMenu/utils'

export const copyAsMarkdown = (menuItem, browserWindow) => {
  return packClickFunction(events.EDIT_SHORTCUT_CALL.copyAsMarkdown, 'copyAsMarkdown')
}

export const copyAsHtml = (menuItem, browserWindow) => {
  return packClickFunction(events.EDIT_SHORTCUT_CALL.copyAsHtml, 'copyAsHtml')
}

export const pasteAsPlainText = (menuItem, browserWindow) => {
  return packClickFunction(events.EDIT_SHORTCUT_CALL.pasteAsPlainText, 'pasteAsPlainText')
}

export const insertParagraph = location => {
  return packClickFunction(events.EDIT_SHORTCUT_CALL.insertParagraph, location)
}

export const formatDocumentByPangu = (menuItem, browserWindow) => {
  return packClickFunction(events.EDIT_SHORTCUT_CALL.formatDocumentByPangu)
}

export const generateMindmap = (menuItem, browserWindow) => {
  return packClickFunction(events.GENERATE_MINDMAP)
}
