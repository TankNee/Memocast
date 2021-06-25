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
        rules: [{ background: '#2d2d2d' }],
        colors: {
          // 相关颜色属性配置
          // 'editor.foreground': '#000000',
          'editor.background': '#2d2d2d'
          // 'editorCursor.foreground': '#8B0000',
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
          'editor.background': '#ffffff'
          // 'editorCursor.foreground': '#8B0000',
          // 'editor.lineHighlightBackground': '#0000FF20',
          // 'editorLineNumber.foreground': '#008800',
          // 'editor.selectionBackground': '#88000030',
          // 'editor.inactiveSelectionBackground': '#88000015'
        }
      })
      this.contentEditor = monaco.editor.create(document.getElementById('monaco'), {
        value: this.data,
        language: 'markdown',
        automaticLayout: true,
        theme: this.darkMode ? 'Memocast-Dark' : 'Memocast-Light',
        fontSize: '15px'
      })
      this.contentEditor.onKeyDown(e => {
        const curData = this.contentEditor.getValue()
        if (curData !== this.currentNote) {
          this.updateNoteState('changed')
        } else {
          this.updateNoteState('default')
        }
      })
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
            this.updateNote(this.contentEditor.getValue())
            break
          default:
            break
        }
      }
    },
    getValue: function () {
      return this.contentEditor?.getValue()
    },
    ...mapServerActions(['updateNote', 'updateNoteState'])
  },
  mounted () {
    this.initMonaco()
    document.addEventListener('keydown', this.registerKeyboardHotKey)
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
      this.contentEditor.setTheme(currentTheme)
    },
    data: function (val) {
      this.contentEditor.setValue(val)
    }
  }
}
</script>

<style scoped>

</style>
