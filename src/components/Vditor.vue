<script src='../constants/codethems.js'></script>
<template>
  <div class='flex justify-center'>
    <div
      id='vditor'
      v-show='!isCurrentNoteLoading && dataLoaded'
      v-close-popup
    ></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'src/css/vditor.css'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
import helper from '../utils/helper'
// import monaco from 'monaco-editor'
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
  props: {
    data: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerGetters(['currentNote', 'uploadImageUrl', 'currentNoteResources', 'currentNoteResourceUrl']),
    ...mapServerState(['isCurrentNoteLoading', 'contentsList']),
    ...mapClientState(['darkMode', 'lightCodeTheme', 'darkCodeTheme', 'enableVditor'])
  },
  data () {
    return {
      contentEditor: {}
    }
  },
  mounted () {
    this.contentEditor = this.initVditor()
    this.enableVditor ? this.contentEditor.enable() : this.contentEditor.disabled()
    document.addEventListener('keydown', this.registerKeyboardHotKey)
    this.registerEventHandler()
  },
  methods: {
    initVditor: function () {
      // const cdn = /^https?:\/\//i.test(window.location.origin) ? `${window.location.origin}/~assets/vditor-dist` : `${(window.location.origin + window.location.pathname).replace('/index.html', '')}/~assets/vditor-dist`
      // console.log(cdn)
      const that = this
      return new Vditor('vditor', {
        width: '75%',
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
            style: this.$q.dark.isActive ? this.darkCodeTheme : this.lightCodeTheme
          },
          transform: (html) => {
            console.log('transform', html)
            // const imgReg = /(<img\s+([^>]*\s+)?(data-src|src)=")index_files(\/[^"]*")/ig
            // const newHtml = imgReg.exec(html)
            // console.log(newHtml)
            // return newHtml
          }
        },
        typewriterMode: false,
        upload: {
          max: 5 * 1024 * 1024,
          async handler (files) {
            that.$q.notify({
              type: 'negative',
              message: 'Drag images to upload has been marked as unavailable'
            })
            // await files.map(async file => await that.uploadImage(file))
          }
        },
        debugger: process.env.DEV,
        after: () => {
          if (that.contentEditor?.vditor?.element) {
            that.contentEditor.vditor.element.addEventListener(
              'mousedown',
              that.linkClickHandler
            )
          }
        },
        input: (value) => {
          if (value !== that.currentNote) {
            that.updateNoteState('changed')
          } else {
            that.updateNoteState('default')
          }
          that.updateContentsList(that.contentEditor.vditor.ir.element)
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
    registerEventHandler: function () {
      bus.$on(events.INSERT_IMAGE, url => {
        this.contentEditor.insertValue(`\n![](${url})`, true)
      })
      bus.$on(events.INSERT_IMAGES, urls => {
        urls = urls || []
        urls.forEach(url => {
          this.contentEditor.insertValue(`\n![](${url})`, true)
        })
      })
      bus.$on(events.SAVE_NOTE, () => {
        this.updateNote(this.contentEditor.getValue())
      })
      bus.$on(events.INSERT_TEXT, (text) => {
        console.log(text, this.contentEditor.getHTML())
        this.contentEditor.insertValue(text)
      })
    },
    linkClickHandler: function (e) {
      const LinkElement = helper.filterParentElement(
        e.target,
        this.contentEditor.vditor.element,
        dom => dom.getAttribute('data-type') === 'a',
        true
      )
      if (LinkElement) {
        const afterStyle = window.getComputedStyle(LinkElement, ':after')
        if (
          helper.isCtrl(e) ||
          (e.target === LinkElement &&
            e.offsetX >= parseInt(afterStyle.getPropertyValue('left'), 10) &&
            e.offsetY >= parseInt(afterStyle.getPropertyValue('top'), 10))
        ) {
          const urlElement = LinkElement.querySelector(
            '.vditor-ir__marker--link'
          )
          if (urlElement.innerText) {
            try {
              if (urlElement.innerText.indexOf('#') === 0) {
                const item = helper.findNodeByNodeLabel(
                  this.contentsList,
                  urlElement.innerText.replace('#', '')
                )
                bus.$emit(events.SCROLL_TO_HEADER, item)
              } else {
                if (!urlElement.innerText.startsWith('http')) {
                  window.open(`https://${urlElement.innerText}`)
                } else {
                  window.open(urlElement.innerText)
                }
              }
            } catch (err) {
              console.error(err)
            }
          }
        }
        return true
      }
      return false
    },
    getValue: function () {
      return this.contentEditor?.getValue()
    },
    ...mapServerActions(['updateNote', 'uploadImage', 'updateContentsList', 'updateNoteState'])
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setValue(currentData, true)
        this.contentEditor.focus()
        this.updateContentsList(this.contentEditor.vditor.ir.element)
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e.message)
      }
      // this.contentEditor.enable()
    },
    darkMode: function (darkMode) {
      this.contentEditor.setTheme(
        darkMode ? 'dark' : 'classic',
        darkMode ? 'dark' : 'light',
        darkMode ? this.darkCodeTheme : this.lightCodeTheme
      )
    },
    darkCodeTheme: function (currentData) {
      this.contentEditor.setTheme(
        this.darkMode ? 'dark' : 'classic',
        this.darkMode ? 'dark' : 'light',
        this.darkMode ? currentData : this.lightCodeTheme
      )
    },
    lightCodeTheme: function (currentData) {
      this.contentEditor.setTheme(
        this.darkMode ? 'dark' : 'classic',
        this.darkMode ? 'dark' : 'light',
        this.darkMode ? this.darkCodeTheme : currentData
      )
    },
    enableVditor: function (currentData) {
      if (currentData) {
        this.contentEditor.enable()
      } else {
        this.contentEditor.disabled()
      }
    },
    data: function (val) {
      this.contentEditor.setValue(val)
      this.updateContentsList(this.contentEditor.vditor.ir.element)
    }
  }
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
