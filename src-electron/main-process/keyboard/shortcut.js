import electronLocalshortcut from '@hfelix/electron-localshortcut'
import { Menu } from 'electron'
const isMac = process.platform === 'darwin'

export default class KeyBindings {
  constructor () {
    this.keys = new Map([
      // Memocast - macOS only
      ['mc.hide', 'Command+H'],
      ['mc.hide-others', 'Command+Alt+H'],
      ['mc.quit', 'Command+Q'],

      // Edit menu
      ['edit.undo', 'CmdOrCtrl+Z'],
      ['edit.redo', 'CmdOrCtrl+Shift+Z'],
      ['edit.cut', 'CmdOrCtrl+X'],
      ['edit.copy', 'CmdOrCtrl+C'],
      ['edit.paste', 'CmdOrCtrl+V'],
      ['edit.copy-as-markdown', 'CmdOrCtrl+Shift+C'],
      ['edit.paste-as-plaintext', 'CmdOrCtrl+Shift+V'],
      ['edit.select-all', 'CmdOrCtrl+A'],
      ['edit.duplicate', 'CmdOrCtrl+Alt+D'],
      ['edit.create-paragraph', 'Shift+CmdOrCtrl+N'],
      ['edit.delete-paragraph', 'Shift+CmdOrCtrl+D'],

      // Paragraph menu
      ['paragraph.heading-1', 'CmdOrCtrl+1'],
      ['paragraph.heading-2', 'CmdOrCtrl+2'],
      ['paragraph.heading-3', 'CmdOrCtrl+3'],
      ['paragraph.heading-4', 'CmdOrCtrl+4'],
      ['paragraph.heading-5', 'CmdOrCtrl+5'],
      ['paragraph.heading-6', 'CmdOrCtrl+6'],
      ['paragraph.upgrade-heading', 'CmdOrCtrl+='],
      ['paragraph.degrade-heading', 'CmdOrCtrl+-'],
      ['paragraph.table', 'CmdOrCtrl+Shift+T'],
      ['paragraph.code-fence', 'CmdOrCtrl+Alt+C'],
      ['paragraph.quote-block', 'CmdOrCtrl+Alt+Q'],
      ['paragraph.math-formula', 'CmdOrCtrl+Alt+M'],
      ['paragraph.html-block', isMac ? 'CmdOrCtrl+Alt+J' : 'CmdOrCtrl+Alt+H'],
      ['paragraph.order-list', 'CmdOrCtrl+Alt+O'],
      ['paragraph.bullet-list', 'CmdOrCtrl+Alt+U'],
      ['paragraph.task-list', 'CmdOrCtrl+Alt+X'],
      ['paragraph.loose-list-item', 'CmdOrCtrl+Alt+L'],
      ['paragraph.paragraph', 'CmdOrCtrl+0'],
      ['paragraph.horizontal-line', 'CmdOrCtrl+Alt+-'],
      ['paragraph.front-matter', 'CmdOrCtrl+Alt+Y'],

      // Format menu
      ['format.strong', 'CmdOrCtrl+B'],
      ['format.italic', 'CmdOrCtrl+I'],
      ['format.underline', 'CmdOrCtrl+U'],
      ['format.highlight', 'Shift+CmdOrCtrl+H'],
      ['format.inline-code', 'CmdOrCtrl+`'],
      ['format.inline-math', 'Shift+CmdOrCtrl+M'],
      ['format.strike', 'CmdOrCtrl+D'],
      ['format.hyperlink', 'CmdOrCtrl+L'],
      ['format.image', 'CmdOrCtrl+Shift+I'],
      ['format.format-document', 'Shift+CmdOrCtrl+K'],
      ['format.clear-format', 'Shift+CmdOrCtrl+R'],
      // View Shortcut
      ['view.switch-view', 'CmdOrCtrl+Shift+,'],
      ['view.source-mode', 'CmdOrCtrl+Shift+.'],
      ['view.lock-mode', 'CmdOrCtrl+Shift+L'],
      ['view.devtool', 'CmdOrCtrl+Shift+P'],
      // Note Shortcut
      ['note.save', 'CmdOrCtrl+S']
    ])
  }

  getAccelerator (id) {
    const name = this.keys.get(id)
    if (!name) {
      return ''
    }
    return name
  }

  registerKeyHandlers (win, acceleratorMap) {
    for (const item of acceleratorMap) {
      const { accelerator } = item

      // Register shortcuts on the BrowserWindow instead of using Chromium's native menu.
      // This makes it possible to receive key down events before Chromium/Electron and we
      // can handle reserved Chromium shortcuts. Afterwards prevent the default action of
      // the event so the native menu is not triggered.
      electronLocalshortcut.register(win, accelerator, () => {
        console.log(`You pressed ${accelerator}`)
        callMenuCallback(item, win)
        return true // prevent default action
      })
    }
  }
}

const callMenuCallback = (menuInfo, win) => {
  const { click, id } = menuInfo
  if (click) {
    let menuItem = null
    if (id) {
      const menus = Menu.getApplicationMenu()
      menuItem = menus.getMenuItemById(id)
    }

    // Allow all shortcuts/menus without id and only enabled menus with id (GH#980).
    if (!menuItem || menuItem.enabled !== false) {
      click(menuItem, win)
    }
  } else {
    console.error('ERROR: callback function is not defined.')
  }
}
