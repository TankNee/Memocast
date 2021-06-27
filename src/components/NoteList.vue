/** * @Description: Note List which can scroll infinitely * @Author: TankNee *
@Date: 9/5/2020 6:21 PM **/
<template>
  <div>
    <q-pull-to-refresh @refresh="handleRefreshNoteList">
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
              <NoteItem :data="noteField" />
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
        <q-fab-action
          color="red-7"
          v-if="showDeleteCategoryFab"
          icon="delete_forever"
          @click="handleDeleteCategory"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-red-10 text-white shadow-4  text-h7"
            >{{ $t('deleteCategory') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action
          v-if="showDeleteCategoryFab"
          :color="color"
          icon="import_export"
          @click="handleExportCategory"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            :content-class="`bg-${color} text-white shadow-4  text-h7`"
            >{{ $t('export') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action
          v-if="showDeleteCategoryFab"
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
        <q-fab-action :color="color" icon="note_add" @click="handleAddNote">
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
          icon="create_new_folder"
          @click="handleAddCategory"
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
    </q-pull-to-refresh>
  </div>
</template>

<script>
import NoteItem from './ui/NoteItem'
import ImportDialog from './ui/dialog/ImportDialog.vue'
import { createNamespacedHelpers } from 'vuex'
import Loading from './ui/Loading'
import helper from '../utils/helper'
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('server')
export default {
  name: 'NoteList',
  components: { Loading, NoteItem, ImportDialog },
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
    showDeleteCategoryFab: function () {
      return !helper.isNullOrEmpty(this.currentCategory)
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
      return this.tags.map(t => t.tagGuid).includes(this.currentCategory)
    },
    ...mapGetters(['activeNote', 'currentNotes']),
    ...mapState(['isCurrentNotesLoading', 'currentCategory', 'isLogin', 'tags'])
  },
  methods: {
    handleAddNote: function () {
      this.$q
        .dialog({
          title: this.$t('createNote'),
          prompt: {
            model: this.$t('noteTitle'),
            type: 'text',
            attrs: {
              spellcheck: false
            }
          },
          cancel: true
        })
        .onOk(data => {
          this.createNote(data)
        })
    },
    handleAddCategory: function () {
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
          cancel: true
        })
        .onOk(data => {
          this.createCategory(data)
        })
    },
    handleDeleteCategory: function () {
      if (helper.isNullOrEmpty(this.currentCategory)) return
      this.$q
        .dialog({
          title: this.$t('deleteCategory'),
          cancel: true
        })
        .onOk(() => {
          this.deleteCategory(this.currentCategory)
        })
    },
    handleExportCategory: function () {
      this.exportMarkdownFiles(this.currentNotes)
    },
    handleRefreshNoteList: async function (done) {
      const tagIndex = this.tags.findIndex(
        t => t.tagGuid === this.currentCategory
      )
      await this.updateCurrentCategory({
        type: tagIndex === -1 ? 'category' : 'tag',
        data: this.currentCategory
      })
      done()
    },
    ...mapActions([
      'createNote',
      'createCategory',
      'deleteCategory',
      'updateCurrentCategory',
      'exportMarkdownFiles'
    ])
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
