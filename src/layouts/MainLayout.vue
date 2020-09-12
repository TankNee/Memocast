<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="text-white header bg-transparent shadow-3">
      <Header/>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
// import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      miniState: false
    }
  },
  components: { Header },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>
<style scoped>
  .header{
    height: 6.5vh;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
</style>
