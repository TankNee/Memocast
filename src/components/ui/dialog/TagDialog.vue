<template>
  <q-dialog ref="dialog" class="base-dialog">
    <q-card
      class="q-dialog base-dialog"
      style="max-height: 90vh;min-height: 70vh;min-width: 70vw"
    >
      <q-toolbar>
        <q-icon
          name="account_tree"
          class="text-primary"
          style="font-size: 1.8em"
        />
        <q-toolbar-title
          ><span class="text-weight-bold non-selectable">{{
            $t('tag')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="scroll" style="height: 70vh;width: 70vw">
        <q-select
          filled
          :value="noteTags"
          use-input
          use-chips
          multiple
          input-debounce="0"
          @new-value="newValueHandler"
          @remove="removeHandler"
          @input="inputHandler"
          :options="tagList"
          @filter="filterHandler"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label caption>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('noTags') }}
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
const { mapState: mapServerState } = createNamespacedHelpers('server')
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
export default {
  name: 'TagDialog',
  computed: {
    noteTagGuids: function () {
      return this.currentNote?.info?.tags?.split('*') || []
    },
    ...mapServerState(['currentNote', 'tags'])
  },
  data () {
    return {
      noteTags: [],
      tagList: []
    }
  },
  methods: {
    filterHandler (val, update, abort) {
      update(() => {
        if (val === '') {
          this.tagList = this.tags
        } else {
          const needle = val.toLowerCase()
          this.tagList = this.tags.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    newValueHandler: function (val, done) {
      if (val.length > 0) {
        if (!stringOptions.includes(val)) {
          stringOptions.push(val)
        }
        console.log(1, val)
        done(val, 'toggle')
      }
    },
    toggle: function () {
      if (this.$refs.dialog) {
        this.$refs.dialog.toggle()
      }
    },
    removeHandler: function ({ index, value }) {
      console.log(index, value)
    },
    inputHandler: function (v) {
      console.log('input', v)
      this.noteTags = v.map(t => {
        if (typeof t !== 'string') {
          return t.name
        }
        return t
      })
      return v
    }
  },
  watch: {
    noteTagGuids: function (v) {
      this.noteTags = this.tags
        ?.filter(t => v.includes(t.tagGuid))
        .map(t => t.name)
    }
  }
}
</script>

<style scoped></style>
