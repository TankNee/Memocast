<template>
  <q-dialog transition-show='fade' transition-hide='fade' ref="dialog" class="base-dialog">
    <q-card
      class="q-dialog base-dialog"
      style="max-height: 90vh;min-height: 70vh;min-width: 70vw"
    >
      <q-toolbar>
        <q-icon name="bookmark" class="text-primary" style="font-size: 1.8em" />
        <q-toolbar-title
          ><span class="text-weight-bold non-selectable">{{
            $t('tag')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="scroll" style="height: 70vh;width: 70vw">
        <div class="q-pa-md">
          <q-select
            filled
            :value="noteTags"
            use-input
            use-chips
            multiple
            input-debounce="0"
            new-value-mode="add-unique"
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
        </div>
        <div class="q-pa-md">
          <div class="q-gutter-xs">
            <q-chip
              :color="randomColor(tagGuid)"
              :selected="selectStatusHandler(tagGuid)"
              icon="local_offer"
              text-color="white"
              v-for="{ name, tagGuid } in tags"
              :key="tagGuid"
              clickable
              removable
              @remove="deleteTagHandler(tagGuid)"
              @click="attachTagHandler(tagGuid)"
            >
              {{ name }}
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
const {
  mapState: mapServerState,
  mapActions: mapServerActions,
  mapGetters: mapServerGetters
} = createNamespacedHelpers('server')
export default {
  name: 'TagDialog',
  computed: {
    noteTagGuids: function () {
      return this.currentNote?.info?.tags?.split('*') || []
    },
    ...mapServerState(['currentNote', 'tags']),
    ...mapServerGetters(['tagsOfCurrentNote'])
  },
  data () {
    return {
      noteTags: [],
      tagList: []
    }
  },
  methods: {
    /**
     * 筛选函数
     */
    filterHandler (val, update, abort) {
      update(() => {
        if (val === '') {
          this.tagList = this.tags.filter(
            t => !this.tagsOfCurrentNote.map(t => t.tagGuid).includes(t.tagGuid)
          )
        } else {
          const needle = val.toLowerCase()
          this.tagList = this.tags
            .filter(
              t =>
                !this.tagsOfCurrentNote.map(t => t.tagGuid).includes(t.tagGuid)
            )
            .filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    /**
     * 在输入框中创建了一个新的标签时会调用的回调
     */
    newValueHandler: async function (val, done) {
      if (helper.checkTagExistence(this.tags, val)) {
        this.$q.notify({
          color: 'red-10',
          message: this.$t('tagExisted'),
          icon: 'error'
        })
        return
      }
      if (val.length > 0) {
        const createResult = await this.createTag({ name: val })
        await this.attachTag(createResult)
        done(val, 'toggle')
      }
    },
    /**
     * 控制对话框的开合
     */
    toggle: function () {
      if (this.$refs.dialog) {
        this.$refs.dialog.toggle()
      }
    },
    /**
     * 移除输入框中的标签的回调
     */
    removeHandler: async function ({ value }) {
      const tag = this.tagsOfCurrentNote.filter(t => t.name === value)[0]
      await this.removeTag(tag)
    },
    attachTagHandler: async function (tagGuid) {
      if (this.selectStatusHandler(tagGuid)) {
        await this.removeTag({ tagGuid })
        return
      }
      await this.attachTag({ tagGuid })
    },
    deleteTagHandler: async function (tagGuid) {
      this.$q
        .dialog({
          title: this.$t('deleteTag'),
          message: this.$t('deleteTagHint'),
          cancel: {
            label: this.$t('cancel')
          },
          ok: {
            label: this.$t('delete')
          }
        })
        .onOk(() => {
          this.deleteTag({ tagGuid })
        })
    },
    selectStatusHandler: function (tagGuid) {
      return this.tagsOfCurrentNote.map(t => t.tagGuid).includes(tagGuid)
    },
    randomColor: function (tagGuid) {
      if (this.selectStatusHandler(tagGuid)) return 'teal'
      return 'primary'
    },
    /**
     * 添加一个标签之后的回调
     * @param v
     * @returns {*}
     */
    inputHandler: async function (val) {
      this.noteTags = val.map(t => {
        if (typeof t !== 'string') {
          this.attachTagHandler(t.tagGuid)
          return t.name
        }
        return t
      })
    },
    ...mapServerActions([
      'deleteTag',
      'removeTag',
      'attachTag',
      'createTag',
      'deleteTag'
    ])
  },
  watch: {
    tagsOfCurrentNote: function (v) {
      this.noteTags = v.map(t => t.name)
      this.tagList = this.tags?.filter(
        t => !this.tagsOfCurrentNote.map(t => t.tagGuid).includes(t.tagGuid)
      )
    }
  }
}
</script>

<style scoped></style>
