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
          ref="categoryTree"
          :nodes="categories"
          node-key="key"
          selected-color="primary"
          accordion
          :selected="currentCategory"
          @update:selected="v => updateCurrentCategory(v)"
          v-close-popup
        />
      </q-card-section>
      <Loading :visible="isLoading" />
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from './Loading'
const { mapGetters: mapServerGetters, mapActions: mapServerActions, mapState: mapServerState } = createNamespacedHelpers('server')
export default {
  name: 'CategoryDialog',
  components: { Loading },
  computed: {
    ...mapServerGetters(['categories']),
    ...mapServerState(['currentCategory'])
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    toggle: function () {
      this.$refs.dialog.toggle()
    },
    ...mapServerActions(['updateCurrentCategory'])
  }
}
</script>

<style scoped></style>
