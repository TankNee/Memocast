<template>
  <q-dialog ref="dialog" @before-hide="beforeHideHandler" class="login-dialog">
    <q-card class="q-dialog login-dialog">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">{{$t('login')}}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent.stop="submitHandler" class="q-gutter-md">
          <q-input dense v-model="username" ref="username" autofocus :label="$t('username')" />
          <q-input dense v-model="password" ref="password" :label="$t('password')" type="password" />
          <q-toggle v-model="isSelfHost" :label="isSelfHost ? $t('selfHostDisable') : $t('selfHostEnable')" class="login-toggle"/>
          <q-input
            v-if="isSelfHost"
            dense
            v-model="selfHostServer"
            :label="$t('selfHostServer')"
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
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'LoginDialog',
  data () {
    return {
      username: '',
      password: '',
      selfHostServer: '',
      isSelfHost: false
    }
  },
  methods: {
    submitHandler: async function () {
      // this.$refs.username.validate()
      const loginPayload = {
        userId: this.username,
        password: this.password,
        url: this.isSelfHost ? this.selfHostServer : ''
      }
      const result = await this.login(loginPayload)
      console.log(result)
    },
    beforeHideHandler: function () {
      this.username = null
      this.password = null
      this.selfHostServer = null
    },
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    ...mapActions(['login'])
  }
}
</script>

<style scoped>
  .login-dialog{
    width: 500px !important;
    max-width: 50vw;
  }
  .login-toggle{
    margin-left: 4px;
  }
</style>
