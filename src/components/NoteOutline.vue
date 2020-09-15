<template>
  <div ref="noteOutline"></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import VditorPreviewRender from 'vditor/dist/method.min'
// import Loading from './ui/Loading'
// import helper from '../utils/helper'
const { mapGetters } = createNamespacedHelpers('server')
export default {
  name: 'NoteOutline',
  computed: {
    ...mapGetters(['currentNote'])
  },
  watch: {
    currentNote: function () {
      const result = VditorPreviewRender.outlineRender('#vditor', this.$refs.noteOutline)
      return result
    }
  }
}
</script>

<style scoped>

</style>
