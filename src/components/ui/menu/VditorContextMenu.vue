<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <q-item clickable v-close-popup v-ripple @click="insertImageHandler">
        <q-item-section>{{ $t('insertImage') }}</q-item-section>
        <q-btn type="a" icon="add_box" round dense flat>
          <q-uploader-add-trigger @click="fileSelectHandler" />
          <q-tooltip>Pick Files</q-tooltip>
        </q-btn>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import debugLogger from '../../../utils/debugLogger'
export default {
  name: 'VditorContextMenu',
  data () {
    return {
      images: []
    }
  },
  methods: {
    insertImageHandler: function () {
      // this.$refs.uploader.pickFiles()
    },
    fileSelectHandler: function () {
      debugLogger.Info('upload added', this.images)
    }
  }
}
</script>

<style scoped></style>
