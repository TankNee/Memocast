<template>
  <q-dialog ref='dialog' class='base-dialog' persistent>
    <q-card class='q-dialog base-dialog'>
      <q-toolbar>
        <q-icon
          name='people'
          class='text-primary'
          style='font-size: 1.8em'
        />
        <q-toolbar-title
        ><span class='text-weight-bold'>{{
            $t('login')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense color='red-10' icon='power_settings_new' @click='quitHandler'>
          <q-tooltip
            :offset='[20, 10]'
            :content-class='`bg-${color} text-white shadow-4  text-h7`'
          >{{ $q.platform.is.mac ? $t('quit') : $t('close') }}
          </q-tooltip
          >
        </q-btn>
      </q-toolbar>

      <q-card-section class='q-pt-none'>
        <q-form @submit.prevent.stop='submitHandler' class='q-gutter-md'>
          <q-input
            dense
            debounce='500'
            v-model='username'
            ref='username'
            autofocus
            :label="$t('username')"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck='false'
          />
          <q-input
            dense
            clearable
            debounce='500'
            v-model='password'
            ref='password'
            :label="$t('password')"
            :type="showPassword ? 'text' : 'password'"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck='false'
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class='cursor-pointer'
                style='margin-right: 5px'
                @click='showPassword = !showPassword'
              />
            </template>
          </q-input>
          <q-toggle
            :value='enableSelfHostServer'
            :label="$t('selfHostEnable')"
            class='login-toggle'
            @input="
              v => toggleChanged({ key: 'enableSelfHostServer', value: v })
            "
          />
          <q-input
            debounce='500'
            v-if='enableSelfHostServer'
            dense
            v-model='selfHostServer'
            :label="$t('selfHostServer')"
            :rules="[
              val => (enableSelfHostServer && !!val) || $t('fieldIsRequired')
            ]"
            spellcheck='false'
          />
          <div class='no-margin'>
            <q-toggle
              :value='rememberPassword'
              :label="$t('rememberPassword')"
              class='login-toggle'
              @input="v => toggleChanged({ key: 'rememberPassword', value: v })"
            />
            <q-toggle
              :value='autoLogin'
              :label="$t('autoLogin')"
              class='login-toggle'
              @input="v => toggleChanged({ key: 'autoLogin', value: v })"
            />
          </div>
          <div class='flex' style='flex-direction: column;'>
            <q-btn
              class='fab-btn'
              :label="$t('signIn')"
              type='submit'
              color='primary'
            />
            <q-btn
              class='fab-btn'
              :label="$t('signUp')"
              @click='signUpHandler'
              color='green'
            />
          </div>
        </q-form>
      </q-card-section>
      <Loading :visible='isLoading' />
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from '../Loading'
import helper from '../../../utils/helper'
import ClientFileStorage from 'src/utils/storage/ClientFileStorage'

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
      isLoading: false,
      showPassword: false
    }
  },
  computed: {
    color: function () {
      return this.$q.dark.isActive ? 'warning' : 'primary'
    },
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
    quitHandler: function () {
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      // this.$q.electron.remote.app.quit()
    },
    signUpHandler: function () {
      this.$q.electron.shell.openExternal(
        `${!(helper.isNullOrEmpty(this.selfHostServer) || !this.enableSelfHostServer) ? this.selfHostServer : 'https://wiz.cn'}/signup`
      )
    },
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    show: function () {
      return this.$refs.dialog.show()
    },
    ...mapServerActions(['login', 'getCategoryNotes']),
    ...mapClientActions(['toggleChanged'])
  },
  created () {
    const [userId, password, url] = ClientFileStorage.getItemsFromStore([
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
.login-toggle {
  margin-left: 10px;
}
</style>
