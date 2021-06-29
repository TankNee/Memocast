export const edit = (win, type) => {
  if (win && win.webContents) {
    win.webContents.send('editor-edit-action', { type })
  }
}
