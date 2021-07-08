import { webContents, BrowserWindow } from 'electron'

let wcs = webContents.getFocusedWebContents()

async function sendNotification (notificationPayload, event) {
  if (!wcs) {
    wcs = BrowserWindow.fromWebContents(event.sender).webContents
  }
  return wcs.send('show-notification', notificationPayload)
}

// async function requestResourceTempUrl (kbGuid, docGuid, resName) {
//   if (!wcs) {
//     wcs = webContents.getFocusedWebContents()
//   }
//   return wcs.send('request-resource-temp-url', { kbGuid, docGuid, resName })
// }

export {
  sendNotification
}
