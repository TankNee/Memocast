<template>
  <q-menu touch-position context-menu auto-close @before-show='inputHandler' ref='menu'>
    <q-list style='min-width: 100px' class='text-bold'>
      <q-item @click='insertImageHandler' v-close-popup v-ripple clickable>
        <q-item-section avatar>
          <q-icon :color='color' name='cloud_upload' />
        </q-item-section>
        <q-item-section>{{ $t('insertImage') }}</q-item-section>
      </q-item>
      <q-item @click='pasteHandler' v-close-popup v-ripple clickable>
        <q-item-section avatar>
          <q-icon :color='color' name='file_copy' />
        </q-item-section>
        <q-item-section>{{ $t('paste') }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { clipboard } from 'electron'
import bus from 'components/bus'
import events from 'src/constants/events'

const {
  mapActions: mapClientActions,
  mapState: mapClientState
} = createNamespacedHelpers('client')
export default {
  name: 'VditorContextMenu',
  computed: {
    color: function () {
      return this.$q.dark.isActive ? 'warning' : 'primary'
    },
    ...mapClientState(['enablePreviewEditor'])
  },
  data () {
    return {
      images: []
    }
  },
  methods: {
    insertImageHandler: async function () {
      const imagePaths = await this.importImagesFromLocal()
      if (imagePaths && imagePaths.length > 0) {
        const dismiss = this.$q.notify({
          timeout: 0,
          type: 'info',
          spinner: true,
          message: this.$t('uploadingImages')
        })
        const result = await this.uploadImages(imagePaths)
        if (!result.error && result.success) {
          this.$q.notify({
            timeout: 2000,
            type: 'positive',
            message: this.$t('uploadSuccessfully'),
            icon: 'check'
          })
          bus.$emit(events.INSERT_IMAGES, result.result)
        }
        dismiss()
      }
    },
    pasteHandler: function () {
      bus.$emit(events.INSERT_TEXT, clipboard.readText('clipboard'))
    },
    inputHandler: function () {
      if (!this.enablePreviewEditor) {
        this.$refs.menu.hide()
      }
    },
    ...mapClientActions(['importImagesFromLocal', 'uploadImages'])
  }
}
</script>

<style scoped></style>
