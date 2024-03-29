<template>
  <q-bar
    class="q-electron-drag header text-grey"
    @dblclick="macDoubleClickHandler"
  >
    <q-space v-if="$q.platform.is.mac" />
    <div
      v-if="$q.platform.is.mac && dataLoaded"
      class="header-note-title animated fadeIn"
      style="cursor: pointer"
      :class="{ 'mac': $q.platform.is.mac }"
      @click="$refs.tagDialog.toggle"
    >
      <span class='save-dot' :class="{ 'show': this.noteState !== 'default' }"></span>
      <q-tooltip
        v-if="tags.length > 0"
        :offset="[20, 10]"
        content-class="shadow-4 text-h7 tag-tooltip"
      >
        <q-chip v-for="(tag, index) in tags" :key="index" icon="bookmark">{{
          tag
        }}</q-chip>
      </q-tooltip>
      <span key="title" slot="reference">{{ title }}</span>
    </div>
    <q-space v-if="$q.platform.is.mac" />
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      :title="$t('noteCategory')"
      v-ripple
      @click.stop="
        () => {
          if (isLogin) {
            if (drawerType !== 'category') {
              drawerType = 'category'
              $refs.sideDrawer.show()
            } else $refs.sideDrawer.toggle()
          }
        }
      "
    >
      <q-icon name="account_tree" color="#16A2B8" />
    </q-avatar>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception "
      v-ripple
      :title="$t('tag')"
      @click.stop="
        () => {
          if (isLogin) {
            if (drawerType !== 'tag') {
              drawerType = 'tag'
              $refs.sideDrawer.show()
            } else $refs.sideDrawer.toggle()
          }
        }
      "
    >
      <q-icon name="local_offer" color="#16A2B8" />
    </q-avatar>
    <q-avatar
      size="26px"
      class="cursor-pointer q-electron-drag--exception"
      :title="isLogin ? $t('logout') : $t('login')"
      @click="loginHandler"
      v-ripple
    >
      <img :src="avatarUrl ? avatarUrl : defaultAvatar" />
    </q-avatar>

    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      :title="$t('search')"
      v-ripple
      @click="() => $refs.searchDialog.toggle()"
    >
      <q-icon style="font-size: 1.1em;" name="pageview" />
    </q-avatar>
    <q-space v-if="!$q.platform.is.mac" />
    <div
      v-if="!$q.platform.is.mac && dataLoaded"
      class="header-note-title animated fadeIn q-electron-drag--exception"
      :class="{ 'mac': $q.platform.is.mac }"
      style="cursor: pointer;"
      @click="$refs.tagDialog.toggle"
    >
      <span class="save-dot" :class="{'show': noteState !== 'default'}"></span>
      <!-- <q-icon v-show="noteState !== 'default'" class="note-state-icon" key="icon" name="fiber_manual_record" size="16px" /> -->
      <q-tooltip
        v-if="tags.length > 0"
        :offset="[20, 10]"
        content-class="shadow-4 text-h7 tag-tooltip"
      >
        <q-chip v-for="(tag, index) in tags" :key="index" icon="bookmark">{{
          tag
        }}</q-chip>
      </q-tooltip>
      <span key="title">{{ title }}</span>
    </div>
    <q-space v-if="!$q.platform.is.mac" />
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      :title="$t('switchView')"
      v-ripple
      @click="switchViewHandler"
    >
      <q-icon name="table_chart" />
    </q-avatar>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      :title="$t('settings')"
      v-ripple
      @click="$refs.settingsDialog.toggle()"
    >
      <q-icon name="settings" />
    </q-avatar>
    <div v-if="!$q.platform.is.mac">
      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="crop_square" @click="maximize" />
      <q-btn dense flat icon="close" class="close-button" @click="closeApp" />
    </div>
    <LoginDialog ref="loginDialog" />
    <SettingsDialog ref="settingsDialog" />
    <SearchDialog ref='searchDialog' />
    <TagDialog ref="tagDialog" />
    <SideDrawer ref="sideDrawer" :type="drawerType" />
  </q-bar>
</template>

<script>
import LoginDialog from './ui/dialog/LoginDialog'
import SettingsDialog from './ui/dialog/SettingsDialog'
import SideDrawer from './ui/SideDrawer'
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
import defaultAvatarBase64 from 'src/assets/default-avatar'
import TagDialog from 'components/ui/dialog/TagDialog'
import bus from 'components/bus'
import events from 'src/constants/events'
import SearchDialog from 'components/ui/dialog/SearchDialog'
const {
  mapState: mapServerState,
  mapGetters: mapServerGetters,
  mapActions: mapServerActions
} = createNamespacedHelpers('server')
const {
  mapState: mapClientState,
  mapActions: mapClientActions
} = createNamespacedHelpers('client')
export default {
  name: 'Header',
  computed: {
    ...mapServerState(['user', 'isLogin', 'currentNote', 'noteState']),
    ...mapServerGetters(['avatarUrl', 'tagsOfCurrentNote']),
    ...mapClientState([
      'shrinkInTray',
      'autoLogin',
      'noteListVisible',
      'enablePreviewEditor'
    ]),
    darkMode: function () {
      return this.$q.dark.isActive
    },
    defaultAvatar: function () {
      return defaultAvatarBase64
    },

    title: function () {
      if (this.currentNote.info) {
        let { title } = this.currentNote.info
        if (title.length > 30) {
          title = `${title.substr(0, 9)}...${title.substring(
            title.length - 12
          )}`
        }
        // if (this.noteState !== 'default') {
        //   return `${title} —— ${this.$t(this.noteState)}`
        // }
        return title
      }
      return ''
    },
    dataLoaded: function () {
      return this.currentNote && !helper.isNullOrEmpty(this.currentNote.html)
    },
    popperOptions: function () {
      return {
        placement: 'bottom',
        modifiers: { offset: { offset: '0,10px' } },
        gpuAcceleration: true
      }
    },
    tags: function () {
      return this.tagsOfCurrentNote.map(t => t.name)
    }
  },
  components: { SearchDialog, TagDialog, SideDrawer, SettingsDialog, LoginDialog },
  data () {
    return {
      drawerType: 'category'
    }
  },
  methods: {
    minimize () {
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
    },

    maximize () {
      const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },

    closeApp () {
      // this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      this.$q.electron.remote.app.quit()
    },
    loginHandler: function () {
      if (!this.isLogin) {
        this.$refs.loginDialog.toggle()
      } else {
        this.$q
          .dialog({
            title: this.$t('logout'),
            message: this.$t('logoutHint'),
            cancel: {
              label: this.$t('cancel')
            },
            ok: {
              label: this.$t('logout')
            }
          })
          .onOk(() => {
            this.logout()
          })
      }
    },
    switchViewHandler: function () {
      this.toggleChanged({
        key: 'noteListVisible',
        value: !this.noteListVisible
      })
      this.$refs.sideDrawer.hide()
    },
    macDoubleClickHandler: function () {
      if (this.$q.platform.is.mac) {
        this.maximize()
      }
    },
    ...mapServerActions(['logout', 'getCategoryNotes']),
    ...mapClientActions(['toggleChanged'])
  },
  mounted () {
    if (!this.autoLogin && !this.isLogin) {
      this.$refs.loginDialog.toggle()
    }
    bus.$on(events.VIEW_SHORTCUT_CALL.switchView, this.switchViewHandler)
    bus.$on(events.NOTE_SHORTCUT_CALL.searchNote, () => this.$refs.searchDialog.toggle())
  },
  watch: {
    isLogin: function (currentData) {
      if (!currentData) {
        this.$refs.loginDialog.show()
      }
    }
  }
}
</script>

<style scoped>
.header-note-title {
  display: flex;
  align-items: center;
  margin-left: 0;
}
.header-note-title.mac {
  margin-left: 15%;
}
.header-note-title > span {
  margin-left: 7px;
  letter-spacing: 0.3px;
  font-weight: 600;
}

.close-button:hover {
  background-color: rgba(255, 0, 0, .6);
}

</style>
