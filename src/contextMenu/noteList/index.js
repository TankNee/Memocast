import { remote } from 'electron'
import {
  RENAME,
  COPY,
  MOVE,
  EXPORT,
  DELETE,
  SEPARATOR
} from './menuItems'
import { i18n } from 'boot/i18n'
const {
  Menu,
  MenuItem
} = remote

/**
 * Show editor context menu.
 *
 * @param {MouseEvent} event The native mouse event.
 * @param {string} isCurrentNote
 */
export const showContextMenu = (event, isCurrentNote) => {
  const menu = new Menu()
  const win = remote.getCurrentWindow()
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

  MENU_ITEM.forEach(item => {
    menu.append(new MenuItem(item))
  })
  menu.popup([{
    window: win,
    x: event.clientX,
    y: event.clientY
  }])
}
