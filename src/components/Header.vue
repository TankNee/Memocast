<template>
  <q-bar
    class="q-electron-drag header text-grey"
    @dblclick="macDoubleClickHandler"
  >
    <q-space v-if="$q.platform.is.mac" />
    <div v-if="$q.platform.is.mac && dataLoaded" class="header-note-title animated fadeIn">
        <q-icon key="icon" name="book" size="19px" />
        <span key="title">{{ title }}</span>
    </div>
    <q-space v-if="$q.platform.is.mac" />
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      v-ripple
      @click.stop="
        () => {
          if (isLogin) {
            $refs.categoryDrawer.toggle()
          }
        }
      "
    >
      <q-icon name="account_tree" color="#16A2B8" />
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-accent text-white shadow-4  text-h7"
        >{{ $t('noteCategory') }}
      </q-tooltip>
    </q-avatar>
    <q-avatar
      size="26px"
      class="cursor-pointer q-electron-drag--exception"
      @click="loginHandler"
      v-ripple
    >
      <img
        :src="
          avatarUrl
            ? avatarUrl
            : 'https://i.loli.net/2020/09/25/n3IphqrHxAJemSu.png'
        "
      />
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
    <CategoryDrawer ref="categoryDrawer" />
  </q-bar>
</template>

<script>
import LoginDialog from './ui/dialog/LoginDialog'

import SettingsDialog from './ui/dialog/SettingsDialog'
import CategoryDrawer from './ui/CategoryDrawer'
import { createNamespacedHelpers } from 'vuex'
import helper from 'src/utils/helper'
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
    ...mapServerGetters(['avatarUrl']),
    ...mapClientState(['shrinkInTray', 'autoLogin', 'noteListVisible']),
    darkMode: function () {
      return this.$q.dark.isActive
    },
    title: function () {
      if (this.currentNote.info) {
        const { title } = this.currentNote.info
        if (this.noteState !== 'default') {
          return `${title} —— ${this.$t(this.noteState)}`
        }
        return title
      }
      return ''
    },
    dataLoaded: function () {
      return this.currentNote && !helper.isNullOrEmpty(this.currentNote.html)
    }
  },
  components: { CategoryDrawer, SettingsDialog, LoginDialog },
  data () {
    return {
      searchText: ''
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
