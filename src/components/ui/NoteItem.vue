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
    <NoteItemContextMenu/>
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
      return this.data.summary &&
        this.data.summary.length > this.maxSummaryLength
        ? this.data.summary.substring(0, this.maxSummaryLength) + '...'
        : this.data.summary
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
    ...mapActions(['getNoteContent'])
  }
}
</script>

<style scoped>

</style>
