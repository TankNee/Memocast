<template>
  <div>
    <div id="vditor" class="fit" v-show="!isCurrentNoteLoading && currentNote(false)"></div>
    <Loading :visible="isCurrentNoteLoading" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Loading from './ui/Loading'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
const { mapGetters: mapServerGetters, mapState: mapServerState } = createNamespacedHelpers('server')
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
    ...mapServerGetters(['currentNote']),
    ...mapServerState(['isCurrentNoteLoading']),
    ...mapClientState(['darkMode'])
  },
  data () {
    return {
      contentEditor: ''
    }
  },
  mounted () {
    this.contentEditor = new Vditor('vditor', {
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
        }
      },
      toolbar: []
    })
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setValue(currentData(false))
      } catch (e) {
        if (e.message.indexOf('Md2V') !== -1) return
        debugLogger.Error(e.message)
      }
    },
    darkMode: function (darkMode) {
      this.contentEditor.setTheme(
        darkMode ? 'dark' : 'classic',
        darkMode ? 'dark' : 'light'
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
