import { shell } from 'electron'

export default function () {
  return {
    label: '&Help',
    role: 'help',
    submenu: [{
      label: 'Quick Start',
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/docs/README.md').then()
      }
    }, {
      label: 'Changelog',
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/.github/CHANGELOG.md').then()
      }
    }, {
      type: 'separator'
    }, {
      label: 'Report Issue or Feature request',
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/issues').then()
      }
    }, {
      type: 'separator'
    }, {
      label: 'Watch on GitHub',
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast').then()
      }
    }, {
      type: 'separator'
    }, {
      label: 'License',
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/LICENSE').then()
      }
    }]
  }
}
