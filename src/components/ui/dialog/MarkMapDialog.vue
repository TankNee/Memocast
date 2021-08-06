<template>
  <q-dialog ref="dialog" class="base-dialog" persistent>
    <q-card
      style="max-height: 90vh;min-height: 70vh;min-width: 70vw"
    >
      <q-toolbar>
        <q-icon
          name="account_tree"
          class="text-primary"
          style="font-size: 1.8em"
        />
        <q-toolbar-title
        ><span class="text-weight-bold non-selectable">{{
            $t('mindmap')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <MarkMap ref="markmap" :data="data" />
    </q-card>
  </q-dialog>
</template>

<script>
import MarkMap from '../editor/MarkMap'
export default {
  name: 'MarkMapDialog',
  components: { MarkMap },
  data () {
    return {
      data: ''
    }
  },
  methods: {
    toggle: function (data) {
      if (data) {
        this.data = data
      }
      return this.$refs.dialog.toggle()
    }
  }
}
</script>

<style scoped></style>
