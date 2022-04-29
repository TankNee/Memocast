export function packClickFunction (eventName, eventData = '') {
  return {
    eventName,
    eventData
  }
}
