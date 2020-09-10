<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="text-white header bg-black">
      <q-bar class="q-electron-drag  header">
        <div>Neeto Vue</div>
        <q-space/>
        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="maximize"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </q-bar>
    </q-header>
    <Sidebar/>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from '../components/Sidebar'

export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      miniState: false
    }
  },
  components: { Sidebar },
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
    height: 5vh;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
</style>
