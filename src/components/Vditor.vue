<template>
  <div class="flex justify-center" >
    <div
      id="vditor"
      class="fit"
      style="max-width: 80%"
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
            style: this.$q.dark.isActive ? 'monokai' : 'github'
          }
        },
        upload: {
          max: 5 * 1024 * 1024,
          async handler (files) {
            await files.map(async file => await that.uploadImage(file))
          }
        },
        debugger: process.env.DEV,
        after: () => {
          if (this.contentEditor?.vditor?.element) {
            this.contentEditor.vditor.element.addEventListener('mousedown', that.linkClickHandler)
          }
        }
      })
    },
    registerKeyboardHotKey: function (e) {
      const key = window.event.keyCode
        ? window.event.keyCode
        : window.event.which
      if (helper.isCtrl(e)) {
        switch (key) {
          case 83:
            this.updateNote(this.contentEditor.getValue())
            break
          default:
            break
        }
      }
    },
    registerEventHandler: function () {
      bus.$on(events.INSERT_IMAGE, url => {
        this.contentEditor.insertValue(`\n![](${url})`, true)
      })
      bus.$on(events.SAVE_NOTE, () => {
        this.updateNote(this.contentEditor.getValue())
      })
    },
    linkClickHandler: function (e) {
      const LinkElement = helper.filterParentElement(e.target, this.contentEditor.vditor.element, (dom) => dom.getAttribute('data-type') === 'a', true)
      if (LinkElement) {
        const afterStyle = window.getComputedStyle(LinkElement, ':after')
        if (helper.isCtrl(e) || (e.target === LinkElement && e.offsetX >= parseInt(afterStyle.getPropertyValue('left'), 10) && e.offsetY >= parseInt(afterStyle.getPropertyValue('top'), 10))) {
          const urlElement = LinkElement.querySelector('.vditor-ir__marker--link')
          if (urlElement.innerText) {
            try {
              window.open(urlElement.innerText)
            } catch (err) {
              console.error(err)
            }
            e.preventDefault()
          }
        }
        return true
      }
      return false
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
