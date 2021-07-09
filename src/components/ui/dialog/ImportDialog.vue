<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-uploader ref='uploader' :label="$t('restrictedToMarkdown')" multiple accept=".md" flat :factory="factoryFn"/>
      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
        <q-btn flat :label="$t('upload')" color="primary" @click='$refs.uploader.upload()' />
      </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { Notify } from 'quasar'
const { mapActions } = createNamespacedHelpers('server')
export default {
  name: 'ImportDialog',
  methods: {
    ...mapActions(['importNote']),
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    factoryFn (files) {
      files.forEach(file => {
        try {
          this.importNote(file)
          Notify.create({
            color: 'primary',
            icon: 'check',
            message: this.$t('uploadNoteSuccessfully')
          })
          this.$refs.uploader.reset()
        } catch (e) {
          Notify.create({
            color: 'red-10',
            icon: 'error',
            message: this.$t('uploadNoteError')
          })
        }
      })
    }
  }
}
</script>
