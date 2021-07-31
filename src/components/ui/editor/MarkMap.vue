<template>
  <div style="height: 70vh;">
    <svg
      id="mind"
      class='full-height full-width'
      v-show='!isCurrentNoteLoading && dataLoaded'
      ></svg>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import { Transformer } from 'markmap-lib'
import * as markmap from 'markmap-view'

const transformer = new Transformer()
const { Markmap, loadJS } = markmap
const {
  mapGetters: mapServerGetters,
  mapState: mapServerState
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
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    ...mapServerState(['isCurrentNoteLoading']),
    ...mapServerGetters(['currentNote'])
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
    }
  },
  mounted () {
    setTimeout(() => {
      this.generate()
    }, 300)
  }
}
</script>

<style scoped>

</style>
