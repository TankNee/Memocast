<template>
  <q-dialog ref="dialog" class="base-dialog">
    <q-card
      class="q-dialog base-dialog"
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
            $t(label)
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="scroll" style="height: 70vh;width: 70vw">
        <q-tree
          ref="categoryTree"
          :nodes="categories"
          node-key="key"
          selected-color="primary"
          accordion
          :selected="noteInfo.category"
          @update:selected="selectHandler"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
  mapGetters: mapServerGetters,
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
export default {
  name: 'CategoryDialog',
  props: {
    label: {
      types: String,
      default: ''
    },
    handler: {
      types: Function,
      default: () => {}
    },
    noteInfo: {
      types: Object,
      default: {
        category: '',
        docGuid: '',
        kbGuid: ''
      }
    }
  },
  computed: {
    ...mapServerGetters(['categories']),
    ...mapServerState(['currentCategory'])
  },
  methods: {
    toggle: function () {
      this.$refs.dialog.toggle()
    },
    selectHandler: function (v) {
      this.noteInfo.category = v || this.noteInfo.category
      this.handler(this.noteInfo)
      this.$refs.dialog.hide()
    },
    ...mapServerActions(['updateCurrentCategory'])
  }
}
</script>

<style scoped></style>
