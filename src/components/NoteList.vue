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
            v-ripple
            v-for="(noteField, index) in data"
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
        class="absolute-bottom full-width no-shadow no-padding no-border-radius note-list-bottom text-center"
        v-ripple
      >
        <span>{{category}}</span>
      </q-card>
      <q-fab
        color="secondary"
        push
        icon="add"
        direction="up"
        flat
        class="absolute-bottom-right fab-btn"
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
            content-class="bg-red-10 text-white shadow-4"
            >{{ $t('deleteCategory') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action color="primary" icon="note_add" @click="handleAddNote">
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-primary text-white shadow-4"
            >{{ $t('createNote') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action
          color="primary"
          icon="create_new_folder"
          @click="handleAddCategory"
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-primary text-white shadow-4"
            >{{ $t('createCategory') }}</q-tooltip
          >
        </q-fab-action>
      </q-fab>
      <Loading :visible="isCurrentNotesLoading" />
    </q-pull-to-refresh>
  </div>
</template>

<script>
import NoteItem from './ui/NoteItem'
import { createNamespacedHelpers } from 'vuex'
import Loading from './ui/Loading'
import helper from '../utils/helper'
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('server')
export default {
  name: 'NoteList',
  components: { Loading, NoteItem },
  props: {
    data: Array
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
    showDeleteCategoryFab: function () {
      return !helper.isNullOrEmpty(this.currentCategory)
    },
    category: function () {
      if (helper.isNullOrEmpty(this.currentCategory)) return ''
      try {
        const categoryList = this.currentCategory.split('/')
        return categoryList[categoryList.length - 2]
      } catch (e) {
        return ''
      }
    },
    ...mapGetters(['activeNote']),
    ...mapState(['isCurrentNotesLoading', 'currentCategory'])
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
    handleRefreshNoteList: async function (done) {
      await this.getCategoryNotes({ category: this.currentCategory })
      done()
    },
    ...mapActions([
      'createNote',
      'createCategory',
      'deleteCategory',
      'getCategoryNotes'
    ])
  }
}
</script>

<style scoped>
.fab-btn {
  margin: 10px;
}
.note-list-bottom {
  max-height: 4.5vh;
  padding: 4px !important;
  color: #9B9B9B;
  user-select: none;
}
</style>
