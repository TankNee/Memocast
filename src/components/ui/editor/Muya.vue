<template>
  <div class='exclude-header' v-show='!isCurrentNoteLoading && dataLoaded'>
    <div ref='muya' id='muya' class='editor-component' v-close-popup>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import Muya from 'src/libs/muya/lib'
import bus from 'components/bus'
import _ from 'lodash'
import events from 'src/constants/events'
import 'src/libs/muya/themes/default.css'
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
import { showContextMenu as showEditorContextMenu } from 'src/contextMenu/muya'

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
      type: Object,
      default: () => ({
        markdown: '',
        cursor: {
          lineNumber: 0,
          column: 0
        }
      })
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      contentEditor: {},
      firstTimeLoad: false
    }
  },
  computed: {
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerState(['isCurrentNoteLoading', 'contentsList', 'noteState']),
    ...mapServerGetters(['currentNote', 'uploadImageUrl', 'currentNoteResources', 'currentNoteResourceUrl']),
    ...mapClientState(['darkMode', 'enablePreviewEditor', 'theme'])
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
    insertParagraphHandler: function (location) {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        this.contentEditor.insertParagraph(location)
      }
    },
    formatDocumentByPanguHandler: function () {
      if (this.active && this.enablePreviewEditor && this.contentEditor) {
        const before = this.contentEditor.getMarkdown()
        helper.formatDocumentByRemarkPangu(before).then(after => {
          if (before !== after) {
            this.contentEditor.setMarkdown(after)
            this.updateContentsList(this.contentEditor.getTOC())
            this.updateNoteState('changed')
          }
        })
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
    scrollToHeaderHandler: function (slug) {
      this.scrollToElementHandler(`#${slug}`)
    },
    scrollToElementHandler: function (selector) {
      const { container } = this.contentEditor
      const anchor = document.querySelector(selector)
      if (anchor) {
        const STANDARD_Y = window.innerHeight * 0.065
        const { y } = anchor.getBoundingClientRect()
        const DURATION = this.$q.platform.is.mac ? 300 : 0
        helper.animatedScrollTo(container, container.scrollTop + y - STANDARD_Y, DURATION)
      }
    },
    getCursorPosition: function () {
      const {
        line: lineNumber,
        ch: column
      } = this.contentEditor?.getCursor().focus
      return {
        lineNumber,
        column
      }
    },
    setCursorPosition: function (position) {
      const {
        lineNumber,
        column
      } = position
      if (this.contentEditor) {
        this.contentEditor.setCursor({
          anchor: {
            line: lineNumber,
            ch: column
          },
          focus: {
            line: lineNumber,
            ch: column
          }
        })
      }
    },
    ...mapServerActions(['updateNote', 'updateNoteState', 'updateContentsList', 'uploadImage']),
    ...mapClientActions(['importImageFromLocal'])
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

      const { container } = this.contentEditor = new Muya(this.$refs.muya, {
        imagePathPicker: () => {
          return new Promise((resolve, reject) => {
            this.importImageFromLocal().then(paths => {
              debugLogger.Info(paths)
              resolve(paths ? paths[0] : '')
            }).catch(err => {
              debugLogger.Error(err)
              reject(err)
            })
          })
        },
        imageAction: this.uploadImage
      })

      attachThemeColor(this.theme)

      this.contentEditor.on('muya-click', _.debounce((event) => {
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
      }, 800))

      this.contentEditor.on('change', () => this.updateContentsList(this.contentEditor.getTOC()))

      this.contentEditor.on('change', () => bus.$emit(events.UPDATE_WORD_COUNT, this.contentEditor.getWordCount(this.contentEditor.getMarkdown())))

      this.contentEditor.on('contextmenu', (event, selection) => {
        showEditorContextMenu(event, selection)
      })

      this.contentEditor.on('selectionChange', changes => {
        const { y } = changes.cursorCoords

        if (container.clientHeight - y < 100) {
          const editableHeight = container.clientHeight - 100
          if (this.$q.platform.is.mac) {
            helper.animatedScrollTo(container, container.scrollTop + (y - editableHeight), 100)
          } else {
            container.scrollTop = container.scrollTop + (y - editableHeight)
          }
        }
      })

      this.contentEditor.on('change', _.debounce(({ markdown: curData }) => {
        if (curData.replace(/\s/g, '') === this.currentNote.replace(/\s/g, '') || this.noteState === 'none' || this.firstTimeLoad) {
          this.updateNoteState('default')
          this.firstTimeLoad = false
        } else {
          this.updateNoteState('changed')
          this.updateContentsList(this.contentEditor.getTOC())
        }
        this.updateContentsList(this.contentEditor.getTOC())
      }, 300, { leading: true }))

      bus.$on(events.SCROLL_TO_HEADER, this.scrollToHeaderHandler)
      bus.$on(events.PARAGRAPH_SHORTCUT_CALL, this.paragraphHandler)
      bus.$on(events.FORMAT_SHORTCUT_CALL, this.formatHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.undo, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.redo, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.copyAsMarkdown, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.copyAsHtml, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.pasteAsPlainText, this.editCopyPasteHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.duplicate, this.editParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.selectAll, this.selectAllHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.createParagraph, this.editParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.deleteParagraph, this.editParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.insertParagraph, this.insertParagraphHandler)
      bus.$on(events.EDIT_SHORTCUT_CALL.formatDocumentByPangu, this.formatDocumentByPanguHandler)
      bus.$on(events.NOTE_SHORTCUT_CALL.save, this.saveHandler)
    })
  },
  beforeDestroy () {
    bus.$off(events.PARAGRAPH_SHORTCUT_CALL)
    bus.$off(events.FORMAT_SHORTCUT_CALL)
    bus.$off(events.EDIT_SHORTCUT_CALL.undo)
    bus.$off(events.EDIT_SHORTCUT_CALL.redo)
    bus.$off(events.EDIT_SHORTCUT_CALL.save)
    bus.$off(events.EDIT_SHORTCUT_CALL.copyAsMarkdown)
    bus.$off(events.EDIT_SHORTCUT_CALL.copyAsHtml)
    bus.$off(events.EDIT_SHORTCUT_CALL.pasteAsPlainText)
    bus.$off(events.EDIT_SHORTCUT_CALL.duplicate)
    bus.$off(events.EDIT_SHORTCUT_CALL.selectAll)
    bus.$off(events.EDIT_SHORTCUT_CALL.createParagraph)
    bus.$off(events.EDIT_SHORTCUT_CALL.deleteParagraph)
    bus.$off(events.EDIT_SHORTCUT_CALL.insertParagraph)
    bus.$off(events.EDIT_SHORTCUT_CALL.formatDocumentByPangu)
  },
  watch: {
    currentNote: function (currentData) {
      this.contentEditor.clearHistory()
      try {
        this.contentEditor.focus()
        this.contentEditor.setMarkdown(currentData)
        this.firstTimeLoad = true
        this.updateContentsList(this.contentEditor.getTOC())
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e, e.message)
      }
    },
    theme: function (t) {
      attachThemeColor(t)
    },
    enablePreviewEditor: function (val) {
      document.querySelector('.ag-show-quick-insert-hint').setAttribute('contenteditable', val)
    },
    data: function ({ markdown }) {
      this.contentEditor.clearHistory()
      this.contentEditor.setMarkdown(markdown)
      this.updateContentsList(this.contentEditor.getTOC())
    }
  }
}
</script>

<style scoped>
.editor-component {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin-right: 5px;
}
</style>
