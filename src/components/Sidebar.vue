<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="400"
    :mini="true"
  >
    <div
      class="absolute-top"
      style="height: 150px;"
    >
      <div class="bg-transparent user-avatar">
        <q-avatar
          size="43px"
          class="q-mb-sm cursor-pointer text-white "
          @click="handleLogin"
        >
          <img :src="avatarUrl ? avatarUrl : 'https://avatars0.githubusercontent.com/u/62432902?s=200&v=4'" />
        </q-avatar>
      </div>
    </div>
    <q-scroll-area
      style="height: calc(100% - 150px); margin-top: 150px;"
    >
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="import_contacts" />
          </q-item-section>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-amber text-black shadow-4"
            >{{ $t('noteEditor') }}</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="loyalty" />
          </q-item-section>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-primary text-white shadow-4"
            >{{ $t('tags') }}</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple @click="$refs.categoryDialog.toggle()">
          <q-item-section avatar>
            <q-icon name="account_tree" />
          </q-item-section>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-accent text-white shadow-4"
            >{{ $t('noteCategory') }}</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple @click="$refs.searchDialog.toggle()">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="bg-amber-2 text-black shadow-4"
            >{{ $t('search') }}</q-tooltip
          >
        </q-item>

        <q-item clickable v-ripple @click="$refs.settingsDialog.toggle()">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[20, 10]"
            content-class="text-white shadow-4"
            >{{ $t('settings') }}</q-tooltip
          >
        </q-item>
      </q-list>
    </q-scroll-area>
    <LoginDialog ref="loginDialog" />
    <SettingsDialog ref="settingsDialog" />
    <SearchDialog ref="searchDialog" />
    <CategoryDialog ref="categoryDialog" />
  </q-drawer>
</template>

<script>
import LoginDialog from './ui/LoginDialog'
import { createNamespacedHelpers } from 'vuex'
import SettingsDialog from './ui/SettingsDialog'
import SearchDialog from './ui/SearchDialog'
import CategoryDialog from './ui/CategoryDialog'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('server')
export default {
  name: 'Sidebar',
  components: { CategoryDialog, SearchDialog, SettingsDialog, LoginDialog },
  computed: {
    ...mapState(['user', 'isLogin']),
    ...mapGetters(['avatarUrl'])
  },
  data () {
    return {
      drawer: false,
      showLoginDialog: false
    }
  },
  methods: {
    handleLogin: function () {
      if (!this.isLogin) {
        this.$refs.loginDialog.toggle()
      } else {
        this.$q.dialog({
          title: this.$t('logout'),
          message: this.$t('logoutHint'),
          cancel: {
            label: this.$t('cancel')
          },
          ok: {
            label: this.$t('logout')
          }
        }).onOk(() => {
          this.logout()
        })
      }
    },
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
.user-avatar {
  position: unset;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
