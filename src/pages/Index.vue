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
        <NoteList />
      </template>
      <template v-slot:after>
        <div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="exclude-header overflow-hidden"
          >
            <Vditor />
          </q-scroll-area>
          <q-icon name="cached" class="absolute-bottom-right fab-btn cursor-pointer material-icons-round" v-touch-swipe size="lg" color="#26A69A" v-ripple/>
        </div>

      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import Vditor from '../components/Vditor'
import NoteList from '../components/NoteList'
// import Sidebar from '../components/Sidebar'
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
    }
  },
  data () {
    return {
      splitterModel: 300
    }
  }
}
</script>
