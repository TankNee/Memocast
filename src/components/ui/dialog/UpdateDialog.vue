<template>
  <q-dialog ref='dialog' class='base-dialog' persistent>
    <q-card
      class='q-dialog base-dialog'
    >
      <q-toolbar>
        <q-icon name='update' class='text-primary' style='font-size: 1.5em' />
        <q-toolbar-title
        ><span class='text-weight-bold non-selectable'>{{
            $t('update')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon='close' v-close-popup />
      </q-toolbar>
      <q-card-section class='hide-scrollbar'>
        <div class='q-pa-md'>
          <p style="font-size: 0.9rem;">
            <span>{{ `${$t('downloadSize')} ${transferred}/${total}` }}</span>
          </p>
          <p style="font-size: 0.9rem;">
            <span>{{ `${$t('downloadSpeed')} ${speed}` }}</span>
          </p>
        </div>
        <div class='q-pa-md'>
          <q-linear-progress rounded size='35px' :value='progress' color='primary' class='q-mt-sm'>
            <div class='absolute-full flex flex-center'>
              <q-badge color='white' text-color='primary' :label='progressLabel' />
            </div>
          </q-linear-progress>
        </div>
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn flat :label="$t('hide')" color='primary' v-close-popup />
        <q-btn flat :disable='!downloaded' :label="$t('install')" color='primary' @click='installHandler' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import bus from 'components/bus'
import events from 'src/constants/events'
import prettyBytes from 'pretty-bytes'
import { quitAndUpdate } from 'src/ApiInvoker'

export default {
  name: 'UpdateDialog',
  data () {
    return {
      progress: 0,
      downloaded: false,
      speed: '',
      transferred: '',
      total: ''
    }
  },
  computed: {
    progressLabel () {
      return `${(this.progress * 100).toFixed(2)}%`
    }
  },
  methods: {
    downloadingHandler: function (progress) {
      const { percent = 0, bytesPerSecond, transferred, total } = progress
      this.progress = (percent / 100).toFixed(2)
      this.speed = prettyBytes(bytesPerSecond)
      this.transferred = prettyBytes(transferred)
      this.total = prettyBytes(total)
    },
    downloadedHandler: function () {
      this.progress = 1
      this.downloaded = true
      this.$q.notify({
        color: 'positive',
        icon: 'check',
        message: this.$t('downloadSuccessfully'),
        actions: [{
          icon: 'play_for_work',
          color: 'white',
          handler: () => {
            this.installHandler()
          }
        }]
      })
    },
    installHandler: function () {
      quitAndUpdate()
    },
    toggle: function () {
      if (this.$refs.dialog) {
        this.$refs.dialog.toggle()
      }
    }
  },
  mounted () {
    bus.$on(events.UPDATE_EVENTS.updateDownloading, this.downloadingHandler)
    bus.$on(events.UPDATE_EVENTS.updateDownloaded, this.downloadedHandler)
  }
}
</script>

<style scoped>

</style>
