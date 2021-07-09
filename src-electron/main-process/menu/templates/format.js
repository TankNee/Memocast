import * as actions from '../actions/format'
import i18n from '../../i18n'

export default function (keybindings) {
  return {
    id: 'formatMenuItem',
    label: i18n.t('format'),
    submenu: [{
      id: 'strongMenuItem',
      label: i18n.t('strong'),
      accelerator: keybindings.getAccelerator('format.strong'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'strong')
      }
    }, {
      id: 'italicMenuItem',
      label: i18n.t('italic'),
      accelerator: keybindings.getAccelerator('format.italic'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'em')
      }
    }, {
      id: 'underlineMenuItem',
      label: i18n.t('underline'),
      accelerator: keybindings.getAccelerator('format.underline'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'u')
      }
    }, {
      type: 'separator'
    }, {
      id: 'superscriptMenuItem',
      label: i18n.t('superscript'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'sup')
      }
    }, {
      id: 'subscriptMenuItem',
      label: i18n.t('subscript'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'sub')
      }
    }, {
      id: 'highlightMenuItem',
      label: i18n.t('highlight'),
      accelerator: keybindings.getAccelerator('format.highlight'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'mark')
      }
    }, {
      type: 'separator'
    }, {
      id: 'inlineCodeMenuItem',
      label: i18n.t('inlineCode'),
      accelerator: keybindings.getAccelerator('format.inline-code'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'inline_code')
      }
    }, {
      id: 'inlineMathMenuItem',
      label: i18n.t('inlineMath'),
      accelerator: keybindings.getAccelerator('format.inline-math'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'inline_math')
      }
    }, {
      type: 'separator'
    }, {
      id: 'strikeMenuItem',
      label: i18n.t('strike'),
      accelerator: keybindings.getAccelerator('format.strike'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'del')
      }
    }, {
      id: 'hyperlinkMenuItem',
      label: i18n.t('hyperlink'),
      accelerator: keybindings.getAccelerator('format.hyperlink'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'link')
      }
    }, {
      id: 'imageMenuItem',
      label: i18n.t('image'),
      accelerator: keybindings.getAccelerator('format.image'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'image')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('formatDocument'),
      accelerator: keybindings.getAccelerator('format.format-document'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'format-document')
      }
    }, {
      label: i18n.t('clearFormat'),
      accelerator: keybindings.getAccelerator('format.clear-format'),
      click (menuItem, browserWindow) {
        actions.format(browserWindow, 'clear')
      }
    }]
  }
}
