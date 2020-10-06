<template>
  <q-drawer
    ref="drawer"
    :value="false"
    :mini-width="200"
    :breakpoint="700"
    content-class="bg-primary text-white"
    overlay
    elevated
    side="right"
    class="bg-blur"
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class="`exclude-header note-list${$q.dark.isActive ? '-dark' : ''} fit`"
    >
      <q-tree
        :nodes="contentsList"
        node-key="key"
        default-expand-all
        selected-color="primary"
        class="non-selectable z-max"
        :selected.sync="selected"
        :expanded.sync="expanded"
        @update:selected="
          v => {
            nodeClickHandler(v)
          }
        "
      />
      <!--      <q-icon name="close" class="absolute-bottom" size="24px" color="#26A69A" />-->
    </q-scroll-area>
    <q-icon
      name="close"
      :class="
        `absolute-bottom-right fab-icon cursor-pointer material-icons-round neeto-icon${
          $q.dark.isActive ? '-dark' : ''
        } z-max`
      "
      @click="hide"
      size="24px"
      color="#26A69A"
      v-ripple
    />
  </q-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import bus from 'components/bus'
import events from 'src/constants/events'
const { mapGetters, mapState } = createNamespacedHelpers('server')
export default {
  name: 'NoteOutline',
  props: {
    change: {
      types: Function,
      default: () => {}
    }
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
    ...mapGetters(['currentNote']),
    ...mapState(['contentsList'])
  },
  data () {
    return {
      selected: '',
      expanded: []
    }
  },
  methods: {
    show: function () {
      this.$refs.drawer.show()
      this.change(true)
    },
    hide: function () {
      this.$refs.drawer.hide()
      this.change(false)
    },
    nodeClickHandler: function (v) {
      const node = helper.findNodeByNodeKey(this.contentsList, v)
      bus.$emit(events.SCROLL_TO_HEADER, node)
    }
  },
  mounted () {
    const that = this
    document.addEventListener('click', (e) => {
      console.log(e)
      if (e.path[1].className.indexOf('q-tree__node') !== -1) return
      that.hide()
    })
  }
}
</script>

<style scoped></style>
