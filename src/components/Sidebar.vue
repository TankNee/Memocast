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
      style="height: 150px;border-right: 1px solid #DDDDDD"
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
      style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
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

        <q-item clickable v-ripple>
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

        <q-item clickable v-ripple>
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

        <q-item clickable v-ripple @click="handleSettings">
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
  </q-drawer>
</template>

<script>
import LoginDialog from './ui/LoginDialog'
import { createNamespacedHelpers } from 'vuex'
import SettingsDialog from './ui/SettingsDialog'
const { mapState, mapGetters } = createNamespacedHelpers('server')
export default {
  name: 'Sidebar',
  components: { SettingsDialog, LoginDialog },
  computed: {
    ...mapState(['user']),
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
      this.$refs.loginDialog.toggle()
    },
    handleSettings: function () {
      this.$refs.settingsDialog.toggle()
    }
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
