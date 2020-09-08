/**
 * @Description:
 * @Author: TankNee
 * @Date: 9/8/2020 1:24 PM
 **/
<template>
  <q-card flat class="note-card bg-transparent" @click="getNoteContent({docGuid})">
    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
    </q-card-section>
    <q-separator inset />

    <q-card-section>
      {{ summary }}
    </q-card-section>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
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
  computed: {
    summary () {
      return this.data.summary.length > this.maxSummaryLength
        ? this.data.summary.substring(0, this.maxSummaryLength) + '...'
        : this.data.summary
    },
    title () {
      return this.data.title
    },
    docGuid () {
      return this.data.docGuid
    }
  },
  methods: {
    ...mapActions(['getNoteContent'])
  }
}
</script>

<style scoped>
.note-card {
  width: 100%;
  margin: 1rem 0rem;
}
</style>
