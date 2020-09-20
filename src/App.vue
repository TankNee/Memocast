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
  mounted () {
    RegisterErrorHandler(this)
    RegisterScheduleJobs(this)
    this.initClientStore()
    this.initServerStore()
  },
  methods: {
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore']),
    ...mapServerState(['isLogin'])
  }
}
</script>
