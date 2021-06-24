import { app, BrowserWindow, nativeTheme, shell } from 'electron'
import Api from './Api'
import windowStateKeeper from 'electron-window-state'
import unhandled from 'electron-unhandled'

import { openNewGitHubIssue, debugInfo, enforceMacOSAppLocation } from 'electron-util'

const { registerApiHandler } = Api
unhandled({
  reportButton: error => {
    openNewGitHubIssue({
      user: 'TankNee',
      repo: 'Neeto-Vue',
      body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
    })
  },
  showDialog: true
})

try {
  if (
    process.platform === 'win32' &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require('fs').unlinkSync(
      require('path').join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let mainWindow, forceQuit
const isMac = process.platform === 'darwin'

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1500,
    defaultHeight: 1000
  })
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width < 600 ? 600 : mainWindowState.width,
    height: mainWindowState.height < 400 ? 400 : mainWindowState.height,
    useContentSize: true,
    // transparent: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      webSecurity: false,
      experimentalFeatures: false

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    },
    frame: false,
    titleBarStyle: 'hiddenInset'
  })
  mainWindow.isMainWindow = true
  mainWindowState.manage(mainWindow)

  mainWindow.loadURL(process.env.APP_URL)

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })
  mainWindow.on('close', (event) => {
    if (!forceQuit) {
      event.preventDefault() // This will cancel the close
      mainWindow.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('new-window', (event, linkUrl) => {
    event.preventDefault()
    shell.openExternal(linkUrl)
  })
  registerApiHandler()
  if (isMac) {
    enforceMacOSAppLocation()
  }
}

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('before-quit', () => {
  forceQuit = true
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } else if (isMac) {
    mainWindow.show()
  }
})

if (!isMac) {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) {
        mainWindow.show()
      }
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
}
