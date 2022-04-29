import * as contextMenu from './actions'

export const SAVE_AS_PNG = {
  label: 'saveAsPNG',
  id: 'saveAsPNGMenuItem',
  click: contextMenu.saveAsPNG()
}

export const SAVE_AS_SVG = {
  label: 'saveAsSVG',
  id: 'saveAsSVGMenuItem',
  click: contextMenu.saveAsSVG()
}

export const SAVE_AS_HTML = {
  label: 'saveAsHTML',
  id: 'saveAsHTMLMenuItem',
  click: contextMenu.saveAsHTML()
}

export const SEPARATOR = {
  type: 'separator'
}
