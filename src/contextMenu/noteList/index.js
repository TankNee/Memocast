import {
  RENAME,
  COPY,
  MOVE,
  EXPORT,
  DELETE,
  SEPARATOR
} from './menuItems'
import { i18n } from 'boot/i18n'
import { popContextMenu } from 'src/ApiInvoker'

/**
 * Show editor context menu.
 *
 * @param {MouseEvent} event The native mouse event.
 * @param {string} isCurrentNote
 */
export const showContextMenu = (event, isCurrentNote) => {
  const ITEMS = [RENAME, COPY, SEPARATOR, MOVE, EXPORT, SEPARATOR, DELETE]
  EXPORT.enabled = isCurrentNote
  // EXPORT.submenu.find(v => v.label === 'PNG').enabled = isCurrentNote
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
