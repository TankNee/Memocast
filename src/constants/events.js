export default {
  REQUEST_ERROR: 'request.error',
  INSERT_IMAGE: 'insert.image',
  INSERT_IMAGES: 'insert.images',
  INSERT_TEXT: 'insert.text',
  SCROLL_TO_HEADER: 'scroll.to.header',
  SCROLL_DOWN: 'scroll.down',
  GENERATE_MINDMAP: 'generate.mindmap',
  PARAGRAPH_SHORTCUT_CALL: 'paragraph.shortcut.call',
  EDIT_SHORTCUT_CALL: {
    undo: 'edit.shortcut.undo.call',
    redo: 'edit.shortcut.redo.call',
    save: 'edit.shortcut.save.call',
    copyAsMarkdown: 'edit.shortcut.copy.as.markdown.call',
    copyAsHtml: 'edit.shortcut.copy.as.html.call',
    pasteAsPlainText: 'edit.shortcut.paste.as.plainText.call',
    selectAll: 'edit.shortcut.selectAll.call',
    duplicate: 'edit.shortcut.duplicate.call',
    createParagraph: 'edit.shortcut.create.paragraph.call',
    deleteParagraph: 'edit.shortcut.delete.paragraph.call',
    insertParagraph: 'edit.shortcut.insert.paragraph.call',
    formatDocumentByPangu: 'edit.shortcut.format.document.by.pangu.call'
  },
  FORMAT_SHORTCUT_CALL: 'format.shortcut.call',
  VIEW_SHORTCUT_CALL: {
    switchView: 'view.shortcut.switch.view.call',
    sourceMode: 'view.shortcut.source.code.call',
    lockMode: 'view.shortcut.lock.code.call'
  },
  NOTE_SHORTCUT_CALL: {
    save: 'note.shortcut.save.call',
    exportNoteAsMarkdown: 'note.shortcut.export.markdown.call',
    exportNoteAsPNG: 'note.shortcut.export.png.call'
  },
  UPDATE_EVENTS: {
    updateAvailable: 'update.events.update.available',
    updateNotAvailable: 'update.events.update.not.available',
    updateDownloading: 'update.events.update.downloading',
    updateDownloaded: 'update.events.update.downloaded',
    updateError: 'update.events.update.error'
  },
  EDITOR_SCROLL: 'editor.scroll',
  NOTE_ITEM_CONTEXT_MENU: {
    rename: 'note.item.context.menu.rename',
    copy: 'note.item.context.menu.copy',
    move: 'note.item.context.menu.',
    exportNote: {
      markdown: 'note.item.context.menu.export.markdown',
      png: 'note.item.context.menu.export.png'
    },
    flomo: 'note.item.context.menu.flomo',
    delete: 'note.item.context.menu.delete'
  },
  SIDE_DRAWER_CONTEXT_MENU: {
    openCategory: 'side.drawer.context.menu.open.category',
    renameCategory: 'side.drawer.context.menu.rename.category',
    createCategory: 'side.drawer.context.menu.create.category',
    createNote: 'side.drawer.context.menu.create.note',
    delete: 'side.drawer.context.menu.delete.category',
    exportCategory: {
      markdown: 'side.drawer.context.menu.export.markdown'
    }
  }
}
