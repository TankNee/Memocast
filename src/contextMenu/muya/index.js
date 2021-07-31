import { remote } from 'electron'
import {
  CUT,
  COPY,
  PASTE,
  COPY_AS_MARKDOWN,
  COPY_AS_HTML,
  PASTE_AS_PLAIN_TEXT,
  SEPARATOR,
  INSERT_BEFORE,
  INSERT_AFTER,
  FORMAT_DOCUMENT_BY_PANGU,
  GENERATE_MINDMAP
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
 * @param {*} selection The editor line with start and end offset.
 */
export const showContextMenu = (event, selection) => {
  const {
    start,
    end
  } = selection
  const menu = new Menu()
  const win = remote.getCurrentWindow()
  const disableCutAndCopy = start.key === end.key && start.offset === end.offset
  const CONTEXT_ITEMS = [INSERT_BEFORE, INSERT_AFTER, SEPARATOR, CUT, COPY, PASTE, SEPARATOR, COPY_AS_MARKDOWN, COPY_AS_HTML, SEPARATOR, PASTE_AS_PLAIN_TEXT, FORMAT_DOCUMENT_BY_PANGU, SEPARATOR, GENERATE_MINDMAP]

  const editActions = [CUT, COPY, COPY_AS_HTML, COPY_AS_MARKDOWN]
  editActions.forEach(item => {
    item.enabled = !disableCutAndCopy
  })

  const MENU_ITEM = CONTEXT_ITEMS.map(item => {
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
