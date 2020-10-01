<template>
  <div>
    <q-tabs shrink v-model="tab" >
      <q-tab name="noteList" :label="$t('noteList')"></q-tab>
      <q-tab name="noteOutline" :label="$t('noteOutline')"></q-tab>
    </q-tabs>
    <q-tab-panels transition-prev="fade" transition-next="fade" v-model="tab" class="bg-transparent"  animated>
      <q-tab-panel name="noteList" class="no-padding bg-transparent">
        <NoteList/>
      </q-tab-panel>
      <q-tab-panel name="noteOutline" class="no-padding bg-transparent">
        <NoteOutline />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import NoteList from './NoteList'
import NoteOutline from 'components/NoteOutline'
export default {
  name: 'Sidebar',
  components: { NoteOutline, NoteList },
  data () {
    return {
      tab: 'noteList'
    }
  }
}
</script>

<style scoped>
</style>
