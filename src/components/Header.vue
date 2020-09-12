<template>
  <q-bar dark class="q-electron-drag header text-grey">
    <q-avatar
      size="26px"
      class="cursor-pointer q-electron-drag--exception "
      @click="handleLogin"
      v-ripple
    >
      <img
        :src="
          avatarUrl
            ? avatarUrl
            : 'https://avatars0.githubusercontent.com/u/62432902?s=200&v=4'
        "
      />
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
          @click="searchText = ''"
        />
      </template>
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-amber-2 text-black shadow-4"
        >{{ $t('search') }}
      </q-tooltip>
    </q-input>
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception"
      v-ripple
      @click="$refs.categoryDialog.toggle()"
    >
      <q-icon name="account_tree" color="#16A2B8" />
      <q-tooltip
        :offset="[20, 10]"
        content-class="bg-accent text-white shadow-4"
        >{{ $t('noteCategory') }}
      </q-tooltip>
    </q-avatar>
    <q-space />
    <q-avatar
      size="36px"
      class="cursor-pointer q-electron-drag--exception "
      v-ripple
      @click="$refs.settingsDialog.toggle()"
    >
      <q-icon name="format_list_bulleted" />
      <q-tooltip :offset="[20, 10]" content-class="text-white shadow-4"
        >{{ $t('settings') }}
      </q-tooltip>
    </q-avatar>
    <q-btn dense flat icon="minimize" @click="minimize" />
    <q-btn dense flat icon="crop_square" @click="maximize" />
    <q-btn dense flat icon="close" @click="closeApp" />
    <LoginDialog ref="loginDialog" />
    <SettingsDialog ref="settingsDialog" />
    <SearchDialog ref="searchDialog" />
    <CategoryDialog ref="categoryDialog" />
  </q-bar>
</template>

<script>
import LoginDialog from './ui/LoginDialog'

import SettingsDialog from './ui/SettingsDialog'
import SearchDialog from './ui/SearchDialog'
import CategoryDialog from './ui/CategoryDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('server')
const isElectron = process.env.MODE === 'electron'
export default {
  name: 'Header',
  computed: {
    ...mapState(['user', 'isLogin']),
    ...mapGetters(['avatarUrl']),
    darkMode: function () {
      return this.$q.dark.isActive
    }
  },
  components: { CategoryDialog, SearchDialog, SettingsDialog, LoginDialog },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    minimize () {
      if (isElectron) {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (isElectron) {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (isElectron) {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
    handleLogin: function () {
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
    ...mapActions(['logout'])
  }
}
</script>

<style scoped></style>
