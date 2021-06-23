import { webContents } from 'electron'

let wcs = webContents.getFocusedWebContents()

async function sendNotification (notificationPayload) {
  if (!wcs) {
    wcs = webContents.getFocusedWebContents()
  }
  return wcs.send('show-notification', notificationPayload)
}

export {
  sendNotification
}
