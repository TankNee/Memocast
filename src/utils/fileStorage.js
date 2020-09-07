const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getValueFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
const isKeyExists = (key) => {
  return !!localStorage.getItem(key)
}
export default {
  saveToLocalStorage,
  getValueFromLocalStorage,
  isKeyExists
}
