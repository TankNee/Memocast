<template>
  <div class='flex justify-center full-height full-width'>
    <div
      id='muya'
      class='full-height full-width animated fadeIn'
      v-show='!isCurrentNoteLoading && dataLoaded'
      v-close-popup
    >
      <div ref='muya'></div>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import Muya from 'src/libs/muya/lib'
import bus from 'components/bus'
import events from 'src/constants/events'
import 'src/libs/muya/themes/default.css'
import 'src/css/muya.css'
import TablePicker from 'src/libs/muya/lib/ui/tablePicker'
import QuickInsert from 'src/libs/muya/lib/ui/quickInsert'
import CodePicker from 'src/libs/muya/lib/ui/codePicker'
import EmojiPicker from 'src/libs/muya/lib/ui/emojiPicker'
import ImagePathPicker from 'src/libs/muya/lib/ui/imagePicker'
import ImageSelector from 'src/libs/muya/lib/ui/imageSelector'
import FormatPicker from 'src/libs/muya/lib/ui/formatPicker'
import FrontMenu from 'src/libs/muya/lib/ui/frontMenu'
import ImageToolbar from 'src/libs/muya/lib/ui/imageToolbar'
import LinkTools from 'src/libs/muya/lib/ui/linkTools'
import TableBarTools from 'src/libs/muya/lib/ui/tableTools'
import Transformer from 'src/libs/muya/lib/ui/transformer'
import debugLogger from 'src/utils/debugLogger'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')

const {
  mapState: mapClientState,
  mapActions: mapClietnActions
} = createNamespacedHelpers('client')
export default {
  name: 'Muya',
  props: {
    data: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      contentEditor: {}
    }
  },
  computed: {
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerState(['isCurrentNoteLoading', 'contentsList']),
    ...mapServerGetters(['currentNote', 'uploadImageUrl', 'currentNoteResources', 'currentNoteResourceUrl']),
    ...mapClientState(['darkMode', 'enablePreviewEditor'])
  },
  methods: {
    getValue: function () {
      return this.contentEditor?.getMarkdown()
    },
    registerKeyboardHotKey: function (e) {
      if (!this.active) return
      const key = window.event.keyCode
        ? window.event.keyCode
        : window.event.which
      if (helper.isCtrl(e)) {
        switch (key) {
          case 83:
            this.updateNote(this.contentEditor.getMarkdown())
            break
          case 90:
            if (e.shiftKey) {
              this.contentEditor.redo()
            } else {
              this.contentEditor.undo()
            }
            break
          default:
            break
        }
      }
    },
    ...mapServerActions(['updateNote', 'updateNoteState', 'updateContentsList']),
    ...mapClietnActions(['importImagesFromLocal'])
  },
  created () {
    this.$nextTick(() => {
      Muya.use(TablePicker)
      Muya.use(QuickInsert)
      Muya.use(CodePicker)
      Muya.use(EmojiPicker)
      Muya.use(ImagePathPicker)
      Muya.use(ImageToolbar)
      Muya.use(ImageSelector)
      Muya.use(FormatPicker)
      Muya.use(FrontMenu)
      Muya.use(LinkTools, {
        jumpClick: (linkInfo) => {
          window.open(linkInfo.href)
        }
      })
      Muya.use(Transformer)
      Muya.use(TableBarTools)

      this.contentEditor = new Muya(this.$refs.muya, {
        imagePathPicker: () => {
          return new Promise((resolve, reject) => {
            this.importImagesFromLocal().then(paths => {
              resolve(paths ? paths[0] : '')
              debugLogger.Info(paths)
            }).catch(err => {
              debugLogger.Error(err)
            })
          })
          // const paths = this.importImagesFromLocal()
          // // TODO: 增加一个上传选项
          // console.log(paths)
          // return paths ? paths[0] : null
        }
      })

      document.addEventListener('keydown', (e) => {
        if (!e.srcElement.className.includes('ag-') || helper.isCtrl(e)) return
        const curData = this.contentEditor.getMarkdown()
        // eslint-disable-next-line eqeqeq
        if (curData != this.currentNote) {
          this.updateNoteState('changed')
          this.updateContentsList(this.contentEditor.getTOC())
        } else {
          this.updateNoteState('default')
        }
        const cursor = this.contentEditor.getCursor()
        if (cursor.anchor.line >= this.contentEditor.getWordCount(curData).line - 2) {
          bus.$emit(events.SCROLL_DOWN)
        }
      })
      document.addEventListener('keydown', this.registerKeyboardHotKey)

      bus.$on(events.PARAGRAPH_SHORTCUT_CALL, (type) => {
        this.contentEditor.updateParagraph(type)
      })

      bus.$on(events.FORMAT_SHORTCUT_CALL, (type) => {
        this.contentEditor.format(type)
      })
    })
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setMarkdown(currentData)
        this.updateContentsList(this.contentEditor.getTOC())
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e, e.message)
      }
    },
    enablePreviewEditor: function (val) {
      console.log('Content Editable', document.querySelector('.ag-show-quick-insert-hint'))
      document.querySelector('.ag-show-quick-insert-hint').setAttribute('contenteditable', val)
    },
    data: function (val) {
      this.contentEditor.setMarkdown(val)
      this.updateContentsList(this.contentEditor.getTOC())
    }
  }
}
</script>

<style scoped>

</style>
