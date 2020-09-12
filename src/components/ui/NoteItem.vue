/** * @Description: * @Author: TankNee * @Date: 9/8/2020 1:24 PM **/
<template>
  <q-card
    flat
    :class="`note-card${darkMode ? '-dark' : ''} bg-transparent`"
    @click="getNoteContent({ docGuid })"
  >
    <div :class="`note-item-title${darkMode ? '-dark' : ''}`">
      {{ title }}
    </div>

    <div :class="`note-item-summary${darkMode ? '-dark' : ''}`">
      {{ summary }}
    </div>
    <NoteItemContextMenu :rename="handleRename"/>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoteItemContextMenu from './NoteItemContextMenu'
const { mapActions } = createNamespacedHelpers('server')
export default {
  name: 'NoteItem',
  props: {
    data: {
      type: Object,
      default () {
        return {
          title: '',
          summary: '',
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
    }
  },
  methods: {
    handleRename: function () {
      this.$q.dialog({
        title: this.$t('renameNote'),
        prompt: {
          model: this.title.substring(0, this.title.length - 3),
          type: 'text'
        },
        cancel: true
      }).onOk(data => {
        const info = JSON.parse(JSON.stringify(this.data))
        info.title = `${data}.md`
        info.infoModified = new Date().getTime()
        this.updateNoteInfo(info)
      })
    },
    ...mapActions(['getNoteContent', 'updateNoteInfo'])
  }
}
</script>

<style scoped>

</style>
