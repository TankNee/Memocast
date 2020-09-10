<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import ErrorHandler from './ErrorHandler'
import ScheduleHandler from './ScheduleHandler'
const { RegisterErrorHandler } = ErrorHandler
const { RegisterScheduleJobs } = ScheduleHandler
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapClientActions } = createNamespacedHelpers('client')
const { mapActions: mapServerActions } = createNamespacedHelpers('server')
export default {
  name: 'App',
  mounted () {
    RegisterErrorHandler()
    RegisterScheduleJobs()
    this.initClientStore()
    this.initServerStore()
  },
  methods: {
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore'])
  }
}
</script>
