/** * @Description: * @Author: TankNee * @Date: 9/8/2020 1:24 PM **/
<template>
  <q-card
    flat
    :class="`note-card${darkTag} bg-transparent`"
    @click="getNoteContent({ docGuid })"
  >
    <div :class="`note-item-title${darkTag}`">
      {{ title }}
    </div>

    <div :class="`note-item-summary${darkTag}`">
      {{ summary }}
    </div>
    <div :class="`note-item-summary${darkTag} flex justify-between no-wrap overflow-hidden fa-align-center`">
      <span class="text-left note-info-tag"><q-icon name="category" size="17px"/> {{ category }}</span>
      <span class="text-right note-info-tag"><q-icon name="timer" size="17px"/> {{ modifiedDate }}</span>
    </div>
    <NoteItemContextMenu :rename="renameHandler" :del="deleteHandler" :copy-to="copyToHandler" :move-to="moveToHandler" />
    <CategoryDialog ref="categoryDialog" :note-info="data" :label="categoryDialogLabel" :handler="categoryDialogHandler" />
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoteItemContextMenu from './NoteItemContextMenu'
import helper from 'src/utils/helper'
import CategoryDialog from 'components/ui/CategoryDialog'
const { mapActions } = createNamespacedHelpers('server')
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
      categoryDialogHandler: () => {}
    }
  },
  components: { CategoryDialog, NoteItemContextMenu },
  computed: {
    summary () {
      return this.data.abstractText &&
        this.data.abstractText.length > this.maxSummaryLength
        ? this.data.abstractText.substring(0, this.maxSummaryLength) + '...'
        : this.data.abstractText
    },
    title () {
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
        const categoryList = this.data.category.split('/')
        return categoryList[categoryList.length - 2]
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    renameHandler: function () {
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
      this.$q.dialog({
        title: this.$t('deleteNote'),
        cancel: true
      }).onOk(() => {
        this.deleteNote(this.data)
      })
    },
    copyToHandler: function () {
      this.categoryDialogLabel = 'copyToAnotherCategory'
      this.categoryDialogHandler = this.copyNote
      this.$refs.categoryDialog.toggle()
    },
    moveToHandler: function () {
      this.categoryDialogLabel = 'moveToAnotherCategory'
      this.categoryDialogHandler = this.moveNote
      this.$refs.categoryDialog.toggle()
    },
    ...mapActions(['getNoteContent', 'updateNoteInfo', 'deleteNote', 'moveNote', 'copyNote'])
  }
}
</script>

<style scoped>

</style>
