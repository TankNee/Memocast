import { i18n } from 'boot/i18n'
export const toolList = {
  left: [{
    label: () => i18n.t('insertRowAbove'),
    action: 'insert',
    location: 'previous',
    target: 'row'
  }, {
    label: () => i18n.t('insertRowBelow'),
    action: 'insert',
    location: 'next',
    target: 'row'
  }, {
    label: () => i18n.t('removeRow'),
    action: 'remove',
    location: 'current',
    target: 'row'
  }],
  bottom: [{
    label: () => i18n.t('insertColumnLeft'),
    action: 'insert',
    location: 'left',
    target: 'column'
  }, {
    label: () => i18n.t('insertColumnRight'),
    action: 'insert',
    location: 'right',
    target: 'column'
  }, {
    label: () => i18n.t('removeColumn'),
    action: 'remove',
    location: 'current',
    target: 'column'
  }]
}
