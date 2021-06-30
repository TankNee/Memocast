export const format = (win, type) => {
  if (win && win.webContents) {
    win.webContents.send('editor-format-action', { type })
  }
}
