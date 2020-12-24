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
      @click="$refs.tagDialog.toggle"
    >
      <q-icon key="icon" name="book" size="19px" />
      <q-tooltip
        v-if="tags.length > 0"
        :offset="[20, 10]"
        content-class="shadow-4 text-h7"
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
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-accent text-white shadow-4 text-h7"
        >{{ $t('noteCategory') }}
      </q-tooltip>
    </q-avatar>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception "
      v-ripple
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
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-amber-6 text-white shadow-4  text-h7"
        >{{ $t('tag') }}
      </q-tooltip>
    </q-avatar>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      v-ripple
      @click.stop="
        () => {
          toggleChanged({ key: 'enableVditor', value: !enableVditor })
        }
      "
    >
      <q-icon :name="enableVditor ? 'lock_open' : 'lock'" color="#16A2B8" />
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-amber-9 text-white shadow-4  text-h7"
        >{{ enableVditor ? $t('lock') : $t('unlock') }}
      </q-tooltip>
    </q-avatar>
    <q-avatar
      size="26px"
      class="cursor-pointer q-electron-drag--exception"
      @click="loginHandler"
      v-ripple
    >
      <img :src="avatarUrl ? avatarUrl : defaultAvatar" />
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-green-7 text-white shadow-4 text-h7"
        >{{ isLogin ? $t('logout') : $t('login') }}
      </q-tooltip>
    </q-avatar>
    <q-input
      dark
      dense
      borderless
      v-model="searchText"
      input-class="text-right text-grey"
      class="q-ml-md q-electron-drag--exception search-input"
      ref="searchInput"
      style="width: 100px"
      spellcheck="false"
      @keydown.enter="searchNoteHandler"
    >
      <template v-slot:append>
        <q-icon
          class="text-grey cursor-pointer"
          size="19px"
          v-if="searchText === ''"
          name="search"
          @click="$refs.searchInput.focus()"
        />
        <q-icon
          size="19px"
          v-else
          name="clear"
          class="cursor-pointer text-grey"
          @click="clearInputHandler"
        />
      </template>
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-amber-2 text-black shadow-4  text-h7"
        >{{ $t('search') }}
      </q-tooltip>
    </q-input>
    <q-space v-if="!$q.platform.is.mac" />
    <div
      v-if="!$q.platform.is.mac && dataLoaded"
      class="header-note-title animated fadeIn"
      style="cursor: pointer"
      @click="$refs.tagDialog.toggle"
    >
      <q-icon key="icon" name="book" size="19px" />
      <q-tooltip
        v-if="tags.length > 0"
        :offset="[20, 10]"
        content-class="shadow-4 text-h7"
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
      class="cursor-pointer q-electron-drag--exception "
      v-ripple
      @click="switchViewHandler"
    >
      <q-icon name="table_chart" />
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-brown-4 text-white shadow-4 text-h7"
        >{{ $t('switchView') }}
      </q-tooltip>
    </q-avatar>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception "
      v-ripple
      @click="$refs.settingsDialog.toggle()"
    >
      <q-icon name="settings" />
      <q-tooltip :offset="[20, 10]" content-class="text-white shadow-4 text-h7"
        >{{ $t('settings') }}
      </q-tooltip>
    </q-avatar>
    <div v-if="!$q.platform.is.mac">
      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="crop_square" @click="maximize" />
      <q-btn dense flat icon="close" @click="closeApp" />
    </div>
    <LoginDialog ref="loginDialog" />
    <SettingsDialog ref="settingsDialog" />
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
      'enableVditor'
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
        if (this.noteState !== 'default') {
          return `${title} —— ${this.$t(this.noteState)}`
        }
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
  components: { TagDialog, SideDrawer, SettingsDialog, LoginDialog },
  data () {
    return {
      searchText: '',
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
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
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
    searchNoteHandler: function () {
      if (helper.isNullOrEmpty(this.searchText)) return
      this.searchNote(this.searchText)
    },
    switchViewHandler: function () {
      this.toggleChanged({
        key: 'noteListVisible',
        value: !this.noteListVisible
      })
    },
    clearInputHandler: function () {
      this.searchText = ''
      this.getCategoryNotes({ category: this.currentCategory })
    },
    macDoubleClickHandler: function () {
      if (this.$q.platform.is.mac) {
        this.maximize()
      }
    },
    ...mapServerActions(['logout', 'searchNote', 'getCategoryNotes']),
    ...mapClientActions(['toggleChanged'])
  },
  mounted () {
    if (!this.autoLogin && !this.isLogin) {
      this.$refs.loginDialog.toggle()
    }
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
  margin-left: 20%;
}
.header-note-title > span {
  font-weight: bold;
  font-family: Monaco, Consolas;
  margin-left: 7px;
}
</style>
