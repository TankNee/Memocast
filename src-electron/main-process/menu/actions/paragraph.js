export const paragraph = (win, type) => {
  if (win && win.webContents) {
    win.webContents.send('editor-paragraph-action', { type })
  }
}
