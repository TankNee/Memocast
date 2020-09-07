<template>
  <div id="vditor" class="fit"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
  name: 'Vditor',
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
  }
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
