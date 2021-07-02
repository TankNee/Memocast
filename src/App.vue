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
    this.initClientStore()
    this.initServerStore().then()
  },
  methods: {
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore', 'reLogin']),
    ...mapServerState(['isLogin'])
  }
}
</script>
