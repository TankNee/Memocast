<template>
  <q-dialog ref="dialog">
    <q-card style="max-height: 90vh;min-height: 70vh;min-width: 70vw">
      <q-toolbar>
        <q-avatar>
          <q-icon
            name="account_tree"
            class="text-primary"
            style="font-size: 1.8em"
          />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-weight-bold">{{ $t('category') }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="scroll" style="height: 70vh;width: 70vw">
        <q-tree
          :nodes="categories"
          node-key="key"
          selected-color="primary"
          accordion
          :selected.sync="selected"
        />
      </q-card-section>
      <Loading :visible="isLoading" />
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from './Loading'
const { mapGetters: mapServerGetters } = createNamespacedHelpers('server')
export default {
  name: 'CategoryDialog',
  components: { Loading },
  computed: {
    ...mapServerGetters(['categories'])
  },
  data () {
    return {
      isLoading: false,
      selected: null
    }
  },
  methods: {
    toggle: function () {
      this.$refs.dialog.toggle()
    }
  }
}
</script>

<style scoped></style>
