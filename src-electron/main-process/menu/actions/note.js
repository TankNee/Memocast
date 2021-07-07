export const note = (win, type) => {
  if (win && win.webContents) {
    win.webContents.send('editor-note-action', { type })
  }
}
