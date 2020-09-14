<template>
  <q-page class="flex">
    <q-splitter
      v-model="splitterModel"
      :limits="[270, 600]"
      class="full-width"
      unit="px"
      separator-class="bg-transparent"
    >
      <template v-slot:before>
        <NoteList :data="currentNotes" />
      </template>
      <template v-slot:after>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="exclude-header overflow-hidden"
        >
          <Vditor />
        </q-scroll-area>
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
    ...mapGetters(['currentNotes'])
  },
  data () {
    return {
      splitterModel: 300
    }
  }
}
</script>
