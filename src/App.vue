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

const { mapActions: mapClientActions, mapState: mapClientState } = createNamespacedHelpers('client')
const {
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
export default {
  name: 'App',
  data () {
    return {
      autoSaveInterval: null
    }
  },
  computed: {
    ...mapClientState(['autoSaveGap'])
  },
  async mounted () {
    RegisterErrorHandler()
    RegisterScheduleJobs(this)
    RegisterApiHandler()
    this.initClientStore().then()
    this.initServerStore().then()
    bus.$on(events.RELOGIN, this.reLogin)
    this.setupAutoSaveInterval(this.autoSaveGap)
  },
  methods: {
    setupAutoSaveInterval: function (gap) {
      clearInterval(this.autoSaveInterval)
      if (gap === 0 && this.autoSaveInterval !== null) {
        this.autoSaveInterval = null
      } else {
        this.autoSaveInterval = setInterval(() => {
          bus.$emit(events.NOTE_SHORTCUT_CALL.save)
        }, gap * 1000)
      }
    },
    ...mapClientActions(['initClientStore']),
    ...mapServerActions(['initServerStore', 'reLogin']),
    ...mapServerState(['isLogin'])
  },
  watch: {
    autoSaveGap: function (val) {
      this.setupAutoSaveInterval(val)
    }
  }
}
</script>
