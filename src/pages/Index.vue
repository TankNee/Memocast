<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" :limits="[270, 600]" class="full-width" unit="px">
      <template v-slot:before>
        <NoteList :data="currentNotes" />
      </template>

      <template v-slot:after>
        <Vditor class="exclude-header overflow-hidden" />
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import Vditor from '../components/Vditor'
import NoteList from '../components/NoteList'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('server')
export default {
  name: 'PageIndex',
  components: { Vditor, NoteList },
  computed: {
    ...mapGetters(['currentNotes'])
  },
  data () {
    return {
      splitterModel: 280
    }
  }
}
</script>
