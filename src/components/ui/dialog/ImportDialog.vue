<template>
  <q-dialog ref="dialog" persistent>
    <q-card>
      <q-uploader :label="$t('RestrictedToMarkdown')" multiple accept=".md" flat :factory="factoryFn"/>
      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
      </q-card-actions>
      </q-card>
  </q-dialog>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { i18n } from 'boot/i18n'
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
            color: 'red-10',
            message: i18n.t('uploadNoteSuccessfully')
          })
        } catch (e) {
          Notify.create({
            color: 'red-10',
            message: i18n.t('uploadNoteError')
          })
        }
      })
    }
  }
}
</script>
