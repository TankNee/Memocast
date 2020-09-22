<template>
  <div>
    <div
      id="vditor"
      class="fit"
      v-show="!isCurrentNoteLoading && dataLoaded"
    ></div>
    <Loading :visible="isCurrentNoteLoading" />
<!--    <VditorContextMenu />-->
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'src/css/vditor.css'
import Loading from './ui/Loading'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
import helper from '../utils/helper'
// import VditorContextMenu from './ui/VditorContextMenu'
import bus from './bus'
import events from '../constants/events'
const {
  mapGetters: mapServerGetters,
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')
const { mapState: mapClientState } = createNamespacedHelpers('client')
export default {
  name: 'Vditor',
  components: { Loading },
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  computed: {
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerGetters(['currentNote', 'uploadImageUrl']),
    ...mapServerState(['isCurrentNoteLoading']),
    ...mapClientState([
      'darkMode',
      'apiServerUrl',
      'postParam',
      'jsonPath',
      'customHeader',
      'customBody'
    ])
  },
  data () {
    return {
      contentEditor: ''
    }
  },
  mounted () {
    this.contentEditor = this.initVditor()
    document.onkeydown = this.registerKeyboardHotKey.bind(this)
    this.registerEventHandler()
  },
  methods: {
    initVditor: function () {
      const that = this
      return new Vditor('vditor', {
        width: '100%',
        cache: {
          enable: false
        },
        icon: 'material',
        mode: 'ir',
        theme: this.$q.dark.isActive ? 'dark' : 'classic',
        preview: {
          theme: {
            current: this.$q.dark.isActive ? 'dark' : 'light'
          },
          hljs: {
            style: this.$q.dark.isActive ? 'dracula' : 'github'
          }
        },
        upload: {
          max: 5 * 1024 * 1024,
          // accept: 'image/*',
          // url: this.apiServerUrl,
          // headers: JSON.parse(this.customHeader),
          // format: function (files, text) {
          //   const res = JSON.parse(text)
          //   let url = res
          //   if (that.jsonPath) {
          //     for (const path of that.jsonPath.split('.')) {
          //       url = url[path]
          //     }
          //   }
          //   return url
          // },
          // fieldName: this.postParam
          async handler (files) {
            await files.map(async file => await that.uploadImage(file))
          }
        },
        toolbar: [],
        debugger: true
      })
    },
    registerKeyboardHotKey: function (e) {
      // register ctrl+s key
      const key = window.event.keyCode
        ? window.event.keyCode
        : window.event.which
      const { ctrlKey } = e
      if (ctrlKey) {
        switch (key) {
          case 87:
            this.contentEditor.updateValue(
              '\n```\n' + `${this.contentEditor.getSelection()}` + '\n```\n'
            )
            break
          case 83:
            this.updateNote(this.contentEditor.getValue())
            break
          case 66:
            this.contentEditor.updateValue(
              `**${this.contentEditor.getSelection()}**`
            )
            break
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
            // TODO: 实现outline的快速添加
            break
          default:
            break
        }
        console.log(key)
      }
    },
    registerEventHandler: function () {
      bus.$on(events.INSERT_IMAGE, url => {
        this.contentEditor.insertValue(`\n![](${url})`, true)
      })
    },
    ...mapServerActions(['updateNote', 'uploadImage'])
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setValue(currentData, true)
        this.contentEditor.focus()
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e.message)
      }
      this.contentEditor.enable()
    },
    darkMode: function (darkMode) {
      this.contentEditor.setTheme(
        darkMode ? 'dark' : 'classic',
        darkMode ? 'dark' : 'light',
        darkMode ? 'dracula' : 'github'
      )
    }
  }
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
