<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import ErrorHandler from './ErrorHandler'
import ScheduleHandler from './ScheduleHandler'
import { createNamespacedHelpers } from 'vuex'

const { RegisterErrorHandler } = ErrorHandler
const { RegisterScheduleJobs } = ScheduleHandler

const { mapActions: mapClientActions } = createNamespacedHelpers('client')
const { mapActions: mapServerActions, mapState: mapServerState } = createNamespacedHelpers('server')
export default {
  name: 'App',
  async mounted () {
    RegisterErrorHandler()
    RegisterScheduleJobs(this)
    await this.initClientStore()
    await this.initServerStore()
  },
  methods: {
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore', 'reLogin']),
    ...mapServerState(['isLogin'])
  }
}
</script>
