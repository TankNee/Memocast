<template>
  <div id="mind-container" style="height: 70vh;" @click="containerClickHandler" @contextmenu="contextMenuHandler">
    <svg
      id="mind"
      style="height: 100%; width: 100%;"
      ></svg>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Transformer } from 'markmap-lib'
import * as markmap from 'markmap-view'
import { showContextMenu as showMarkMapContextMenu } from 'src/contextMenu/markMap'
import bus from '../../bus'
import events from '../../../constants/events'

const transformer = new Transformer()
const { Markmap, loadJS } = markmap
const {
  mapState: mapServerState,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')

export default {
  name: 'MarkMap',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markMap: null
    }
  },
  computed: {
    ...mapServerState(['isCurrentNoteLoading', 'currentNote'])
  },
  methods: {
    generate: function () {
      const { root, features } = transformer.transform(this.data)
      const { scripts } = transformer.getUsedAssets(features)
      // if (styles) loadCSS(styles)
      if (scripts) loadJS(scripts, { getMarkmap: () => markmap })
      if (this.markMap) this.markMap.destroy()
      const svgEl = document.querySelector('#mind')
      this.markMap = Markmap.create(svgEl, null, root)
    },
    contextMenuHandler: function (e) {
      showMarkMapContextMenu(e)
    },
    containerClickHandler: function (e) {
      const ele = e.srcElement || e.target
      if (ele.nodeName.toLowerCase() === 'a') {
        e.preventDefault()
        window.open(ele.href)
      }
    },
    saveAsPNGHandler: function () {
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = document.getElementById('mind-container').innerHTML
      tempContainer.id = 'temp-container'
      document.body.append(tempContainer)
      this.exportPng({ current: true, elementId: 'temp-container' }).finally(() => {
        tempContainer.remove()
      })
    },
    saveAsSVGHandler: function () {
      this.exportFile({ content: document.getElementById('mind-container').innerHTML, fileName: this.currentNote.info.title, fileType: 'svg' })
    },
    saveAsHTMLHandler: function () {
      this.exportFile({ content: document.getElementById('mind-container').innerHTML, fileName: this.currentNote.info.title, fileType: 'html' })
    },
    ...mapServerActions(['exportPng', 'exportFile'])
  },
  mounted () {
    setTimeout(() => {
      this.generate()
    }, 150)
    bus.$on(events.MARK_MAP_CONTEXT_MENU.saveAsPNG, this.saveAsPNGHandler)
    bus.$on(events.MARK_MAP_CONTEXT_MENU.saveAsSVG, this.saveAsSVGHandler)
    bus.$on(events.MARK_MAP_CONTEXT_MENU.saveAsHTML, this.saveAsHTMLHandler)
  },
  beforeDestroy () {
    bus.$off(events.MARK_MAP_CONTEXT_MENU.saveAsPNG, this.saveAsPNGHandler)
    bus.$off(events.MARK_MAP_CONTEXT_MENU.saveAsSVG, this.saveAsSVGHandler)
    bus.$off(events.MARK_MAP_CONTEXT_MENU.saveAsHTML, this.saveAsHTMLHandler)
  }
}
</script>

<style scoped>

</style>
