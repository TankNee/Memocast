import { autoUpdater } from 'electron-updater'
import { ipcMain, BrowserWindow } from 'electron'

let runningUpdate = false
let win = null

autoUpdater.autoDownload = false

autoUpdater.on('error', error => {
  if (win) {
    win.webContents.send(
      'updater-update-error',
      error === null ? 'Error: unknown' : (error.message || error).toString()
    )
  }
})

autoUpdater.on('update-available', () => {
  if (win) {
    win.webContents.send(
      'updater-update-available',
      'Found an update, do you want download and install now?'
    )
  }
  runningUpdate = false
})

autoUpdater.on('update-not-available', () => {
  if (win) {
    win.webContents.send(
      'updater-update-not-available',
      'Current version is up-to-date.'
    )
  }
  runningUpdate = false
})

autoUpdater.on('update-downloaded', () => {
  // TODO: We should ask the user, so that the user can save all documents and
  // not just force close the application.

  if (win) {
    win.webContents.send(
      'updater-update-downloaded',
      'Update downloaded, application will be quit for update...'
    )
  }
  // setImmediate(() => autoUpdater.quitAndInstall())
})

autoUpdater.on('download-progress', (progress) => {
  if (win) {
    win.webContents.send(
      'updater-update-downloading',
      progress
    )
  }
})

export const checkUpdates = browserWindow => {
  if (!runningUpdate) {
    runningUpdate = true
    win = browserWindow
    autoUpdater.checkForUpdates().catch(err => throw err)
  }
}

export const needUpdate = (need) => {
  if (need) {
    autoUpdater.downloadUpdate().catch(err => throw err)
  } else {
    runningUpdate = false
  }
}

export const quitAndInstall = () => {
  setImmediate(() => autoUpdater.quitAndInstall())
}

// ipcMain.on('need-update', (e, { needUpdate }) => {
//   if (needUpdate) {
//     autoUpdater.downloadUpdate()
//   } else {
//     runningUpdate = false
//   }
// })

// ipcMain.on('check-update', e => {
//   const win = BrowserWindow.fromWebContents(e.sender)
//   checkUpdates(win)
// })
