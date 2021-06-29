import * as actions from '../actions/paragraph'

/**
 *
 * @param {KeyBindings} keybindings
 * @returns {{submenu: [{accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, {accelerator: string, id: string, label: string, click(*, *=): void}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], id: string, label: string}}
 */
export default function (keybindings) {
  return {
    id: 'paragraphMenuEntry',
    label: '&Paragraph',
    submenu: [{
      id: 'heading1MenuItem',
      label: 'Heading 1',
      accelerator: keybindings.getAccelerator('paragraph.heading-1'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 1')
      }
    }, {
      id: 'heading2MenuItem',
      label: 'Heading 2',
      accelerator: keybindings.getAccelerator('paragraph.heading-2'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 2')
      }
    }, {
      id: 'heading3MenuItem',
      label: 'Heading 3',
      accelerator: keybindings.getAccelerator('paragraph.heading-3'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 3')
      }
    }, {
      id: 'heading4MenuItem',
      label: 'Heading 4',
      accelerator: keybindings.getAccelerator('paragraph.heading-4'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 4')
      }
    }, {
      id: 'heading5MenuItem',
      label: 'Heading 5',
      accelerator: keybindings.getAccelerator('paragraph.heading-5'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 5')
      }
    }, {
      id: 'heading6MenuItem',
      label: 'Heading 6',
      accelerator: keybindings.getAccelerator('paragraph.heading-6'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'heading 6')
      }
    }, {
      type: 'separator'
    }, {
      id: 'upgradeHeadingMenuItem',
      label: 'Upgrade Heading',
      accelerator: keybindings.getAccelerator('paragraph.upgrade-heading'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'upgrade heading')
      }
    }, {
      id: 'degradeHeadingMenuItem',
      label: 'Degrade Heading',
      accelerator: keybindings.getAccelerator('paragraph.degrade-heading'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'degrade heading')
      }
    }, {
      type: 'separator'
    }, {
      id: 'tableMenuItem',
      label: 'Table',
      accelerator: keybindings.getAccelerator('paragraph.table'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'table')
      }
    }, {
      id: 'codeFencesMenuItem',
      label: 'Code Fences',
      accelerator: keybindings.getAccelerator('paragraph.code-fence'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'pre')
      }
    }, {
      id: 'quoteBlockMenuItem',
      label: 'Quote Block',
      accelerator: keybindings.getAccelerator('paragraph.quote-block'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'blockquote')
      }
    }, {
      id: 'mathBlockMenuItem',
      label: 'Math Block',
      accelerator: keybindings.getAccelerator('paragraph.math-formula'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'mathblock')
      }
    }, {
      id: 'htmlBlockMenuItem',
      label: 'Html Block',
      accelerator: keybindings.getAccelerator('paragraph.html-block'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'html')
      }
    }, {
      type: 'separator'
    }, {
      id: 'orderListMenuItem',
      label: 'Order List',
      accelerator: keybindings.getAccelerator('paragraph.order-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ol-order')
      }
    }, {
      id: 'bulletListMenuItem',
      label: 'Bullet List',
      accelerator: keybindings.getAccelerator('paragraph.bullet-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ul-bullet')
      }
    }, {
      id: 'taskListMenuItem',
      label: 'Task List',
      accelerator: keybindings.getAccelerator('paragraph.task-list'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'ul-task')
      }
    }, {
      type: 'separator'
    }, {
      id: 'looseListItemMenuItem',
      label: 'Loose List Item',
      accelerator: keybindings.getAccelerator('paragraph.loose-list-item'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'loose-list-item')
      }
    }, {
      type: 'separator'
    }, {
      id: 'paragraphMenuItem',
      label: 'Paragraph',
      accelerator: keybindings.getAccelerator('paragraph.paragraph'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'paragraph')
      }
    }, {
      id: 'horizontalLineMenuItem',
      label: 'Horizontal Line',
      accelerator: keybindings.getAccelerator('paragraph.horizontal-line'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'hr')
      }
    }, {
      id: 'frontMatterMenuItem',
      label: 'Front Matter',
      accelerator: keybindings.getAccelerator('paragraph.front-matter'),
      click (menuItem, browserWindow) {
        actions.paragraph(browserWindow, 'front-matter')
      }
    }]
  }
}
