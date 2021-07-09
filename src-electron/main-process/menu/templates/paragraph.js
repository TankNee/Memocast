import * as actions from '../actions/paragraph'
import i18n from '../../i18n'
/**
 *
 * @param {KeyBindings} keybindings
 * @returns {{submenu: [{accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], id: string, label: string}}
 */
export default function (keybindings) {
  return {
    id: 'paragraphMenuEntry',
    label: i18n.t('paragraph'),
    submenu: [{
      id: 'heading1MenuItem',
      label: i18n.t('heading1'),
      accelerator: keybindings.getAccelerator('paragraph.heading-1'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 1')
      }
    }, {
      id: 'heading2MenuItem',
      label: i18n.t('heading2'),
      accelerator: keybindings.getAccelerator('paragraph.heading-2'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 2')
      }
    }, {
      id: 'heading3MenuItem',
      label: i18n.t('heading3'),
      accelerator: keybindings.getAccelerator('paragraph.heading-3'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 3')
      }
    }, {
      id: 'heading4MenuItem',
      label: i18n.t('heading4'),
      accelerator: keybindings.getAccelerator('paragraph.heading-4'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 4')
      }
    }, {
      id: 'heading5MenuItem',
      label: i18n.t('heading5'),
      accelerator: keybindings.getAccelerator('paragraph.heading-5'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 5')
      }
    }, {
      id: 'heading6MenuItem',
      label: i18n.t('heading6'),
      accelerator: keybindings.getAccelerator('paragraph.heading-6'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 6')
      }
    }, {
      type: 'separator'
    }, {
      id: 'upgradeHeadingMenuItem',
      label: i18n.t('upgradeHeading'),
      accelerator: keybindings.getAccelerator('paragraph.upgrade-heading'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'upgrade heading')
      }
    }, {
      id: 'degradeHeadingMenuItem',
      label: i18n.t('degradeHeading'),
      accelerator: keybindings.getAccelerator('paragraph.degrade-heading'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'degrade heading')
      }
    }, {
      type: 'separator'
    }, {
      id: 'tableMenuItem',
      label: i18n.t('table'),
      accelerator: keybindings.getAccelerator('paragraph.table'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'table')
      }
    }, {
      id: 'codeFencesMenuItem',
      label: i18n.t('codeFences'),
      accelerator: keybindings.getAccelerator('paragraph.code-fence'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'pre')
      }
    }, {
      id: 'quoteBlockMenuItem',
      label: i18n.t('quoteBlock'),
      accelerator: keybindings.getAccelerator('paragraph.quote-block'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'blockquote')
      }
    }, {
      id: 'mathBlockMenuItem',
      label: i18n.t('mathBlock'),
      accelerator: keybindings.getAccelerator('paragraph.math-formula'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'mathblock')
      }
    }, {
      id: 'htmlBlockMenuItem',
      label: i18n.t('htmlBlock'),
      accelerator: keybindings.getAccelerator('paragraph.html-block'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'html')
      }
    }, {
      type: 'separator'
    }, {
      id: 'orderListMenuItem',
      label: i18n.t('orderList'),
      accelerator: keybindings.getAccelerator('paragraph.order-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ol-order')
      }
    }, {
      id: 'bulletListMenuItem',
      label: i18n.t('bulletList'),
      accelerator: keybindings.getAccelerator('paragraph.bullet-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ul-bullet')
      }
    }, {
      id: 'toDoListMenuItem',
      label: i18n.t('toDoList'),
      accelerator: keybindings.getAccelerator('paragraph.task-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ul-task')
      }
    }, {
      type: 'separator'
    }, {
      id: 'looseListItemMenuItem',
      label: i18n.t('looseListItem'),
      accelerator: keybindings.getAccelerator('paragraph.loose-list-item'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'loose-list-item')
      }
    }, {
      type: 'separator'
    }, {
      id: 'paragraphMenuItem',
      label: i18n.t('paragraph'),
      accelerator: keybindings.getAccelerator('paragraph.paragraph'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'paragraph')
      }
    }, {
      id: 'horizontalLineMenuItem',
      label: i18n.t('horizontalLine'),
      accelerator: keybindings.getAccelerator('paragraph.horizontal-line'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'hr')
      }
    }, {
      id: 'frontMatterMenuItem',
      label: i18n.t('frontMatter'),
      accelerator: keybindings.getAccelerator('paragraph.front-matter'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'front-matter')
      }
    }]
  }
}
