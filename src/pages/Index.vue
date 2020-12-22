<template>
  <q-page class="flex">
    <q-splitter
      v-model="splitterModel"
      :limits="splitterLimit"
      class="full-width"
      unit="px"
      separator-class="bg-transparent"
    >
      <template v-slot:before>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <NoteList v-if="noteListVisible" />
        </transition>
      </template>
      <template v-slot:after>
        <div>
          <q-scroll-area
            ref="vditorScrollArea"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="exclude-header overflow-hidden"
          >
            <Vditor />
            <VditorContextMenu />
          </q-scroll-area>
          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-icon
              name="all_inbox"
              class="absolute-center material-icons-round"
              size="128px"
              color="#494949"
              v-if="!isCurrentNoteLoading && !dataLoaded"
              v-ripple
              key="all_inbox"
            />
            <q-icon
              name="format_align_center"
              class="absolute-top-right fab-icon cursor-pointer material-icons-round"
              @click.stop="$refs.outlineDrawer.show"
              size="24px"
              color="#26A69A"
              v-show="dataLoaded && contentsListLoaded && !isOutlineShow"
              v-ripple
              key="format_align_center"
            />
            <q-icon
              name="save"
              class="absolute-bottom-right fab-icon cursor-pointer material-icons-round"
              @click="refreshCurrentNote"
              size="24px"
              color="#26A69A"
              v-show="dataLoaded && !isOutlineShow"
              v-ripple
              key="save"
            />
          </transition-group>

        </div>
        <NoteOutlineDrawer ref="outlineDrawer" :change="outlineDrawerChangeHandler" />
        <Loading :visible="isCurrentNoteLoading" />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import Vditor from '../components/Vditor'
import NoteList from '../components/NoteList'
import bus from 'components/bus'
import events from 'src/constants/events'
import helper from 'src/utils/helper'
import { createNamespacedHelpers } from 'vuex'
import NoteOutlineDrawer from 'components/ui/NoteOutlineDrawer'
import Loading from 'components/ui/Loading'
import VditorContextMenu from 'components/ui/menu/VditorContextMenu'
const {
  mapGetters: mapServerGetters,
  mapState: mapServerState
} = createNamespacedHelpers('server')
const { mapState: mapClientState } = createNamespacedHelpers('client')
// import Sidebar from '../components/Sidebar'
export default {
  name: 'PageIndex',
  components: { VditorContextMenu, Loading, NoteOutlineDrawer, Vditor, NoteList },
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
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote)
    },
    contentsListLoaded: function () {
      return this.contentsList && !!this.contentsList.length
    },
    splitterLimit: function () {
      if (this.noteListVisible) return [300, 600]
      return [0, 0]
    },
    ...mapServerGetters(['currentNote']),
    ...mapServerState(['contentsList', 'isCurrentNoteLoading']),
    ...mapClientState(['noteListVisible'])
  },
  data () {
    return {
      splitterModel: 300,
      isOutlineShow: false
    }
  },
  methods: {
    refreshCurrentNote: function () {
      bus.$emit(events.SAVE_NOTE)
    },
    outlineDrawerChangeHandler: function (state) {
      this.isOutlineShow = state
    }
  },
  mounted () {
    const that = this
    bus.$on(events.SCROLL_TO_HEADER, item => {
      if (!item || !item.element || !that.$refs.vditorScrollArea) return
      const rect = item.element.getBoundingClientRect()
      const top =
        that.$refs.vditorScrollArea.getScrollPosition() +
        rect.top -
        window.innerHeight * 0.065
      that.$refs.vditorScrollArea.setScrollPosition(top, 300)
    })
  }
}
</script>
