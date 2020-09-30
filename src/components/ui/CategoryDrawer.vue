<template>
  <q-drawer
    ref="drawer"
    :value=false
    :mini-width="200"
    :breakpoint="700"
    content-class="bg-primary text-white"
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class="`exclude-header note-list${$q.dark.isActive ? '-dark' : ''}`"
    >
      <q-tree
        :nodes="categories"
        node-key="key"
        selected-color="primary"
        accordion
        :selected="currentCategory"
        @update:selected="
          v => {
            $refs.drawer.hide()
            updateCurrentCategory(v)
          }
        "
        v-close-popup
      />
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
  mapGetters: mapServerGetters,
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')

export default {
  name: 'CategoryDrawer',
  computed: {
    thumbStyle () {
      return {
        backgroundColor: '#E8ECF1',
        width: '7px',
        opacity: 0.75
      }
    },

    barStyle () {
      return {
        width: '7px'
      }
    },

    ...mapServerGetters(['categories']),
    ...mapServerState(['currentCategory'])
  },
  methods: {
    toggle: function () {
      this.$refs.drawer.toggle()
    },
    ...mapServerActions(['updateCurrentCategory'])
  }
}
</script>

<style scoped></style>
