/** * @Description: * @Author: TankNee * @Date: 9/8/2020 1:24 PM **/
<template>
  <q-card
    flat
    :class='`note-card${darkTag} bg-transparent`'
    @click='noteItemClickHandler'
  >
    <div :class='`note-item-title${darkTag}`' v-html='title'></div>

    <div :class='`note-item-summary${darkTag}`' v-html='summary'></div>

    <div :class='`note-item-summary${darkTag} flex justify-between no-wrap overflow-hidden fa-align-center`'>
      <span class='text-left note-info-tag'><q-icon name='category' size='17px' /> {{ category }}</span>
      <span class='text-right note-info-tag'><q-icon name='timer' size='17px' /> {{ modifiedDate }}</span>
    </div>
  </q-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'

const {
  mapActions: mapServerActions,
  mapState: mapServerState
} = createNamespacedHelpers('server')
export default {
  name: 'NoteItem',
  props: {
    data: {
      type: Object,
      default () {
        return {
          abstractText: '',
          docGuid: '',
          category: ''
        }
      }
    },
    maxSummaryLength: {
      type: Number,
      default: 40
    },
    markdown: Boolean,
    contextmenuHandler: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      categoryDialogLabel: '',
      categoryDialogHandler: () => {},
      count: 0
    }
  },
  computed: {
    summary () {
      if (helper.isNullOrEmpty(this.data.abstractText) && !helper.isNullOrEmpty(this.data.highlight)) {
        const { highlight: { text = [] } } = this.data
        const summary = text.join('')
        return summary.length > this.maxSummaryLength
          ? summary.substring(0, this.maxSummaryLength) + '...'
          : summary
      }
      return this.data.abstractText &&
      this.data.abstractText.length > this.maxSummaryLength
        ? this.data.abstractText.substring(0, this.maxSummaryLength) + '...'
        : this.data.abstractText
    },
    title () {
      if (!helper.isNullOrEmpty(this.data.highlight)) {
        const { highlight: { title = [] } } = this.data
        return title.join('')
      }
      return this.data.title
    },
    docGuid () {
      return this.data.docGuid
    },
    darkMode () {
      return this.$q.dark.isActive
    },
    darkTag () {
      return this.darkMode ? '-dark' : ''
    },
    modifiedDate () {
      return helper.displayDateElegantly(this.data.dataModified)
    },
    category () {
      if (helper.isNullOrEmpty(this.data.category)) return ''
      try {
        if (helper.wizIsPredefinedLocation(this.data.category)) return this.$t(this.data.category)
        const categoryList = this.data.category.split('/')
        return categoryList[categoryList.length - 2]
      } catch (e) {
        return ''
      }
    },
    ...mapServerState(['noteState', 'currentCategory'])
  },
  methods: {
    noteItemClickHandler: function () {
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
        }).onOk(() => this.getNoteContent({ docGuid: this.docGuid }))
      } else {
        this.getNoteContent({ docGuid: this.docGuid })
      }
    },
    ...mapServerActions(['getNoteContent', 'updateNoteInfo'])
  }
}
</script>

<style scoped>

</style>
