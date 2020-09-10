<template>
  <div id="vditor" class="fit">
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Loading from './ui/Loading'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
const { mapGetters } = createNamespacedHelpers('server')
const { mapState } = createNamespacedHelpers('client')
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
    ...mapGetters(['currentNote']),
    ...mapState(['darkMode'])
  },
  data () {
    return {
      contentEditor: '',
      isLoading: false
    }
  },
  mounted () {
    this.contentEditor = new Vditor('vditor', {
      width: '100%',
      cache: {
        enable: false
      },
      icon: 'material',
      mode: 'wysiwyg',
      theme: this.$q.dark.isActive ? 'dark' : 'classic',
      preview: {
        theme: {
          current: this.$q.dark.isActive ? 'dark' : 'light'
        }
      }
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
      this.contentEditor.setTheme(darkMode ? 'dark' : 'classic', darkMode ? 'dark' : 'light')
    }
  }
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
