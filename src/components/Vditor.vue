<template>
  <div>
    <div id="vditor" class="fit" v-show="!isCurrentNoteLoading && dataLoaded"></div>
    <Loading :visible="isCurrentNoteLoading" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'src/css/vditor.css'
import Loading from './ui/Loading'
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../utils/debugLogger'
import helper from '../utils/helper'
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
      const key = window.event.keyCode
        ? window.event.keyCode
        : window.event.which
      const { ctrlKey } = e
      if (ctrlKey) {
        switch (key) {
          case 87:
            that.contentEditor.updateValue(
              '\n```\n' + `${that.contentEditor.getSelection()}` + '\n```\n'
            )
            break
          case 83:
            that.updateNote(that.contentEditor.getValue())
            break
          case 66:
            that.contentEditor.updateValue(
              `**${that.contentEditor.getSelection()}**`
            )
            break
          default:
            break
        }
        console.log(key)
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
        this.contentEditor.clearStack()
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
        darkMode ? 'dracula' : 'friendly'
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
