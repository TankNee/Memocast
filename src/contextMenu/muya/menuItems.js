import * as contextMenu from './actions'

export const CUT = {
  label: 'cut',
  id: 'cutMenuItem', // not used yet!
  role: 'cut'
}

export const COPY = {
  label: 'copy',
  id: 'copyMenuItem',
  role: 'copy'
}

export const PASTE = {
  label: 'paste',
  id: 'pasteMenuItem',
  role: 'paste'
}

export const COPY_AS_MARKDOWN = {
  label: 'copyAsMarkdown',
  id: 'copyAsMarkdownMenuItem',
  click: contextMenu.copyAsMarkdown()
}

export const COPY_AS_HTML = {
  label: 'copyAsHtml',
  id: 'copyAsHtmlMenuItem',
  click: contextMenu.copyAsHtml()
}

export const PASTE_AS_PLAIN_TEXT = {
  label: 'pasteAsPlainText',
  id: 'pasteAsPlainTextMenuItem',
  click: contextMenu.pasteAsPlainText()
}

export const INSERT_BEFORE = {
  label: 'insertBefore',
  id: 'insertParagraphBeforeMenuItem',
  click: contextMenu.insertParagraph('before')
}

export const INSERT_AFTER = {
  label: 'insertAfter',
  id: 'insertParagraphAfterMenuItem',
  click: contextMenu.insertParagraph('after')
}

export const FORMAT_DOCUMENT_BY_PANGU = {
  label: 'formatDocumentByPangu',
  id: 'insertParagraphAfterMenuItem',
  click: contextMenu.formatDocumentByPangu()
}

export const GENERATE_MINDMAP = {
  label: 'generateMindmap',
  id: 'generateMindmapMenuItem',
  click: contextMenu.generateMindmap()
}

export const SEPARATOR = {
  type: 'separator'
}
