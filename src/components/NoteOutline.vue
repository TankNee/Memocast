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
    class="transparent"
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class="`exclude-header note-list${$q.dark.isActive ? '-dark' : ''} fit`"
    >
      <q-tree
        :nodes="contentsList"
        node-key="key"
        selected-color="primary"
        class="non-selectable"
        :selected.sync="selected"
        :expanded.sync="expanded"
        @update:selected="v => {
            $refs.drawer.hide()
            nodeClickHandler(v)
          }"
        default-expand-all
      />
<!--      <q-icon name="close" class="absolute-bottom" size="24px" color="#26A69A" />-->
    </q-scroll-area>
    <q-icon
      name="close"
      :class="`absolute-bottom-right fab-icon cursor-pointer material-icons-round neeto-icon${$q.dark.isActive ? '-dark' : ''}`"
      @click="$refs.drawer.hide()"
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
    toggle: function () {
      this.$refs.drawer.toggle()
    },
    hide: function () {
      this.$refs.drawer.hide()
    },
    nodeClickHandler: function (v) {
      const node = helper.findNodeByNodeKey(this.contentsList, v)
      bus.$emit(events.SCROLL_TO_HEADER, node)
    }
  }
}
</script>

<style scoped></style>
