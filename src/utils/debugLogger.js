import consola from 'consola'

function Log () {
  consola.log(...arguments)
}
function Error () {
  consola.error(...arguments)
}
function Info () {
  consola.info(...arguments)
}
function Debug () {
  consola.warn(...arguments)
}
export default {
  Log,
  Error,
  Info,
  Debug
}
