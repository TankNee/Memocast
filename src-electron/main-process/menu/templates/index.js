import memocast from './memocast'
import paragraph from './paragraph'
import edit from './edit'
import format from './format'

export default function (keybindings) {
  return [
    ...(process.platform === 'darwin' ? [memocast(keybindings)] : []),
    paragraph(keybindings),
    edit(keybindings),
    format(keybindings)
  ]
}
