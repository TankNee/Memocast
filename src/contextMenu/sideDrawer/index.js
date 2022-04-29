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
import helper from 'src/utils/helper'
import { popContextMenu } from 'src/ApiInvoker'

/**
 * Show editor context menu.
 *
 * @param {MouseEvent} event The native mouse event.
 * @param {boolean} isCurrentCategory
 * @param {string} category
 */
export const showContextMenu = (event, isCurrentCategory, category) => {
  EXPORT.enabled = isCurrentCategory
  if (helper.isNullOrEmpty(category)) {
    EXPORT.enabled = false
    DELETE.enabled = false
  }
  const ITEMS = [OPEN_CATEGORY, SEPARATOR, CREATE_CATEGORY, EXPORT, SEPARATOR, DELETE]

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
