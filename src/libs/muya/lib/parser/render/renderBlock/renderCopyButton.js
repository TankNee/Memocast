import { h } from '../snabbdom'
import copyIcon from '../../../assets/pngicon/copy/2.png'
import { i18n } from 'boot/i18n'

const renderCopyButton = () => {
  const selector = 'a.ag-code-copy'
  const iconVnode = h('i.icon', {
    style: {
      background: `url(${copyIcon}) no-repeat`,
      'background-size': '100%'
    }
  })

  return h(selector, {
    attrs: {
      title: i18n.t('copyContent'),
      contenteditable: 'false'
    }
  }, iconVnode)
}

export default renderCopyButton
