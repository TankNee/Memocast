<template>
  <div id='q-app'>
    <router-view />
  </div>
</template>
<script>
import ErrorHandler from './ErrorHandler'
import ScheduleHandler from './ScheduleHandler'
import ApiHandler from 'src/ApiHandler'
import { createNamespacedHelpers } from 'vuex'
import bus from './components/bus'
import events from './constants/events'

const { RegisterErrorHandler } = ErrorHandler
const { RegisterScheduleJobs } = ScheduleHandler
const { RegisterApiHandler } = ApiHandler

const { mapActions: mapClientActions } = createNamespacedHelpers('client')
const {
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
export default {
  name: 'App',
  async mounted () {
    RegisterErrorHandler()
    RegisterScheduleJobs(this)
    RegisterApiHandler()
    // Promise.all([this.initClientStore(), this.initServerStore()]).finally(() => {
    //   const loadingPage = document.querySelector('#loading-page')
    //   if (loadingPage) {
    //     loadingPage.style.display = 'none'
    //   }
    // })
    this.initClientStore().then()
    this.initServerStore().then()
    bus.$on(events.RELOGIN, this.reLogin)
  },
  methods: {
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore', 'reLogin']),
    ...mapServerState(['isLogin'])
  }
}
</script>
