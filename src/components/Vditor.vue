<template>
  <div id="vditor" class="fit"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import bus from './bus'
import events from '../constants/events'
export default {
  name: 'Vditor',
  props: {
    data: {
      type: String,
      default: ''
    }
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
      mode: 'wysiwyg',
      theme: this.$q.dark.isActive ? 'dark' : 'classic',
      preview: {
        theme: {
          current: this.$q.dark.isActive ? 'dark' : 'light'
        }
      }
    })
    bus.$on(events.UPDATE_CURRENT_NOTE, (payload) => {
      this.contentEditor.setValue(payload)
    })
  }
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
