import { shell } from 'electron'
import i18n from '../../i18n'
export default function () {
  return {
    label: i18n.t('help'),
    role: 'help',
    submenu: [{
      label: i18n.t('quickStart'),
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/docs/README.md').then()
      }
    }, {
      label: i18n.t('changelog'),
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/CHANGELOG.md').then()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('reportIssue'),
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/issues').then()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('watchOnGithub'),
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast').then()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('license'),
      click () {
        shell.openExternal('https://github.com/TankNee/Memocast/blob/master/LICENSE').then()
      }
    }]
  }
}
