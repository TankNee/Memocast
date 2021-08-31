
<template>
  <div>
    <q-pull-to-refresh @refresh="refreshNoteListHandler">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        :class="`exclude-header note-list${$q.dark.isActive ? '-dark' : ''}`"
      >
        <q-list>
          <q-item
            clickable
            v-ripple="{ color: '#212121' }"
            v-for="(noteField, index) in currentNotes"
            :key="index"
            :class="`note-item${$q.dark.isActive ? '-dark' : ''} no-padding`"
            :active="activeNote(noteField)"
            :active-class="`active-note-item${$q.dark.isActive ? '-dark' : ''}`"
          >
            <q-item-section>
              <div @contextmenu="(e) => noteItemContextMenuHandler(e, noteField)">
                <NoteItem :data="noteField" :dense="noteListDenseMode"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-card
        class="absolute-bottom bg-transparent full-width no-shadow no-padding no-border-radius note-list-bottom text-center"
        v-ripple
        v-if="isLogin"
      >
        <span>{{ category }}</span>
      </q-card>
      <q-fab
        :color="color"
        icon="build"
        direction="up"
        padding="11px"
        class="absolute-bottom-right fab-btn"
        v-if="isLogin && !isTagCategory"
      >
        <!-- <q-fab-action
          v-if="!isRootCategory"
          :color="color"
          icon="import_export"
          @click="exportCategoryHandler"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            :content-class="`bg-${color} text-white shadow-4  text-h7`"
            >{{ $t('export') }}</q-tooltip
          >
        </q-fab-action> -->
        <q-fab-action
          v-if="!isRootCategory"
          :color="color"
          icon="add"
          @click="$refs.ImportDialog.toggle()"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            :content-class="`bg-${color} text-white shadow-4  text-h7`"
            >{{ $t('import') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action v-if="!isRootCategory" :color="color" icon="note_add" @click="addNoteHandler">
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            :content-class="`bg-${color} text-white shadow-4  text-h7`"
            >{{ $t('createNote') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action
          :color="color"
          v-if="isRootCategory"
          icon="create_new_folder"
          @click="addCategoryHandler"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            :content-class="`bg-${color} text-white shadow-4  text-h7`"
          >{{ $t('createCategory') }}</q-tooltip
          >
        </q-fab-action>
      </q-fab>
      <Loading :visible="isCurrentNotesLoading" />
      <ImportDialog ref="ImportDialog" />
    <CategoryDialog ref='categoryDialog' :note-info='rightClickNoteItem' :label='categoryDialogLabel'
                    :handler='categoryDialogHandler' />
    </q-pull-to-refresh>
  </div>
</template>

<script>
import NoteItem from './ui/NoteItem'
import ImportDialog from './ui/dialog/ImportDialog.vue'
import CategoryDialog from './ui/dialog/CategoryDialog'
import { createNamespacedHelpers } from 'vuex'
import Loading from './ui/Loading'
import helper from '../utils/helper'
import bus from './bus'
import events from 'src/constants/events'
import { showContextMenu as showNoteItemContextMenu } from 'src/contextMenu/noteList'
const { mapGetters: mapServerGetters, mapState: mapServerState, mapActions: mapServerActions } = createNamespacedHelpers('server')
const { mapState: mapClientState, mapActions: mapClientActions } = createNamespacedHelpers('client')
export default {
  name: 'NoteList',
  components: { Loading, NoteItem, ImportDialog, CategoryDialog },
  data () {
    return {
      categoryDialogLabel: '',
      categoryDialogHandler: () => {}
    }
  },
  computed: {
    thumbStyle () {
      return {
        background: '#E8ECF1',
        width: '5px',
        opacity: 0.75,
        borderRadius: '10px'
      }
    },

    barStyle () {
      return {
        width: '5px'
      }
    },
    isRootCategory: function () {
      return helper.isNullOrEmpty(this.currentCategory)
    },
    category: function () {
      if (helper.isNullOrEmpty(this.currentCategory)) return ''
      const tagIndex = this.tags.findIndex(
        t => t.tagGuid === this.currentCategory
      )
      if (tagIndex !== -1) {
        return this.tags[tagIndex].name
      } else {
        try {
          if (helper.wizIsPredefinedLocation(this.currentCategory)) return this.$t(this.currentCategory)
          const categoryList = this.currentCategory.split('/')
          return categoryList[categoryList.length - 2]
        } catch (e) {
          return ''
        }
      }
    },
    color: function () {
      return this.$q.dark.isActive ? 'warning' : 'primary'
    },
    isTagCategory: function () {
      return this.tags?.map(t => t.tagGuid).includes(this.currentCategory)
    },
    ...mapServerGetters(['activeNote', 'currentNotes']),
    ...mapServerState(['isCurrentNotesLoading', 'currentCategory', 'isLogin', 'tags', 'currentNote']),
    ...mapClientState(['rightClickCategoryItem', 'rightClickNoteItem', 'noteListDenseMode'])
  },
  methods: {
    addNoteHandler: function () {
      this.$q
        .dialog({
          title: this.$t('createNote'),
          prompt: {
            model: this.$t('noteTitle'),
            type: 'text',
            attrs: {
              spellcheck: false
            },
            label: this.$t('title')
          },
          ok: this.$t('confirm'),
          cancel: this.$t('cancel')
        })
        .onOk(data => {
          this.createNote(data)
        })
    },
    addCategoryHandler: function () {
      this.$q
        .dialog({
          title: this.$t('createCategory'),
          prompt: {
            model: this.$t('categoryName'),
            type: 'text',
            attrs: {
              spellcheck: false
            }
          },
          ok: this.$t('confirm'),
          cancel: this.$t('cancel')
        })
        .onOk(data => {
          this.createCategory({
            childCategoryName: data,
            parentCategory: helper.isNullOrEmpty(this.currentCategory) ? '' : this.rightClickCategoryItem
          })
        })
    },
    deleteCategoryHandler: function () {
      if (helper.isNullOrEmpty(this.rightClickCategoryItem)) return
      this.$q
        .dialog({
          title: this.$t('deleteCategory'),
          ok: this.$t('confirm'),
          cancel: this.$t('cancel')
        })
        .onOk(() => {
          this.deleteCategory(this.rightClickCategoryItem)
        })
    },
    exportCategoryHandler: function () {
      this.exportMarkdownFiles(this.currentNotes)
    },
    refreshNoteListHandler: async function (done) {
      const tagIndex = this.tags.findIndex(
        t => t.tagGuid === this.currentCategory
      )
      await this.updateCurrentCategory({
        type: tagIndex === -1 ? 'category' : 'tag',
        data: this.currentCategory
      })
      done()
    },
    /** NoteItem Action Following */
    renameNoteHandler: function () {
      this.$q.dialog({
        title: this.$t('renameNote'),
        prompt: {
          model: this.rightClickNoteItem.title,
          type: 'text',
          attrs: {
            spellcheck: false
          },
          label: this.$t('title')
        },
        ok: this.$t('confirm'),
        cancel: this.$t('cancel')
      }).onOk(data => {
        const info = JSON.parse(JSON.stringify(this.rightClickNoteItem))
        info.title = data
        info.infoModified = new Date().getTime()
        this.updateNoteInfo(info)
      })
    },
    deleteNoteHandler: function () {
      this.$q.dialog({
        title: this.$t('deleteNote'),
        ok: this.$t('confirm'),
        cancel: this.$t('cancel')
      }).onOk(() => {
        this.deleteNote(this.rightClickNoteItem)
      })
    },
    copyNoteHandler: function () {
      this.categoryDialogLabel = 'copyToAnotherCategory'
      this.categoryDialogHandler = this.copyNote
      this.$refs.categoryDialog.toggle()
    },
    moveNoteHandler: function () {
      this.categoryDialogLabel = 'moveToAnotherCategory'
      this.categoryDialogHandler = this.moveNote
      this.$refs.categoryDialog.toggle()
    },
    exportNoteAsMdHandler: function (current = false) {
      this.exportMarkdownFile({ noteField: this.rightClickNoteItem, current })
    },
    exportNoteAsPngHandler: function (current = false) {
      this.exportPng({ noteField: this.rightClickNoteItem, current })
    },
    noteItemContextMenuHandler: function (e, noteField) {
      const isCurrentNote = noteField.docGuid === this.currentNote?.info?.docGuid
      this.setRightClickNoteItem(noteField)
      showNoteItemContextMenu(e, isCurrentNote)
    },
    ...mapServerActions([
      'createNote',
      'createCategory',
      'deleteCategory',
      'updateCurrentCategory',
      'exportMarkdownFiles',
      'updateNoteInfo',
      'deleteNote',
      'moveNote',
      'copyNote',
      'exportMarkdownFile',
      'exportPng'
    ]),
    ...mapClientActions(['setRightClickNoteItem'])
  },
  mounted () {
    bus.$on(events.SIDE_DRAWER_CONTEXT_MENU.createCategory, this.addCategoryHandler)
    // bus.$on(events.SIDE_DRAWER_CONTEXT_MENU.createNote, this.addNoteHandler)
    bus.$on(events.SIDE_DRAWER_CONTEXT_MENU.exportCategory.markdown, this.exportCategoryHandler)
    bus.$on(events.SIDE_DRAWER_CONTEXT_MENU.delete, this.deleteCategoryHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.rename, this.renameNoteHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.copy, this.copyNoteHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.move, this.moveNoteHandler)
    bus.$on(events.NOTE_SHORTCUT_CALL.exportNoteAsMarkdown, this.exportNoteAsMdHandler)
    bus.$on(events.NOTE_SHORTCUT_CALL.exportNoteAsPNG, this.exportNoteAsPngHandler)
    bus.$on(events.NOTE_ITEM_CONTEXT_MENU.delete, this.deleteNoteHandler)
  }
}
</script>

<style scoped>
.note-list-bottom {
  max-height: 4.5vh;
  padding: 4px !important;
  color: #9b9b9b;
  user-select: none;
  font-size: 13px;
  font-weight: bold;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif, 黑体;
}
</style>
