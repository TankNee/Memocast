// used for render table toolbar or others.
import { h } from '../snabbdom'
import { CLASS_OR_ID } from '../../../config'
import TableIcon from '../../../assets/pngicon/table/table@2x.png'
import AlignLeftIcon from '../../../assets/pngicon/algin_left/2.png'
import AlignRightIcon from '../../../assets/pngicon/algin_right/2.png'
import AlignCenterIcon from '../../../assets/pngicon/algin_center/2.png'
import DeleteIcon from '../../../assets/pngicon/table_delete/2.png'
import { i18n } from 'boot/i18n'

export const TABLE_TOOLS = [{
  label: 'table',
  title: () => i18n.t('resizeTable'),
  icon: TableIcon
}, {
  label: 'left',
  title: () => i18n.t('alignLeft'),
  icon: AlignLeftIcon
}, {
  label: 'center',
  title: () => i18n.t('alignMiddle'),
  icon: AlignCenterIcon
}, {
  label: 'right',
  title: () => i18n.t('alignRight'),
  icon: AlignRightIcon
}, {
  label: 'delete',
  title: () => i18n.t('deleteTable'),
  icon: DeleteIcon
}]

const renderToolBar = (type, tools, activeBlocks) => {
  const children = tools.map(tool => {
    const { label, title, icon } = tool
    const { align } = activeBlocks[1] // activeBlocks[0] is span block. cell content.
    let selector = 'li'
    if (align && label === align) {
      selector += '.active'
    }
    const iconVnode = h('i.icon', {
      style: {
        background: `url(${icon}) no-repeat`,
        'background-size': '100%'
      }
    })
    return h(selector, {
      dataset: {
        label,
        tooltip: title()
      }
    }, iconVnode)
  })
  const selector = `div.ag-tool-${type}.${CLASS_OR_ID.AG_TOOL_BAR}`

  return h(selector, {
    attrs: {
      contenteditable: false
    }
  }, h('ul', children))
}

export const renderTableTools = (activeBlocks) => {
  return renderToolBar('table', TABLE_TOOLS, activeBlocks)
}
