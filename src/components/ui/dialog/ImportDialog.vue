<template>
  <q-dialog ref="dialog" persistent>
    <q-card>
      <q-file v-model="file" label="Restricted to Markdown" accept=".md"/>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Ok" color="primary" v-close-popup @click="handleImport"/>
      </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('server')
export default {
  name: 'ImportDialog',
  data () {
    return {
      file: null
    }
  },
  methods: {
    ...mapActions(['importNote']),
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    handleImport: function () {
      this.$q.loading.show({
        message: '上传中'
      })
      try {
        this.importNote(this.file)
        this.$q.notify('导入成功')
        this.$q.loading.hide()
      } catch (e) {
        this.$q.notify('错误')
      }
    }
  }
}
</script>
