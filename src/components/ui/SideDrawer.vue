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
          <div class="row items-center full-width" @contextmenu="(e) => contextMenuHandler(e, prop.node)">
            <div>{{ prop.node.label }}</div>
          </div>
        </template>
      </q-tree>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { showContextMenu as showSideDrawerContextMenu } from 'src/contextMenu/sideDrawer'
import bus from '../bus'
import events from 'src/constants/events'
const {
  mapGetters: mapServerGetters,
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')

const { mapActions: mapClientActions, mapState: mapClientState } = createNamespacedHelpers('client')

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
    ...mapServerState(['currentCategory']),
    ...mapClientState(['rightClickCategoryItem'])
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
    contextMenuHandler: function (e, node) {
      if (this.type !== 'category') return
      this.setRightClickCategoryItem(node.key)
      showSideDrawerContextMenu(e, this.currentCategory === node.key)
    },
    openCategoryHandler: function () {
      this.updateCurrentCategory({ data: this.rightClickCategoryItem, type: this.type })
      this.toggleChanged({
        key: 'noteListVisible',
        value: true
      })
    },
    ...mapServerActions(['updateCurrentCategory']),
    ...mapClientActions(['toggleChanged', 'setRightClickCategoryItem'])
  },
  mounted () {
    bus.$on(events.SIDE_DRAWER_CONTEXT_MENU.openCategory, this.openCategoryHandler)
  }
}
</script>

<style scoped></style>
