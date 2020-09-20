<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <q-item clickable v-close-popup v-ripple @click="insertImageHandler">
        <q-item-section>{{ $t('insertImage') }}</q-item-section>
      </q-item>
      <q-item class="hidden">
        <q-uploader
          ref="uploader"
          @added="uploadAddedHandler"
          @uploaded="uploadHandler"
        />
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import debugLogger from '../../utils/debugLogger'
const { mapGetters } = createNamespacedHelpers('server')
export default {
  name: 'VditorContextMenu',
  computed: {
    ...mapGetters(['wizNoteToken', 'uploadImageUrl'])
  },
  methods: {
    insertImageHandler: function () {
      this.$refs.uploader.pickFiles()
    },
    uploadAddedHandler: function (files) {
      debugLogger.Info('upload added', files)
    },
    uploadHandler: function (info) {
      debugLogger.Log(info)
    }
  }
}
</script>

<style scoped></style>
