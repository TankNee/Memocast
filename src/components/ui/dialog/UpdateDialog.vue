<template>
  <q-dialog ref='dialog' class='base-dialog' persistent>
    <q-card
      class='q-dialog base-dialog'
      style='max-height: 60vh;min-height: 40vh;min-width: 60vw'
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
          <q-linear-progress dark stripe rounded size='20px' :value='progress' color='red' class='q-mt-sm' />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('hide')" color="primary" v-close-popup />
        <q-btn flat :disable='!downloaded' :label="$t('install')" color="primary" @click='installHandler' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import bus from 'components/bus'
import events from 'src/constants/events'
import { quitAndUpdate } from 'src/ApiInvoker'

export default {
  name: 'UpdateDialog',
  data () {
    return {
      progress: 0,
      downloaded: false
    }
  },
  methods: {
    downloadingHandler: function (progress) {
      const { percent } = progress
      this.progress = percent
    },
    downloadedHandler: function () {
      this.downloaded = true
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
    bus.$on(events.UPDATE_EVENTS.UPDATE_DOWNLOADING, this.downloadingHandler)
    bus.$on(events.UPDATE_EVENTS.UPDATE_DOWNLOADING, this.downloadedHandler)
  }
}
</script>

<style scoped>

</style>
