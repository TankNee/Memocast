import { remote } from 'electron'
import {
  OPEN_CATEGORY,
  // RENAME,
  CREATE_CATEGORY,
  // CREATE_NOTE,
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
 * @param {boolean} isCurrentCategory
 */
export const showContextMenu = (event, isCurrentCategory) => {
  const menu = new Menu()
  const win = remote.getCurrentWindow()
  EXPORT.enabled = isCurrentCategory
  const ITEMS = [OPEN_CATEGORY, SEPARATOR, CREATE_CATEGORY, EXPORT, SEPARATOR, DELETE]

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
