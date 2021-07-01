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
      ['edit.save', 'CmdOrCtrl+S'],
      ['edit.cut', 'CmdOrCtrl+X'],
      ['edit.copy', 'CmdOrCtrl+C'],
      ['edit.paste', 'CmdOrCtrl+V'],
      ['edit.copy-as-markdown', 'CmdOrCtrl+Shift+C'],
      ['edit.copy-as-plaintext', 'CmdOrCtrl+Shift+V'],
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
      ['format.emphasis', 'CmdOrCtrl+I'],
      ['format.underline', 'CmdOrCtrl+U'],
      ['format.highlight', 'Shift+CmdOrCtrl+H'],
      ['format.inline-code', 'CmdOrCtrl+`'],
      ['format.inline-math', 'Shift+CmdOrCtrl+M'],
      ['format.strike', 'CmdOrCtrl+D'],
      ['format.hyperlink', 'CmdOrCtrl+L'],
      ['format.image', 'CmdOrCtrl+Shift+I'],
      ['format.clear-format', 'Shift+CmdOrCtrl+R'],
      // View Shortcut
      ['view.switch-view', 'CmdOrCtrl+Shift+,'],
      ['view.source-mode', 'CmdOrCtrl+Shift+.'],
      ['view.lock-mode', 'CmdOrCtrl+Shift+L']
    ])
  }

  getAccelerator (id) {
    const name = this.keys.get(id)
    if (!name) {
      return ''
    }
    return name
  }
}
