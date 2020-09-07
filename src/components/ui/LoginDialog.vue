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
          />
          <q-toggle
            v-model="isSelfHost"
            :label="isSelfHost ? $t('selfHostDisable') : $t('selfHostEnable')"
            class="login-toggle"
          />
          <q-input
            debounce="500"
            v-if="isSelfHost"
            dense
            v-model="selfHostServer"
            :label="$t('selfHostServer')"
            :rules="[val => isSelfHost&&!!val || $t('fieldIsRequired')]"
          />

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
      <Loading :visible="isLoading"/>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loading from './Loading'
import bus from '../bus'
import events from '../../constants/events'
const { mapActions: mapServerActions } = createNamespacedHelpers('server')
export default {
  name: 'LoginDialog',
  components: { Loading },
  data () {
    return {
      username: '',
      password: '',
      selfHostServer: '',
      isSelfHost: false,
      isLoading: false
    }
  },
  methods: {
    submitHandler: async function () {
      this.isLoading = true
      const loginPayload = {
        userId: this.username,
        password: this.password,
        url: this.isSelfHost ? this.selfHostServer : ''
      }
      try {
        const result = await this.login(loginPayload)
        await this.getCurrentFolderNotes({ category: '', kbGuid: result.kbGuid })
        this.toggle()
        bus.$emit(events.LOGIN_SUCCESSFULLY)
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
    ...mapServerActions(['login', 'getCurrentFolderNotes'])
  }
}
</script>

<style scoped>
.login-dialog {
  width: 500px !important;
  max-width: 50vw;
}
.login-toggle {
  margin-left: 4px;
}
</style>
