<template>
  <div class='flex justify-center full-height full-width'>
    <div
      id='muya'
      class='full-height full-width'
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
import debugLogger from 'src/utils/debugLogger'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')

const { mapState: mapClientState } = createNamespacedHelpers('client')
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
    ...mapServerState(['isCurrentNoteLoading', 'contentsList', 'enablePreviewEditor']),
    ...mapServerGetters(['currentNote', 'uploadImageUrl', 'currentNoteResources', 'currentNoteResourceUrl']),
    ...mapClientState(['darkMode'])
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
        console.log(e)
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
    ...mapServerActions(['updateNote', 'updateNoteState', 'updateContentsList'])
  },
  created () {
    this.$nextTick(() => {
      Muya.use(TablePicker)
      Muya.use(QuickInsert)
      Muya.use(CodePicker)
      Muya.use(EmojiPicker)
      Muya.use(ImagePathPicker)
      Muya.use(ImageSelector)
      Muya.use(FormatPicker)
      Muya.use(FrontMenu)

      this.contentEditor = new Muya(this.$refs.muya, {
        focusMode: true,
        imagePathPicker: () => {
          const paths = this.$q.electron.remote.dialog.showOpenDialogSync({
            title: 'Import Images' // TODO: translation
          })
          // TODO: 增加一个上传选项
          console.log(paths)
          return paths ? paths[0] : null
        }
      })

      document.addEventListener('keydown', (e) => {
        if (!e.srcElement.className.includes('ag-')) return
        const curData = this.contentEditor.getMarkdown()
        if (curData !== this.currentNote) {
          this.updateNoteState('changed')
        } else {
          this.updateNoteState('default')
        }
        const cursor = this.contentEditor.getCursor()
        if (cursor.anchor.line >= this.contentEditor.getWordCount(curData).line - 2) {
          bus.$emit(events.SCROLL_DOWN)
        }
      })
      document.addEventListener('keydown', this.registerKeyboardHotKey)
    })
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setMarkdown(currentData)
        this.updateContentsList(document.getElementById('ag-editor-id'))
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e.message)
      }
    },
    enablePreviewEditor: function (val) {
      //  12312
    },
    data: function (val) {
      this.contentEditor.setMarkdown(val)
    }
  }
}
</script>

<style scoped>

</style>
