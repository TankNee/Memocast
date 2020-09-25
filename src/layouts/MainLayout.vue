<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="text-white header bg-transparent">
      <Header />
    </q-header>
    <q-page-container>
      <router-view />
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
  components: { Header }
}
</script>
<style scoped>
.header {
  height: 6.5vh;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  background: none !important;
}
</style>
