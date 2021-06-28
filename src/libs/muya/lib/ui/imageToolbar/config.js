import editIcon from '../../assets/pngicon/imageEdit/2.png'
import inlineIcon from '../../assets/pngicon/inline_image/2.png'
import leftIcon from '../../assets/pngicon/algin_left/2.png'
import middleIcon from '../../assets/pngicon/algin_center/2.png'
import rightIcon from '../../assets/pngicon/algin_right/2.png'
import deleteIcon from '../../assets/pngicon/image_delete/2.png'
import { i18n } from 'boot/i18n'

const icons = [
  {
    type: 'edit',
    tooltip: () => i18n.t('editImage'),
    icon: editIcon
  },
  {
    type: 'inline',
    tooltip: () => i18n.t('inlineImage'),
    icon: inlineIcon
  },
  {
    type: 'left',
    tooltip: () => i18n.t('alignLeft'),
    icon: leftIcon
  },
  {
    type: 'center',
    tooltip: () => i18n.t('alignMiddle'),
    icon: middleIcon
  },
  {
    type: 'right',
    tooltip: () => i18n.t('alignRight'),
    icon: rightIcon
  },
  {
    type: 'delete',
    tooltip: () => i18n.t('removeImage'),
    icon: deleteIcon
  }
]

export default icons
