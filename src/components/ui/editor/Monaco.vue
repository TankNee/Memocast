<template>
  <div class='flex justify-center full-height full-width'>
    <div
      id='monaco'
      class='full-height full-width'
      v-show='!isCurrentNoteLoading && dataLoaded'
      v-close-popup
    ></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from 'src/utils/debugLogger'
import helper from 'src/utils/helper'
import bus from 'components/bus'
import events from 'src/constants/events'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')

const { mapState: mapClientState } = createNamespacedHelpers('client')
export default {
  name: 'Monaco',
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
      contentEditor: {}
    }
  },
  computed: {
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerState(['isCurrentNoteLoading', 'contentsList']),
    ...mapServerGetters(['currentNote', 'uploadImageUrl', 'currentNoteResources', 'currentNoteResourceUrl']),
    ...mapClientState(['darkMode'])
  },
  methods: {
    initMonaco: function () {
      /**
       * Define custom theme
       */
      monaco.editor.defineTheme('Memocast-Dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '#34383e' }],
        colors: {
          // 相关颜色属性配置
          // 'editor.foreground': '#000000',
          'editor.background': '#34383e',
          'editorCursor.foreground': '#FFCC00'
          // 'editor.lineHighlightBackground': '#0000FF20',
          // 'editorLineNumber.foreground': '#008800',
          // 'editor.selectionBackground': '#88000030',
          // 'editor.inactiveSelectionBackground': '#88000015'
        }
      })
      monaco.editor.defineTheme('Memocast-Light', {
        base: 'vs',
        inherit: true,
        rules: [{ background: '#ffffff' }],
        colors: {
          // 相关颜色属性配置
          // 'editor.foreground': '#000000',
          'editor.background': '#ffffff',
          'editorCursor.foreground': '#FFCC00'
          // 'editor.lineHighlightBackground': '#0000FF20',
          // 'editorLineNumber.foreground': '#008800',
          // 'editor.selectionBackground': '#88000030',
          // 'editor.inactiveSelectionBackground': '#88000015'
        }
      })
      this.contentEditor = monaco.editor.create(document.getElementById('monaco'), {
        value: this.data.markdown,
        language: 'markdown',
        automaticLayout: true,
        theme: this.darkMode ? 'Memocast-Dark' : 'Memocast-Light',
        fontSize: '17px',
        scrollBeyondLastLine: false,
        fontLigatures: true,
        fontFamily: 'JetBrains Mono, Fira Code, Monaco, PingFang SC, Hiragino Sans GB, 微软雅黑, Arial, sans-serif, Microsoft YaHei'
      })
      this.contentEditor.onKeyDown(e => {
        if (!this.active) {
          e.preventDefault()
          return
        }
        const curData = this.contentEditor.getValue()
        if (curData !== this.currentNote) {
          this.updateNoteState('changed')
        } else {
          this.updateNoteState('default')
        }
      })
      this.contentEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.US_COMMA, () => bus.$emit(events.VIEW_SHORTCUT_CALL.switchView, 'switchView'))
      this.contentEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.US_DOT, () => bus.$emit(events.VIEW_SHORTCUT_CALL.sourceMode, 'sourceMode'))
      this.contentEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, this.saveHandler)
    },
    saveHandler: function () {
      if (this.active && this.contentEditor) {
        this.updateNote(this.contentEditor.getValue())
      }
    },
    getValue: function () {
      return this.contentEditor?.getValue()
    },
    getCursorPosition: function () {
      return this.contentEditor?.getPosition()
    },
    setCursorPosition: function (position) {
      if (this.contentEditor) {
        this.contentEditor.setPosition(position)
        this.contentEditor.revealPositionInCenter(position, 0)
      }
    },
    ...mapServerActions(['updateNote', 'updateNoteState'])
  },
  mounted () {
    this.initMonaco()
    bus.$on(events.EDIT_SHORTCUT_CALL.save, this.saveHandler)
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setValue(currentData)
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e.message)
      }
    },
    darkMode: function (darkMode) {
      const currentTheme = darkMode ? 'Memocast-Dark' : 'Memocast-Light'
      monaco.editor.setTheme(currentTheme)
    },
    data: function ({ markdown, cursor }) {
      this.contentEditor.setValue(markdown)
      this.setCursorPosition(cursor)
      this.contentEditor.focus()
    }
  }
}
</script>

<style scoped>

</style>
