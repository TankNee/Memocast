/** * @Description: Note List which can scroll infinitely * @Author: TankNee *
@Date: 9/5/2020 6:21 PM **/
<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    class="note-list exclude-header">
    <NoteItem
      v-for="({ title, summary }, index) in data"
      :key="index"
      :title="title"
      :summary="summary"
    />
  </q-scroll-area>
</template>

<script>
import NoteItem from './ui/NoteItem'

export default {
  name: 'NoteList',
  components: { NoteItem },
  props: {
    data: Array
  },
  computed: {
    thumbStyle () {
      return {
        borderRadius: '5px',
        backgroundColor: '#E8ECF1',
        width: '7px',
        opacity: 0.75
      }
    },

    barStyle () {
      return {
        width: '7px'
      }
    }
  }
}
</script>

<style scoped>
.note-list {
  padding: 0 10px 10px 10px;
}
</style>
