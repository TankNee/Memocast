/** * @Description: Note List which can scroll infinitely * @Author: TankNee *
@Date: 9/5/2020 6:21 PM **/
<template>
  <div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="note-list exclude-header"
    >
      <q-intersection
        v-for="({ title, summary }, index) in data"
        :key="index"
        transition="scale"
      >
        <NoteItem :title="title" :summary="summary" v-ripple />
      </q-intersection>
    </q-scroll-area>
    <q-fab
      color="secondary"
      push
      icon="add"
      direction="up"
      flat
      class="absolute-bottom-right fab-btn"
    >
      <q-fab-action color="primary" icon="note_add" flat>
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[20, 10]"
          content-class="bg-primary text-white shadow-4"
        >{{ $t('addNote') }}</q-tooltip
        >
      </q-fab-action>
      <q-fab-action color="primary" icon="create_new_folder" flat>
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[20, 10]"
          content-class="bg-primary text-white shadow-4"
        >{{ $t('addFolder') }}</q-tooltip
        >
      </q-fab-action>
    </q-fab>
  </div>
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
  padding: 0 10px 0px 10px;
}
.fab-btn {
  margin: 10px;
}
</style>
