<template>
  <q-drawer
    ref="drawer"
    :value="false"
    :mini-width="200"
    :breakpoint="700"
    content-class="bg-primary text-white hide-scrollbar"
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class="`exclude-header note-list${$q.dark.isActive ? '-dark' : ''}`"
    >
      <q-tree
        :nodes="items"
        node-key="key"
        selected-color="primary"
        accordion
        :selected="currentCategory"
        @update:selected="
          v => {
            updateCurrentCategory({ data: v, type: type })
            toggleChanged({
              key: 'noteListVisible',
              value: true
            })
          }
        "
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <div>{{ prop.node.label }}</div>
          </div>
        </template>
      </q-tree>
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

const { mapActions: mapClientActions } = createNamespacedHelpers('client')

export default {
  name: 'CategoryDrawer',
  props: {
    type: String
  },
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
    items () {
      if (this.type === 'category') {
        return this.categories
      } else if (this.type === 'tag') {
        return this.tags
      }
      return []
    },

    ...mapServerGetters(['categories', 'tags']),
    ...mapServerState(['currentCategory'])
  },
  methods: {
    toggle: function () {
      this.$refs.drawer.toggle()
    },
    show: function () {
      if (this.$refs.drawer) {
        this.$refs.drawer.show()
      }
    },
    hide: function () {
      if (this.$refs.drawer) {
        this.$refs.drawer.hide()
      }
    },
    ...mapServerActions(['updateCurrentCategory']),
    ...mapClientActions(['toggleChanged'])
  },
  mounted () {
    // const that = this
    // document.addEventListener('click', e => {
    //   if (
    //     e.path[1] &&
    //     e.path[1].className &&
    //     e.path[1].className.indexOf('q-tree__node') !== -1
    //   ) {
    //     return
    //   }
    //   that.hide()
    // })
  }
}
</script>

<style scoped></style>
