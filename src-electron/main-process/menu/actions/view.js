export const view = (win, type) => {
  if (win && win.webContents) {
    win.webContents.send('editor-view-action', { type })
  }
}
