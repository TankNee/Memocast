import bus from 'src/components/bus'
import events from 'src/constants/events'

export const saveAsPNG = (menuItem, browserWindow) => {
  bus.$emit(events.MARK_MAP_CONTEXT_MENU.saveAsPNG)
}

export const saveAsSVG = (menuItem, browserWindow) => {
  bus.$emit(events.MARK_MAP_CONTEXT_MENU.saveAsSVG)
}

export const saveAsHTML = (menuItem, browserWindow) => {
  bus.$emit(events.MARK_MAP_CONTEXT_MENU.saveAsHTML)
}
