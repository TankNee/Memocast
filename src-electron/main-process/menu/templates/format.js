import * as actions from '../actions/format'

export default function (keybindings) {
  return {
    id: 'formatMenuItem',
    label: 'F&ormat',
    submenu: [{
      id: 'strongMenuItem',
      label: 'Strong',
      accelerator: keybindings.getAccelerator('format.strong'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'strong')
      }
    }, {
      id: 'emphasisMenuItem',
      label: 'Emphasis',
      accelerator: keybindings.getAccelerator('format.emphasis'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'em')
      }
    }, {
      id: 'underlineMenuItem',
      label: 'Underline',
      accelerator: keybindings.getAccelerator('format.underline'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'u')
      }
    }, {
      type: 'separator'
    }, {
      id: 'superscriptMenuItem',
      label: 'Superscript',
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'sup')
      }
    }, {
      id: 'subscriptMenuItem',
      label: 'Subscript',
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'sub')
      }
    }, {
      id: 'highlightMenuItem',
      label: 'Highlight',
      accelerator: keybindings.getAccelerator('format.highlight'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'mark')
      }
    }, {
      type: 'separator'
    }, {
      id: 'inlineCodeMenuItem',
      label: 'Inline Code',
      accelerator: keybindings.getAccelerator('format.inline-code'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'inline_code')
      }
    }, {
      id: 'inlineMathMenuItem',
      label: 'Inline Math',
      accelerator: keybindings.getAccelerator('format.inline-math'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'inline_math')
      }
    }, {
      type: 'separator'
    }, {
      id: 'strikeMenuItem',
      label: 'Strike',
      accelerator: keybindings.getAccelerator('format.strike'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'del')
      }
    }, {
      id: 'hyperlinkMenuItem',
      label: 'Hyperlink',
      accelerator: keybindings.getAccelerator('format.hyperlink'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'link')
      }
    }, {
      id: 'imageMenuItem',
      label: 'Image',
      accelerator: keybindings.getAccelerator('format.image'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'image')
      }
    }, {
      type: 'separator'
    }, {
      label: 'Format Document',
      accelerator: keybindings.getAccelerator('format.format-document'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'format-document')
      }
    }, {
      label: 'Clear Format',
      accelerator: keybindings.getAccelerator('format.clear-format'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'clear')
      }
    }]
  }
}
