<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" :limits="[15, 50]" class="full-width">
      <template v-slot:before>
        <NoteList :data="notes" />
      </template>

      <template v-slot:after>
        <Vditor class="exclude-header overflow-hidden"/>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import Vditor from '../components/Vditor'
import NoteList from '../components/NoteList'
export default {
  name: 'PageIndex',
  components: { Vditor, NoteList },
  data () {
    return {
      splitterModel: 30,
      notes: [
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' },
        { title: '测试一', summary: '测试' }]
    }
  }
}
</script>
