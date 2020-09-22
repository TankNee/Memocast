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
    <div :class="`note-item-summary${darkTag} flex justify-between no-wrap overflow-hidden`">
      <span class="text-left">{{ category }}</span>
      <span class="text-right">{{ $t('modifiedAt',{date:modifiedDate})}}</span>
    </div>
    <NoteItemContextMenu :rename="handleRename" :del="handleDelete"/>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoteItemContextMenu from './NoteItemContextMenu'
import helper from 'src/utils/helper'
const { mapActions } = createNamespacedHelpers('server')
export default {
  name: 'NoteItem',
  props: {
    data: {
      type: Object,
      default () {
        return {
          abstractText: '',
          docGuid: ''
        }
      }
    },
    maxSummaryLength: {
      type: Number,
      default: 40
    },
    markdown: Boolean
  },
  components: { NoteItemContextMenu },
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
        return `/${categoryList[categoryList.length - 2]}/`
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    handleRename: function () {
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
    handleDelete: function () {
      this.$q.dialog({
        title: this.$t('deleteNote'),
        cancel: true
      }).onOk(data => {
        this.deleteNote(this.data)
      })
    },
    ...mapActions(['getNoteContent', 'updateNoteInfo', 'deleteNote'])
  }
}
</script>

<style scoped>

</style>
