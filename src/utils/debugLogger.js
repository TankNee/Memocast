import consola from 'consola'

function Log (payload) {
  consola.log(payload)
}
function Error (payload) {
  consola.error(payload)
}
function Info (payload) {
  consola.info(payload)
}
function Debug (payload) {
  consola.warn(payload)
}
export default {
  Log,
  Error,
  Info,
  Debug
}
