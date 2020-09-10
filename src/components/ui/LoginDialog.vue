<template>
  <q-dialog ref="dialog" @before-hide="beforeHideHandler" class="login-dialog">
    <q-card class="q-dialog login-dialog">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">{{
            $t('login')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent.stop="submitHandler" class="q-gutter-md">
          <q-input
            dense
            debounce="500"
            v-model="username"
            ref="username"
            autofocus
            :label="$t('username')"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck="false"
          />
          <q-input
            dense
            clearable
            debounce="500"
            v-model="password"
            ref="password"
            :label="$t('password')"
            type="password"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck="false"
          />
          <q-toggle
            :value="enableSelfHostServer"
            :label="$t('selfHostEnable')"
            class="login-toggle"
            @input="
              v => toggleChanged({ key: 'enableSelfHostServer', value: v })
            "
          />
          <q-input
            debounce="500"
            v-if="enableSelfHostServer"
            dense
            v-model="selfHostServer"
            :label="$t('selfHostServer')"
            :rules="[
              val => (enableSelfHostServer && !!val) || $t('fieldIsRequired')
            ]"
            spellcheck="false"
          />
          <div class="no-margin">
            <q-toggle
              :value="rememberPassword"
              :label="$t('rememberPassword')"
              class="login-toggle"
              @input="v => toggleChanged({ key: 'rememberPassword', value: v })"
            />
            <q-toggle
              :value="autoLogin"
              :label="$t('autoLogin')"
              class="login-toggle"
              @input="v => toggleChanged({ key: 'autoLogin', value: v })"
            />
          </div>

          <div>
            <q-btn :label="$t('submit')" type="submit" color="primary" />
            <q-btn
              :label="$t('cancel')"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
      <Loading :visible="isLoading" />
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from './Loading'
import fileStorage from '../../utils/fileStorage'
const { mapActions: mapServerActions } = createNamespacedHelpers('server')
const {
  mapState: mapClientState,
  mapActions: mapClientActions
} = createNamespacedHelpers('client')
export default {
  name: 'LoginDialog',
  components: { Loading },
  data () {
    return {
      username: '',
      password: '',
      selfHostServer: '',
      isLoading: false
    }
  },
  computed: {
    ...mapClientState(['rememberPassword', 'autoLogin', 'enableSelfHostServer'])
  },
  methods: {
    submitHandler: async function () {
      this.isLoading = true
      const loginPayload = {
        userId: this.username,
        password: this.password,
        url: this.enableSelfHostServer ? this.selfHostServer : null
      }
      try {
        await this.login(loginPayload)
        this.toggle()
      } finally {
        this.isLoading = false
      }
    },
    beforeHideHandler: function () {
      this.username = null
      this.password = null
      this.selfHostServer = null
    },
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    ...mapServerActions(['login', 'getCategoryNotes']),
    ...mapClientActions(['toggleChanged'])
  },
  created () {
    const [userId, password, url] = fileStorage.getItemsFromStore([
      'userId',
      'password',
      'url'
    ])
    this.username = userId
    this.password = password
    this.selfHostServer = url
  }
}
</script>

<style scoped>
.login-dialog {
  width: 500px !important;
  max-width: 50vw;
}
.login-toggle {
  margin-left: 10px;
}
</style>
