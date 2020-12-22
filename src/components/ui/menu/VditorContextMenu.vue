<template>
  <q-menu touch-position context-menu auto-close @before-show="inputHandler" ref="menu">
    <q-list dense style="min-width: 100px">
      <q-btn icon="add_box" @click="insertImageHandler" v-close-popup>{{ $t('insertImage') }}</q-btn>
    </q-list>
  </q-menu>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import bus from 'components/bus'
import events from 'src/constants/events'
const { mapActions: mapClientActions, mapState: mapClientState } = createNamespacedHelpers('client')
export default {
  name: 'VditorContextMenu',
  computed: {
    ...mapClientState(['enableVditor'])
  },
  data () {
    return {
      images: []
    }
  },
  methods: {
    insertImageHandler: async function () {
      try {
        const imagePaths = await this.importImagesFromLocal()
        if (imagePaths && imagePaths.length > 0) {
          this.$q.notify({
            timeout: 1000,
            type: 'info',
            spinner: true,
            message: this.$t('uploadingImages')
          })
          const result = await this.uploadImages(imagePaths)
          if (result.error && !result.success) {
            throw result.error
          } else {
            this.$q.notify({
              timeout: 2000,
              type: 'positive',
              message: this.$t('uploadSuccessfully')
            })
            bus.$emit(events.INSERT_IMAGES, result.result)
          }
        }
      } catch (err) {
        this.$q.notify({
          timeout: 2000,
          type: 'negative',
          spinner: true,
          message: this.$t(err?.message),
          caption: this.$t('failToUpload')
        })
      }
    },
    inputHandler: function () {
      if (!this.enableVditor) {
        this.$refs.menu.hide()
      }
    },
    ...mapClientActions(['importImagesFromLocal', 'uploadImages'])
  }
}
</script>

<style scoped></style>
