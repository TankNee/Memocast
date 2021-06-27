<template>
  <q-page class='flex'>
    <q-splitter
      v-model='splitterModel'
      :limits='splitterLimit'
      class='full-width'
      unit='px'
      separator-class='bg-transparent'
      after-class='hide-scrollbar'
    >
      <template v-slot:before>
        <transition
          appear
          enter-active-class='animated fadeIn'
          leave-active-class='animated fadeOut'
        >
          <NoteList v-show='noteListVisible' />
        </transition>
      </template>
      <template v-slot:after>
        <div class='full-height'>
          <q-scroll-area
            ref='previewScrollArea'
            :thumb-style='thumbStyle'
            :bar-style='barStyle'
            class='exclude-header overflow-hidden'
            v-show='!isSourceMode'
          >
            <Muya ref='muya' :active='!isSourceMode' :data='tempNoteData' />
            <VditorContextMenu />
          </q-scroll-area>
          <Monaco ref='monaco' :active='isSourceMode' :data='tempNoteData' v-show='isSourceMode' />
          <transition-group
            appear
            enter-active-class='animated fadeIn'
            leave-active-class='animated fadeOut'
          >
            <q-icon
              class='absolute-center material-icons-round'
              size='256px'
              color='#494949'
              v-if='!isCurrentNoteLoading && !dataLoaded'
              key='all_inbox'
            >
              <svg id='svg' version='1.1' viewBox='0, 0, 400,400'>
                <g id='svgg'>
                  <path id='path0'
                        d='M266.113 119.077 C 265.791 119.248,264.446 120.058,263.124 120.876 C 260.595 122.441,256.273 125.090,253.868 126.549 C 253.083 127.026,251.826 127.801,251.074 128.273 C 247.868 130.285,240.895 134.581,240.638 134.702 C 240.485 134.775,239.407 135.433,238.244 136.165 C 235.925 137.623,232.853 139.510,231.934 140.040 C 231.611 140.226,229.326 141.634,226.855 143.168 C 224.385 144.703,221.572 146.432,220.605 147.011 C 219.639 147.589,218.101 148.524,217.188 149.089 C 216.274 149.653,214.692 150.620,213.672 151.237 C 210.876 152.928,209.749 154.447,210.634 155.333 C 210.853 155.552,216.340 158.899,223.133 162.957 C 223.342 163.082,224.505 163.821,225.718 164.600 C 228.254 166.228,228.611 166.293,230.118 165.409 C 231.107 164.829,235.062 162.277,236.174 161.502 C 236.465 161.299,236.747 161.133,236.802 161.133 C 236.891 161.133,238.537 160.087,242.188 157.711 C 243.449 156.890,245.870 155.343,247.771 154.143 C 248.318 153.798,248.823 153.516,248.895 153.516 C 248.966 153.516,249.024 180.207,249.022 212.829 C 249.019 260.364,249.068 272.174,249.265 272.302 C 249.524 272.470,267.290 272.434,267.434 272.266 C 267.513 272.173,267.863 205.784,268.096 146.552 L 268.202 119.569 267.792 119.160 C 267.307 118.675,266.907 118.655,266.113 119.077 M121.816 119.460 C 121.599 119.678,121.652 141.770,121.871 142.179 C 122.036 142.488,122.918 143.087,124.316 143.839 C 124.822 144.110,127.556 145.732,132.910 148.934 C 135.273 150.348,137.734 151.812,138.379 152.188 C 139.023 152.564,140.386 153.384,141.406 154.011 C 142.427 154.637,143.789 155.452,144.434 155.821 C 145.891 156.657,145.965 156.700,150.488 159.385 C 152.529 160.596,154.668 161.859,155.241 162.190 C 155.814 162.522,156.429 162.881,156.608 162.989 C 161.153 165.718,167.064 169.249,170.508 171.290 C 172.925 172.724,178.022 175.761,181.836 178.039 C 185.649 180.318,189.077 182.355,189.453 182.567 C 190.011 182.881,191.577 183.797,193.555 184.967 C 193.716 185.062,194.766 185.693,195.889 186.369 C 197.011 187.045,198.242 187.776,198.623 187.993 C 199.004 188.211,200.503 189.102,201.953 189.973 C 203.403 190.843,206.084 192.446,207.910 193.535 C 209.736 194.623,211.362 195.597,211.523 195.698 C 211.685 195.800,213.267 196.736,215.039 197.780 C 220.798 201.169,225.421 203.920,228.809 205.971 C 232.776 208.373,233.190 208.558,233.539 208.080 C 233.899 207.587,233.905 186.945,233.545 186.474 C 233.280 186.128,233.115 186.024,225.879 181.686 C 215.705 175.585,212.962 173.935,205.176 169.230 C 200.771 166.568,196.685 164.112,196.094 163.771 C 194.832 163.043,192.185 161.446,191.211 160.825 C 190.835 160.585,188.198 158.987,185.352 157.275 C 182.505 155.562,179.736 153.892,179.199 153.562 C 177.758 152.678,161.970 143.204,153.320 138.034 C 149.185 135.561,145.273 133.209,144.629 132.806 C 143.984 132.404,143.091 131.867,142.643 131.613 C 142.195 131.360,141.185 130.749,140.397 130.257 C 137.190 128.253,131.409 124.779,123.828 120.301 C 122.328 119.415,121.999 119.278,121.816 119.460 M291.193 146.045 C 289.952 146.878,287.973 148.150,278.613 154.133 C 275.333 156.230,274.972 156.494,274.816 156.904 C 274.698 157.215,274.316 242.745,274.316 269.010 C 274.316 272.866,273.198 272.461,283.833 272.461 L 292.591 272.461 292.756 272.021 C 292.847 271.780,292.932 265.474,292.945 258.008 C 292.958 250.542,293.016 242.324,293.073 239.746 C 293.131 237.168,293.263 217.964,293.366 197.070 C 293.469 176.177,293.612 156.213,293.683 152.707 L 293.812 146.333 293.301 145.823 C 292.638 145.160,292.491 145.175,291.193 146.045 M110.470 145.817 C 110.319 146.211,110.368 248.913,110.526 262.305 L 110.645 272.363 119.238 272.418 C 123.965 272.447,128.037 272.422,128.287 272.361 L 128.741 272.251 128.629 256.389 C 128.568 247.665,128.473 236.968,128.420 232.617 C 128.366 228.267,128.275 214.775,128.217 202.637 C 128.160 190.498,128.063 180.061,128.002 179.443 C 127.929 178.702,127.963 178.320,128.102 178.320 C 128.272 178.320,141.069 185.886,143.262 187.283 C 143.584 187.489,145.649 188.727,147.852 190.034 C 150.054 191.342,152.778 192.967,153.906 193.646 C 155.034 194.325,156.265 195.053,156.641 195.264 C 157.017 195.474,157.983 196.042,158.789 196.524 C 159.595 197.007,162.144 198.528,164.453 199.904 C 166.763 201.281,169.180 202.733,169.824 203.131 C 177.009 207.568,182.385 210.624,183.008 210.625 C 183.517 210.625,184.465 210.172,186.719 208.854 C 188.384 207.880,190.757 206.515,191.992 205.820 C 193.228 205.125,194.590 204.357,195.020 204.114 C 195.449 203.871,196.592 203.225,197.559 202.679 C 201.392 200.512,201.373 200.471,194.727 196.433 C 192.524 195.095,189.602 193.307,188.233 192.459 C 186.863 191.611,185.589 190.829,185.401 190.721 C 184.707 190.321,182.666 189.079,180.957 188.017 C 179.990 187.416,178.452 186.478,177.539 185.931 C 176.626 185.384,174.912 184.344,173.730 183.620 C 172.549 182.896,169.824 181.241,167.676 179.943 C 165.527 178.645,162.627 176.877,161.230 176.014 C 159.834 175.151,158.340 174.230,157.910 173.967 C 157.480 173.704,155.942 172.760,154.492 171.869 C 150.227 169.249,142.960 164.821,140.190 163.155 C 139.575 162.785,138.521 162.138,137.847 161.718 C 137.173 161.298,135.830 160.478,134.863 159.895 C 131.898 158.109,123.684 153.096,120.757 151.286 C 111.230 145.394,110.734 145.130,110.470 145.817 M140.129 206.689 C 140.078 206.824,140.059 221.655,140.087 239.648 L 140.137 272.363 148.202 272.414 C 153.540 272.448,156.397 272.396,156.649 272.261 C 157.039 272.052,157.243 219.381,156.860 217.969 C 156.767 217.629,155.870 216.873,153.901 215.478 C 152.346 214.376,150.020 212.709,148.730 211.773 C 142.002 206.885,140.412 205.946,140.129 206.689 '
                        stroke='none' fill='#9d9d9d' fill-rule='evenodd'></path>
                </g>
              </svg>
            </q-icon>
            <q-icon
              name='format_align_center'
              class='absolute-top-right fab-icon cursor-pointer material-icons-round'
              @click.stop='$refs.outlineDrawer.show'
              size='24px'
              color='#26A69A'
              v-show='dataLoaded && contentsListLoaded && !isOutlineShow && !isSourceMode'
              v-ripple
              key='format_align_center'
            />
            <q-icon
              :name='isSourceMode ? "assignment" : "code"'
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              style='bottom: 50px'
              @click='isSourceMode = !isSourceMode'
              size='24px'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow'
              v-ripple
              key='source_code'
            >
              <q-tooltip anchor='top middle' self='bottom middle' :offset='[10, 10]'
                         content-class='text-bold text-white shadow-4'
              >{{ !isSourceMode ? $t('sourceMode') : $t('previewMode') }}
              </q-tooltip>
            </q-icon>
            <q-icon
              name='save'
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              @click='refreshCurrentNote'
              size='24px'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow'
              v-ripple
              key='save'
            />
          </transition-group>

        </div>
        <NoteOutlineDrawer ref='outlineDrawer' :change='outlineDrawerChangeHandler' />
        <Loading :visible='isCurrentNoteLoading' />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
// import Vditor from '../components/ui/editor/Vditor'
import NoteList from '../components/NoteList'
import bus from 'components/bus'
import events from 'src/constants/events'
import helper from 'src/utils/helper'
import { createNamespacedHelpers } from 'vuex'
import NoteOutlineDrawer from 'components/ui/NoteOutlineDrawer'
import Loading from 'components/ui/Loading'
import VditorContextMenu from 'components/ui/menu/VditorContextMenu'
import Monaco from 'components/ui/editor/Monaco'
import Muya from 'components/ui/editor/Muya'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState
} = createNamespacedHelpers('server')
const { mapState: mapClientState } = createNamespacedHelpers('client')
// import Sidebar from '../components/Sidebar'
export default {
  name: 'PageIndex',
  components: {
    Muya,
    Monaco,
    VditorContextMenu,
    Loading,
    NoteOutlineDrawer,
    // Vditor,
    NoteList
  },
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
      isOutlineShow: false,
      isSourceMode: false,
      tempNoteData: ''
    }
  },
  methods: {
    refreshCurrentNote: function () {
      bus.$emit(events.SAVE_NOTE)
    },
    outlineDrawerChangeHandler: function (state) {
      this.isOutlineShow = state
    },
    registerKeyboardHotKey: function (e) {
      const key = window.event.keyCode
        ? window.event.keyCode
        : window.event.which
      if (helper.isCtrl(e)) {
        switch (key) {
          case 190:
            this.isSourceMode = !this.isSourceMode
            // this.updateNote(this.contentEditor.getMarkdown())
            break
          default:
            break
        }
      }
    }
  },
  mounted () {
    const that = this
    bus.$on(events.SCROLL_TO_HEADER, item => {
      if (!item || !item.element || !that.$refs.previewScrollArea) return
      const rect = item.element.getBoundingClientRect()
      const top =
        that.$refs.previewScrollArea.getScrollPosition() +
        rect.top -
        window.innerHeight * 0.065
      that.$refs.previewScrollArea.setScrollPosition(top, 300)
    })

    bus.$on(events.SCROLL_DOWN, () => {
      that.$refs.previewScrollArea.setScrollPosition(that.$refs.previewScrollArea.scrollSize, 300)
    })

    document.addEventListener('keydown', this.registerKeyboardHotKey)
  },
  watch: {
    isSourceMode: function (val, oldVal) {
      if (oldVal) {
        this.tempNoteData = this.$refs.monaco.getValue()
      } else {
        this.tempNoteData = this.$refs.muya.getValue()
      }
    }
  }
}
</script>
