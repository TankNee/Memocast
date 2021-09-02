<template>
  <q-dialog ref='dialog' transition-show='fade' transition-hide='fade' class='base-dialog'>
    <q-card
      class='q-dialog search-dialog'>
      <q-card-section>
        <q-select
          use-input
          filled
          outlined
          v-model='searchText'
          @filter='filterHandler'
          @input='inputHandler'
          @clear='clearHandler'
          clearable
          autofocus
          dropdown-icon='location_searching'
          popup-content-style='max-width: 60vw'
          input-debounce='500'
          :options='searchResult'
          style='background-color: var(--backgroundColor);'
          :label='$t("search")'>
          <template v-slot:option='scope'>
            <q-item
              v-bind='scope.itemProps'
              v-on='scope.itemEvents'
              style='padding: 0; max-width: 60vw;'
            >
              <q-item-section style='padding: 0;'>
                <NoteItem :data='scope.opt' :dense='false' :maxSummaryLength='20' :title-wrap='true' />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoteItem from 'components/ui/NoteItem'

const {
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
export default {
  name: 'SearchDialog',
  components: { NoteItem },
  computed: {
    ...mapServerState(['noteState', 'currentCategory'])
  },
  data () {
    return {
      searchText: '',
      searchResult: []
    }
  },
  methods: {
    inputHandler: function (note) {
      if (!note) return
      const { docGuid, category } = note
      if (this.noteState !== 'default') {
        this.$q.dialog({
          title: this.$t('discardNote'),
          cancel: {
            label: this.$t('cancel')
          },
          ok: {
            label: this.$t('ok')
          },
          message: this.$t('discardNoteHint')
        }).onOk(() => this.getNoteContent({ docGuid: docGuid }))
      } else {
        console.time('NoteLoadTime')
        this.getNoteContent({ docGuid: docGuid }).then(() => {
          console.timeEnd('NoteLoadTime')
        })
      }
      if (category !== this.currentCategory) {
        this.updateCurrentCategory({ data: category, type: 'category' })
      }
      this.clearHandler()
      this.$refs.dialog.hide()
    },
    clearHandler: function () {
      this.searchResult = []
      this.searchText = ''
    },
    filterHandler: function (value, update) {
      if (!value.length) {
        update(() => {
          this.searchResult = []
        })
        return
      }
      this.searchNote(value).then((res) => {
        update(() => {
          this.searchResult = res
        })
      })
    },
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    ...mapServerActions(['searchNote', 'getNoteContent', 'updateCurrentCategory'])
  }
}
</script>

<style scoped>
.search-dialog {
  bottom: 30vh;
  width: 60vw;
  font-weight: bold;
}
</style>
