import bus from 'src/components/bus'
import events from 'src/constants/events'

export const copyAsMarkdown = (menuItem, browserWindow) => {
  bus.$emit(events.EDIT_SHORTCUT_CALL.copyAsMarkdown, 'copyAsMarkdown')
}

export const copyAsHtml = (menuItem, browserWindow) => {
  bus.$emit(events.EDIT_SHORTCUT_CALL.copyAsHtml, 'copyAsHtml')
}

export const pasteAsPlainText = (menuItem, browserWindow) => {
  bus.$emit(events.EDIT_SHORTCUT_CALL.pasteAsPlainText, 'pasteAsPlainText')
}

export const insertParagraph = location => {
  bus.$emit(events.EDIT_SHORTCUT_CALL.insertParagraph, location)
}

export const formatDocumentByPangu = (menuItem, browserWindow) => {
  bus.$emit(events.EDIT_SHORTCUT_CALL.formatDocumentByPangu)
}

export const generateMindmap = (menuItem, browserWindow) => {
  bus.$emit(events.GENERATE_MINDMAP)
}
