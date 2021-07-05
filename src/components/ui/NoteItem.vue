/** * @Description: * @Author: TankNee * @Date: 9/8/2020 1:24 PM **/
<template>
  <q-card
    flat
    :class='`note-card${darkTag} bg-transparent`'
    @click='noteItemClickHandler'
    @contextmenu='noteItemContextMenuHandler'
  >
    <div :class='`note-item-title${darkTag}`' v-html='title'></div>

    <div :class='`note-item-summary${darkTag}`' v-html='summary'></div>

    <div :class='`note-item-summary${darkTag} flex justify-between no-wrap overflow-hidden fa-align-center`'>
      <span class='text-left note-info-tag'><q-icon name='category' size='17px' /> {{ category }}</span>
      <span class='text-right note-info-tag'><q-icon name='timer' size='17px' /> {{ modifiedDate }}</span>
    </div>
    <CategoryDialog ref='categoryDialog' :note-info='data' :label='categoryDialogLabel'
                    :handler='categoryDialogHandler' />
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import CategoryDialog from 'components/ui/dialog/CategoryDialog'
import { showContextMenu as showNoteItemContextMenu } from 'src/contextMenu/noteList'
import bus from 'components/bus'
import events from 'src/constants/events'

const {
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
const { mapActions: mapClientActions, mapState: mapClientState } = createNamespacedHelpers('client')
export default {
  name: 'NoteItem',
  props: {
    data: {
      type: Object,
      default () {
        return {
          abstractText: '',
          docGuid: '',
          category: ''
        }
      }
    },
    maxSummaryLength: {
      type: Number,
      default: 40
    },
    markdown: Boolean
  },
  data () {
    return {
      categoryDialogLabel: '',
      categoryDialogHandler: () => {},
      count: 0
    }
  },
  components: { CategoryDialog },
  computed: {
    summary () {
      if (helper.isNullOrEmpty(this.data.abstractText) && !helper.isNullOrEmpty(this.data.highlight)) {
        const { highlight: { text = [] } } = this.data
        const summary = text.join('')
        return summary.length > this.maxSummaryLength
          ? summary.substring(0, this.maxSummaryLength) + '...'
          : summary
      }
      return this.data.abstractText &&
      this.data.abstractText.length > this.maxSummaryLength
        ? this.data.abstractText.substring(0, this.maxSummaryLength) + '...'
        : this.data.abstractText
    },
    title () {
      if (!helper.isNullOrEmpty(this.data.highlight)) {
        const { highlight: { title = [] } } = this.data
        return title.join('')
      }
      return this.data.title
    },
    docGuid () {
      return this.data.docGuid
    },
    darkMode () {
      return this.$q.dark.isActive
    },
    darkTag () {
      return this.darkMode ? '-dark' : ''
    },
    modifiedDate () {
      return helper.displayDateElegantly(this.data.dataModified)
    },
    category () {
      if (helper.isNullOrEmpty(this.data.category)) return ''
      try {
        if (helper.wizIsPredefinedLocation(this.data.category)) return this.$t(this.data.category)
        const categoryList = this.data.category.split('/')
        return categoryList[categoryList.length - 2]
      } catch (e) {
        return ''
      }
    },
    ...mapServerState(['noteState']),
    ...mapClientState(['rightClickNoteItem'])
  },
  methods: {
    renameHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.$q.dialog({
        title: this.$t('renameNote'),
        prompt: {
          model: this.title,
          type: 'text',
          attrs: {
            spellcheck: false
          }
        },
        cancel: true
      }).onOk(data => {
        const info = JSON.parse(JSON.stringify(this.data))
        info.title = data
        info.infoModified = new Date().getTime()
        this.updateNoteInfo(info)
      })
    },
    deleteHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.$q.dialog({
        title: this.$t('deleteNote'),
        cancel: true
      }).onOk(() => {
        this.deleteNote(this.data)
      })
    },
    copyToHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.categoryDialogLabel = 'copyToAnotherCategory'
      this.categoryDialogHandler = this.copyNote
      this.$refs.categoryDialog.toggle()
    },
    moveToHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.categoryDialogLabel = 'moveToAnotherCategory'
      this.categoryDialogHandler = this.moveNote
      this.$refs.categoryDialog.toggle()
    },
    flomoHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.sendToFlomo(this.docGuid)
    },
    exportMdHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.exportMarkdownFile(this.data)
    },
    exportPngHandler: function () {
      if (this.data.docGuid !== this.rightClickNoteItem) return
      this.exportPng(this.data)
    },
    noteItemClickHandler: function () {
      if (this.noteState !== 'default') {
        this.$q.dialog({
          title: this.$t('discardNote'),
          cancel: {
            label: this.$t('cancel')
          },
          ok: {
            label: this.$t('ok')
          },
          message: this.$t('discardNoteHint')
        }).onOk(() => this.getNoteContent({ docGuid: this.docGuid }))
      } else {
        this.getNoteContent({ docGuid: this.docGuid })
      }
    },
    noteItemContextMenuHandler: function (event) {
      const { docGuid } = this.data
      this.setRightClickNoteItem(docGuid)
      showNoteItemContextMenu(event)
    },
    ...mapServerActions(['getNoteContent', 'updateNoteInfo', 'deleteNote', 'moveNote', 'copyNote', 'exportMarkdownFile', 'exportPng']),
    ...mapClientActions(['sendToFlomo', 'setRightClickNoteItem'])
  },
  mounted () {
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.rename, this.renameHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.copy, this.copyToHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.move, this.moveToHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.exportNote.markdown, this.exportMdHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.exportNote.png, this.exportPngHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.flomo, this.flomoHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.delete, this.deleteHandler)
  }
}
</script>

<style scoped>

</style>
