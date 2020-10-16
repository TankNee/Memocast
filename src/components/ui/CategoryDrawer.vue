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
            updateCurrentCategory(v)
          }
        "
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
        display: 'none'
      }
    },

    barStyle () {
      return {
        display: 'none'
      }
    },

    ...mapServerGetters(['categories']),
    ...mapServerState(['currentCategory'])
  },
  methods: {
    toggle: function () {
      this.$refs.drawer.toggle()
    },
    hide: function () {
      if (this.$refs.drawer) {
        this.$refs.drawer.hide()
      }
    },
    ...mapServerActions(['updateCurrentCategory'])
  },
  mounted () {
    const that = this
    document.addEventListener('click', (e) => {
      if (e.path[1] && e.path[1].className && e.path[1].className.indexOf('q-tree__node') !== -1) return
      that.hide()
    })
  }
}
</script>

<style scoped></style>
