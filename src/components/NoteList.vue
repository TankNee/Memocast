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
      <q-fab
        color="secondary"
        push
        icon="add"
        direction="up"
        flat
        class="absolute-bottom-right fab-btn"
      >
        <q-fab-action color="primary" icon="note_add" @click="handleAddNote">
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-primary text-white shadow-4"
            >{{ $t('createNote') }}</q-tooltip
          >
        </q-fab-action>
        <q-fab-action color="primary" icon="create_new_folder">
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
    ...mapGetters(['activeNote']),
    ...mapState(['isCurrentNotesLoading', 'currentCategory'])
  },
  methods: {
    handleAddNote: function () {
      this.$q
        .dialog({
          title: this.$t('createNote'),
          prompt: {
            model: this.$t('noTitle'),
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
    handleRefreshNoteList: async function (done) {
      await this.getCategoryNotes({ category: this.currentCategory })
      done()
    },
    ...mapActions(['createNote', 'getCategoryNotes'])
  }
}
</script>

<style scoped>
.fab-btn {
  margin: 10px;
}
</style>
