<template>
  <q-page class='flex'>
    <q-splitter
      v-model='splitterModel'
      :limits='splitterLimit'
      class='full-width'
      unit='px'
      separator-class='bg-transparent'
      before-class='overflow-hidden'
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
          <div v-show='!isSourceMode && dataLoaded'>
            <Muya ref='muya' :active='!isSourceMode && dataLoaded' :data='tempNoteData' />
          </div>
          <Monaco ref='monaco' v-if='dataLoaded' :active='isSourceMode' :data='tempNoteData' v-show='isSourceMode' />
          <transition-group
            appear
            enter-active-class='animated fadeIn'
            leave-active-class='animated fadeOut'
          >
            <Illustration :mode='illustrationMode' key='illustration' />
            <q-btn
              icon='format_align_center'
              dense
              flat
              round
              class='absolute-top-right fab-icon cursor-pointer material-icons-round'
              @click.stop='$refs.outlineDrawer.show'
              size='md'
              color='#26A69A'
              v-show='dataLoaded && contentsListLoaded && !isOutlineShow && !isSourceMode'
              v-ripple
              key='format_align_center'
            />
            <q-btn
              icon='dashboard'
              dense
              flat
              round
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              style='bottom: 150px'
              size='md'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow && !isSourceMode'
              v-ripple
              key='wordCount'
            >
              <q-tooltip
                transition-show="fade"
                transition-hide="fade"
                anchor="center left" self="center right"
              >
                <div class="text-body2">
                  <p>
                    {{ `${$t('word:', wordCount)}` }}
                  </p>
                  <p>
                    {{ `${$t('character:', wordCount)}` }}
                  </p>
                  <p>
                    {{ `${$t('paragraph:', wordCount)}` }}
                  </p>
                </div>
              </q-tooltip>
            </q-btn>
            <q-btn
              :icon='isSourceMode ? "assignment" : "code"'
              dense
              flat
              round
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              style='bottom: 100px'
              @click='isSourceMode = !isSourceMode'
              size='md'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow'
              v-ripple
              key='source_code'
              :title="!isSourceMode ? $t('sourceMode') : $t('previewMode')"
            >
            </q-btn>
            <q-btn
              :icon='enablePreviewEditor ? "lock_open" : "lock"'
              dense
              flat
              round
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              style='bottom: 50px'
              @click='lockModeHandler'
              size='md'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow'
              v-ripple
              key='lock'
              :title="enablePreviewEditor ? $t('lock') : $t('unlock')"
            />
            <q-btn
              :icon='saveButtonIcon'
              class='absolute-bottom-right fab-icon cursor-pointer material-icons-round'
              dense
              flat
              round
              @click='refreshCurrentNote'
              size='md'
              color='#26A69A'
              v-show='dataLoaded && !isOutlineShow'
              v-ripple
              key='save'
            />
          </transition-group>

        </div>
        <NoteOutlineDrawer ref='outlineDrawer' :change='outlineDrawerChangeHandler' />
        <Loading :visible='isCurrentNoteLoading' />
        <MarkMapDialog ref="markMapDialog" />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import NoteList from '../components/NoteList.vue'
import bus from 'components/bus'
import events from 'src/constants/events'
import helper from 'src/utils/helper'
import { createNamespacedHelpers } from 'vuex'
import NoteOutlineDrawer from 'components/ui/NoteOutlineDrawer.vue'
import { initLoadingPageMixins } from '../mixins'
import Loading from 'components/ui/Loading.vue'
import Monaco from 'components/ui/editor/Monaco.vue'
import Muya from 'components/ui/editor/Muya.vue'
import MarkMapDialog from '../components/ui/dialog/MarkMapDialog.vue'
import Illustration from 'src/components/ui/Illustration.vue'

const {
  mapGetters: mapServerGetters,
  mapState: mapServerState
} = createNamespacedHelpers('server')
const { mapState: mapClientState, mapActions: mapClientActions } = createNamespacedHelpers('client')
// import Sidebar from '../components/Sidebar'
export default {
  name: 'PageIndex',
  mixins: [initLoadingPageMixins],
  components: {
    MarkMapDialog,
    Muya,
    Monaco,
    Loading,
    NoteOutlineDrawer,
    NoteList,
    Illustration
  },
  computed: {
    thumbStyle () {
      return {
        backgroundColor: '#E8ECF1',
        width: '5px',
        opacity: 0.75
      }
    },

    barStyle () {
      return {
        width: '5px'
      }
    },
    dataLoaded: function () {
      return !helper.isNullOrEmpty(this.currentNote) && this.currentNoteInfo?.type !== 'collaboration'
    },
    illustrationMode: function () {
      if (this.isCurrentNoteLoading) return 'loading-background'
      if (this.currentNoteInfo?.type === 'collaboration') return 'collaboration'
      if (this.dataLoaded) return 'none'
      return 'memocast'
    },
    contentsListLoaded: function () {
      return this.contentsList && !!this.contentsList.length
    },
    splitterLimit: function () {
      if (this.noteListVisible) return [150, 600]
      return [0, 0]
    },
    ...mapServerGetters(['currentNote', 'currentNoteInfo']),
    ...mapServerState(['contentsList', 'isCurrentNoteLoading', 'noteState']),
    ...mapClientState(['noteListVisible', 'enablePreviewEditor'])
  },
  data () {
    return {
      splitterModel: 300,
      isOutlineShow: false,
      isSourceMode: false,
      isMindmapMode: false,
      tempNoteData: {},
      wordCount: {
        word: '0',
        paragraph: '0',
        character: '0'
      },
      saveButtonIcon: 'save'
    }
  },
  methods: {
    refreshCurrentNote: function () {
      bus.$emit(events.NOTE_SHORTCUT_CALL.save)
    },
    outlineDrawerChangeHandler: function (state) {
      this.isOutlineShow = state
    },
    sourceModeHandler: function () {
      this.isSourceMode = !this.isSourceMode
    },
    getTempValue: function () {
      let markdown
      if (this.isSourceMode) {
        markdown = this.$refs.monaco?.getValue()
      } else {
        markdown = this.$refs.muya?.getValue()
      }
      return markdown
    },
    generateMindmapHandler: function () {
      const markdown = this.getTempValue()
      this.$refs.markMapDialog.toggle(markdown)
    },
    wordCountUpdateHandler: function (wordCount) {
      this.wordCount = Object.assign({
        word: '',
        paragraph: '',
        character: ''
      }, wordCount)
    },
    editorScrollHandler: function (e) {
      bus.$emit(events.EDITOR_SCROLL, e)
    },
    lockModeHandler: function () {
      this.toggleChanged({
        key: 'enablePreviewEditor',
        value: !this.enablePreviewEditor
      })
      this.$q.notify({
        color: 'primary',
        icon: 'info',
        message: this.enablePreviewEditor ? this.$t('lockModeOff') : this.$t('lockModeOn')
      })
    },
    ...mapClientActions(['toggleChanged'])
  },
  mounted () {
    bus.$on(events.VIEW_SHORTCUT_CALL.lockMode, this.lockModeHandler)
    bus.$on(events.VIEW_SHORTCUT_CALL.sourceMode, this.sourceModeHandler)
    bus.$on(events.GENERATE_MINDMAP, this.generateMindmapHandler)
    bus.$on(events.UPDATE_WORD_COUNT, this.wordCountUpdateHandler)
    this.$nextTick(this.hideInitLoadingPage)
  },
  watch: {
    isSourceMode: function (val) {
      if (!val) {
        this.tempNoteData = {
          markdown: this.$refs.monaco.getValue(),
          cursor: this.$refs.monaco.getCursorPosition()
        }
      } else {
        this.tempNoteData = {
          markdown: this.$refs.muya.getValue(),
          cursor: this.$refs.muya.getCursorPosition()
        }
      }
    },
    noteState: function (val, oldVal) {
      if (val === 'default' && oldVal === 'changed') {
        this.saveButtonIcon = 'check'
        setTimeout(() => {
          this.saveButtonIcon = 'save'
        }, 3000)
      }
    }
  }
}
</script>
<style>
.editor-component {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
