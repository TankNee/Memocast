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
// import 'src/css/muya.css'
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
import { attachThemeColor } from 'src/utils/theme'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')

const {
  mapState: mapClientState,
  mapActions: mapClientActions
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
    paragraphHandler: function (type) {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.updateParagraph(type)
        this.updateContentsList(this.contentEditor.getTOC())
      }
    },
    formatHandler: function (type) {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.format(type)
      }
    },
    editParagraphHandler: function (type) {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        switch (type) {
          case 'duplicate': {
            return this.contentEditor.duplicate()
          }
          case 'createParagraph': {
            return this.contentEditor.insertParagraph('after', '', true)
          }
          case 'deleteParagraph': {
            return this.contentEditor.deleteParagraph()
          }
          default:
            console.error(`Cannot recognize paragraph edit type: ${type}`)
        }
      }
    },
    editCopyPasteHandler: function (type) {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor[type]()
      }
    },
    saveHandler: function () {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.updateNote(this.contentEditor.getMarkdown())
      }
    },
    selectAllHandler: function () {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.selectAll()
      }
    },
    undoHandler: function () {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.undo()
      }
    },
    redoHandler: function () {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.redo()
      }
    },
    ...mapServerActions(['updateNote', 'updateNoteState', 'updateContentsList']),
    ...mapClientActions(['importImagesFromLocal'])
  },
  created () {
    this.$nextTick(() => {
      // const theme = document.createElement('style')
      // theme.type = 'text/css'
      // theme.id = 'muya-theme'
      // theme.innerHTML = '  --titleBarHeight: 32px;\n' +
      //   '  --editorAreaWidth: 90%;\n' +
      //   '\n' +
      //   '  /*editor*/\n' +
      //   '  /*Theme color cluster*/\n' +
      //   '  --themeColor: rgba(33, 181, 111, 1);\n' +
      //   '  --themeColor90: rgba(33, 181, 111, .9);\n' +
      //   '  --themeColor80: rgba(33, 181, 111, .8);\n' +
      //   '  --themeColor70: rgba(33, 181, 111, .7);\n' +
      //   '  --themeColor60: rgba(33, 181, 111, .6);\n' +
      //   '  --themeColor50: rgba(33, 181, 111, .5);\n' +
      //   '  --themeColor40: rgba(33, 181, 111, .4);\n' +
      //   '  --themeColor30: rgba(33, 181, 111, .3);\n' +
      //   '  --themeColor20: rgba(33, 181, 111, .2);\n' +
      //   '  --themeColor10: rgba(33, 181, 111, .1);'
      // document.getElementsByTagName('head').item(0).appendChild(theme)

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

      if (this.darkMode) {
        attachThemeColor('one-dark')
      } else {
        attachThemeColor('light')
      }

      this.contentEditor.on('muya-click', (event) => {
        if (event.target.type === 'checkbox') {
          const curData = this.contentEditor.getMarkdown()
          // eslint-disable-next-line eqeqeq
          if (curData != this.currentNote) {
            this.updateNoteState('changed')
            this.updateContentsList(this.contentEditor.getTOC())
          } else {
            this.updateNoteState('default')
          }
        }
      })

      this.contentEditor.on('change', () => this.updateContentsList(this.contentEditor.getTOC()))

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
        this.updateContentsList(this.contentEditor.getTOC())
        const cursor = this.contentEditor.getCursor()
        if (cursor.anchor.line >= this.contentEditor.getWordCount(curData).line - 2) {
          bus.$emit(events.SCROLL_DOWN)
        }
      })

      bus.$on(events.PARAGRAPH_SHORTCUT_CALL, this.paragraphHandler)
      bus.$on(events.FORMAT_SHORTCUT_CALL, this.formatHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.undo, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.redo, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.save, this.saveHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.copyAsMarkdown, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.copyAsHtml, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.pasteAsPlainText, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.duplicate, this.editParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.selectAll, this.selectAllHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.createParagraph, this.editParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.deleteParagraph, this.editParagraphHandler)
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
    darkMode: function (mode) {
      if (mode) {
        attachThemeColor('one-dark')
      } else {
        attachThemeColor('light')
      }
    },
    enablePreviewEditor: function (val) {
      console.log('Content Editable', document.querySelector('.ag-show-quick-insert-hint'))
      document.querySelector('.ag-show-quick-insert-hint').setAttribute('contenteditable', val)
    },
    data: function (val) {
      this.contentEditor.clearHistory()
      this.contentEditor.setMarkdown(val)
      this.updateContentsList(this.contentEditor.getTOC())
    }
  }
}
</script>

<style scoped>

</style>
