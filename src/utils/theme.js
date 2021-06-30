import { oneDark, light } from 'src/utils/themeColor'

export const railscastsThemes = ['dark', 'material-dark']
export const oneDarkThemes = ['one-dark']

const patchTheme = css => {
  return `@media not print {\n${css}\n}`
}

export function attachThemeColor (theme) {
  const isCmRailscasts = railscastsThemes.includes(theme)
  const isCmOneDark = oneDarkThemes.includes(theme)
  const isDarkTheme = isCmOneDark || isCmRailscasts
  let themeStyleEle = document.getElementById('ag-theme')
  if (!themeStyleEle) {
    themeStyleEle = document.createElement('style')
    themeStyleEle.id = 'ag-theme'
    document.head.appendChild(themeStyleEle)
  }

  switch (theme) {
    case 'one-dark': {
      themeStyleEle.innerHTML = patchTheme(oneDark())
      break
    }
    case 'light' : {
      themeStyleEle.innerHTML = patchTheme(light())
      break
    }
  }

  document.body.classList.remove('dark')
  if (isDarkTheme) {
    document.body.classList.add('dark')
  }

  const cm = document.querySelector('.CodeMirror')
  if (cm) {
    cm.classList.remove('cm-s-default')
    cm.classList.remove('cm-s-one-dark')
    cm.classList.remove('cm-s-railscasts')
    if (isCmOneDark) {
      cm.classList.add('cm-s-one-dark')
    } else if (isCmRailscasts) {
      cm.classList.add('cm-s-railscasts')
    } else {
      cm.classList.add('cm-s-default')
    }
  }
}
