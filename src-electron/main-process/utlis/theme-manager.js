import Store from 'electron-store'
import { app, shell } from 'electron'
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { handleApi } from '../api'

const ClientStorage = new Store({
  name: 'ClientFileStorage'
})

class ThemeManager {
  themePath
  themes = []
  constructor () {
    this.themePath = path.join(app.getAppPath(), 'themes')
    this.validateThemePath()
    this.initThemes()
    this.registerListener()
    ClientStorage.set('themes', this.themes)
  }

  initThemes () {
    const themeNames = fs
      .readdirSync(this.themePath)
      .filter(v => _.endsWith(v, '.css'))
    themeNames.forEach(tn => {
      if (_.endsWith(tn, '.light.css')) {
        this.themes.push({
          name: tn.replace('.light.css', ''),
          dark: false,
          fileName: tn
        })
      } else if (_.endsWith(tn, '.dark.css')) {
        this.themes.push({
          name: tn.replace('.dark.css', ''),
          dark: true,
          fileName: tn
        })
      }
    })
  }

  validateThemePath () {
    if (!fs.existsSync(this.themePath)) {
      fs.mkdirSync(this.themePath)
      fs.copyFileSync(
        path.resolve(__dirname, '../assets/css/Default-Dark.dark.css'),
        path.join(this.themePath, 'Default-Dark.dark.css')
      )
      fs.copyFileSync(
        path.resolve(__dirname, '../assets/css/Default-Light.light.css'),
        path.join(this.themePath, 'Default-Light.light.css')
      )
    }
  }

  loadThemeHandler (event, { name }) {
    const theme = this.themes.find(t => t.name === name)
    return fs.readFileSync(path.join(this.themePath, theme.fileName)).toString('utf-8')
  }

  openThemeFolderHandler () {
    shell.showItemInFolder(this.themePath)
  }

  refreshThemeFolderHandler () {
    this.themes = []
    this.initThemes()
    return this.themes
  }

  registerListener () {
    handleApi('load-theme', this.loadThemeHandler.bind(this)).catch(console.error)
    handleApi('open-theme-folder', this.openThemeFolderHandler.bind(this)).catch(console.error)
    handleApi('refresh-theme-folder', this.refreshThemeFolderHandler.bind(this)).catch(console.error)
  }
}

export default new ThemeManager()
