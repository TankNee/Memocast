import memocast from './memocast'
import paragraph from './paragraph'
import edit from './edit'
import format from './format'
import view from './view'
import help from './help'

export default function (keybindings) {
  return [
    ...(process.platform === 'darwin' ? [memocast(keybindings)] : []),
    paragraph(keybindings),
    edit(keybindings),
    format(keybindings),
    view(keybindings),
    help()
  ]
}
