import {
  // SAVE_AS_PNG,
  // SAVE_AS_SVG,
  SAVE_AS_HTML
  // SEPARATOR
} from './menuItems'
import { i18n } from 'boot/i18n'
import { popContextMenu } from 'src/ApiInvoker'

/**
 * Show editor context menu.
 *
 * @param {MouseEvent} event The native mouse event.
 */
export const showContextMenu = (event) => {
  const ITEMS = [SAVE_AS_HTML]

  const MENU_ITEM = ITEMS.map(item => {
    if (item.type === 'separator') return item
    return {
      ...item,
      label: i18n.t(item.label)
    }
  })

  popContextMenu({
    x: event.clientX,
    y: event.clientY,
    menuItems: MENU_ITEM
  }).then(console.log)
}
