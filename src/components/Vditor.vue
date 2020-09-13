<template>
  <div>
    <div id="vditor" class="fit" v-show="!isCurrentNoteLoading"></div>
    <Loading :visible="isCurrentNoteLoading" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'src/css/vditor.css'
import Loading from './ui/Loading'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
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
    const that = this
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
    document.onkeydown = function (e) {
      // register ctrl+s key
      const key = window.event.keyCode ? window.event.keyCode : window.event.which
      const { ctrlKey } = e
      if (ctrlKey && key === 83) {
        that.updateNote(that.contentEditor.getValue())
      }
    }
  },
  methods: {
    ...mapServerActions(['updateNote'])
  },
  watch: {
    currentNote: function (currentData) {
      try {
        this.contentEditor.setValue(currentData)
        this.contentEditor.focus()
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
