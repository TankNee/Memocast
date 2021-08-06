import * as contextMenu from './actions'

export const SAVE_AS_PNG = {
  label: 'saveAsPNG',
  id: 'saveAsPNGMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.saveAsPNG()
  }
}

export const SAVE_AS_SVG = {
  label: 'saveAsSVG',
  id: 'saveAsSVGMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.saveAsSVG()
  }
}

export const SAVE_AS_HTML = {
  label: 'saveAsHTML',
  id: 'saveAsHTMLMenuItem',
  click (menuItem, browserWindow) {
    contextMenu.saveAsHTML()
  }
}

export const SEPARATOR = {
  type: 'separator'
}
