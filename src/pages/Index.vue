<template>
  <q-page class="flex">
    <q-splitter
      v-model="splitterModel"
      :limits="[270, 600]"
      class="full-width"
      unit="px"
      separator-class="bg-transparent"
    >
      <template v-slot:before>
        <NoteList />
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
          </q-scroll-area>
          <q-icon
            name="all_inbox"
            class="absolute-center material-icons-round"
            size="128px"
            color="#494949"
            v-if="!isCurrentNoteLoading && !dataLoaded"
            v-ripple
          />
          <q-icon
            name="format_align_center"
            class="absolute-top-right fab-icon cursor-pointer material-icons-round"
            @click="() => $refs.outlineDrawer.toggle()"
            size="24px"
            color="#26A69A"
            v-if="dataLoaded && contentsListLoaded"
            v-ripple
          />
          <q-icon
            name="cached"
            class="absolute-bottom-right fab-icon cursor-pointer material-icons-round"
            @click="refreshCurrentNote"
            size="24px"
            color="#26A69A"
            v-if="dataLoaded"
            v-ripple
          />
        </div>
        <NoteOutline ref="outlineDrawer" />
        <q-inner-loading :showing="isCurrentNoteLoading">
          <q-spinner size="80px" color="primary" />
        </q-inner-loading>
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
import NoteOutline from 'components/NoteOutline'
const { mapGetters, mapState } = createNamespacedHelpers('server')
// import Sidebar from '../components/Sidebar'
export default {
  name: 'PageIndex',
  components: { NoteOutline, Vditor, NoteList },
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
      return !!this.contentsList.length
    },
    ...mapGetters(['currentNote']),
    ...mapState(['contentsList', 'isCurrentNoteLoading'])
  },
  data () {
    return {
      splitterModel: 300
    }
  },
  methods: {
    refreshCurrentNote: function () {
      bus.$emit(events.SAVE_NOTE)
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
