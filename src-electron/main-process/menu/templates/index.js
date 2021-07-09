import memocast from './memocast'
import paragraph from './paragraph'
import edit from './edit'
import format from './format'
import view from './view'
import note from './note'
import help from './help'

export const parseMenu = menuTemplate => {
  const {
    submenu,
    accelerator,
    click,
    id,
    visible
  } = menuTemplate
  const items = []
  if (Array.isArray(menuTemplate)) {
    for (const item of menuTemplate) {
      const subitems = parseMenu(item)
      if (subitems) items.push(...subitems)
    }
  } else if (submenu) {
    const subitems = parseMenu(submenu)
    if (subitems) items.push(...subitems)
  } else if ((visible === undefined || visible) && accelerator && click) {
    items.push({
      accelerator,
      click,
      id // may be null
    })
  }
  return items.length === 0 ? null : items
}

export default function (keybindings, window) {
  /**
   * Register editor format shortcut
   */
  const formatShortcutMap = parseMenu(format(keybindings))
  keybindings.registerKeyHandlers(window, formatShortcutMap)
  // keybindings.registerKeyHandlers()
  return [
    ...(process.platform === 'darwin' ? [memocast(keybindings)] : []),
    note(keybindings),
    paragraph(keybindings),
    edit(keybindings),
    format(keybindings),
    view(keybindings),
    help()
  ]
}
