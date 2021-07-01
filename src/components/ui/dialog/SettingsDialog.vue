<template>
  <q-dialog ref='dialog' persistent>
    <q-card style='height: 70vh;min-width: 70vw'>
      <q-toolbar>
        <q-avatar>
          <q-icon
            name='settings'
            class='text-primary'
            style='font-size: 1.8em'
          />
        </q-avatar>
        <q-toolbar-title>
          <span class='text-weight-bold'>{{ $t('settings') }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon='close' v-close-popup />
      </q-toolbar>

      <q-card-section class='scroll hide-scrollbar'>
        <q-splitter v-model='splitterModel' style='height: 55vh' after-class='hide-scrollbar'>
          <template v-slot:before>
            <q-tabs v-model='tab' vertical class='text-teal no-border'>
              <q-tab
                name='general'
                icon='tune'
                :label="$t('general')"
                class='text-primary'
              />
              <q-tab
                name='editor'
                icon='edit_attributes'
                :label="$t('editor')"
                class='text-amber-10'
              />
              <q-tab
                name='server'
                icon='storage'
                :label="$t('server')"
                class='text-red-7'
              />
            </q-tabs>
          </template>

          <template v-slot:after class='hide-scrollbar'>
            <q-tab-panels
              v-model='tab'
              animated
              swipeable
              vertical
              transition-prev='jump-up'
              transition-next='jump-up'
            >
              <q-tab-panel name='general'>
                <div class='text-h4 q-mb-md'>{{ $t('general') }}</div>
                <q-separator />
                <div>
                  <div class='text-h5 q-mb-md setting-item'>
                    {{ $t('language') }}
                  </div>
                  <q-select
                    :value='$t(language)'
                    :options='languageOptions'
                    @input='languageChangeHandler'
                  />
                </div>
                <div>
                  <div class='text-h5 q-mb-md setting-item'>
                    <span>{{ $t('darkMode') }}</span>
                    <q-toggle
                      :value='darkMode'
                      color='black'
                      @input='v => toggleDarkMode(v)'
                    />
                  </div>
                </div>
                <q-separator />
                <div>
                  <div class='text-h5 q-mb-md setting-item fa-align-center'>
                    <span>{{ $t('currentVersion', { version }) }}</span>
                    <q-btn
                      class='fab-btn'
                      flat
                      round
                      color='primary'
                      icon='cached'
                      @click='checkUpdateHandler'
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name='editor'>
                <div class='text-h4 q-mb-md'>{{ $t('editor') }}</div>
                <q-separator />
                <div>
                  <div class='text-h5 q-mb-md setting-item'>
                    <span>{{ $t('imageUploadService') }}</span>
                    <q-select
                      :value='$t(imageUploadService)'
                      :options='imageUploadServiceOptions'
                      @input='imageUploadServiceChangeHandler'
                    >
                      <template v-slot:after>
                        <q-btn
                          v-if="imageUploadService === 'customWebUploadService'"
                          round
                          dense
                          flat
                          icon='settings'
                          @click='$refs.imageUploadServiceDialog.toggle()'
                        />
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name='server'>
                <div class='text-h4 q-mb-md'>{{ $t('server') }}</div>
                <q-separator />
                <div>
                  <div class='text-h5 q-mb-md setting-item'>
                    <span>{{ $t('markdownOnly') }}</span>
                    <q-toggle
                      :value='markdownOnly'
                      color='primary'
                      @input="
                        v => toggleChanged({ key: 'markdownOnly', value: v })
                      "
                    />
                  </div>
                </div>
                <q-separator />
                <div>
                  <div class='text-h5 q-mb-md setting-item'>
                    <span>{{ $t('flomo') }}</span>
                    <q-icon
                      name='settings'
                      color='primary'
                      style='margin-left: 5px'
                      class='cursor-pointer'
                      @click='flomoSettingHandler'
                    />
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
    <ImageUploadServiceDialog ref='imageUploadServiceDialog' />
    <UpdateDialog ref='updateDialog' />
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ImageUploadServiceDialog from './ImageUploadServiceDialog'
import UpdateDialog from 'components/ui/dialog/UpdateDialog'
import { i18n } from 'boot/i18n'
import bus from 'components/bus'
import events from 'src/constants/events'
import { version } from '../../../../package.json'
import { needUpdate } from 'src/ApiInvoker'

const {
  mapState,
  mapActions
} = createNamespacedHelpers('client')

export default {
  name: 'SettingsDialog',
  components: {
    ImageUploadServiceDialog,
    UpdateDialog
  },
  data () {
    return {
      tab: 'general',
      splitterModel: 20,
      imageUploadServiceOptionsPlain: [
        'wizOfficialImageUploadService',
        'customWebUploadService',
        'smmsImageUploadService'
      ],
      version: version
    }
  },
  computed: {
    ...mapState([
      'language',
      'darkMode',
      'markdownOnly',
      'imageUploadService',
      'flomoApiUrl'
    ]),
    languageOptions: function () {
      return i18n.availableLocales.map(l => i18n.t(l))
    },
    imageUploadServiceOptions: function () {
      return [
        this.$t('wizOfficialImageUploadService'),
        this.$t('customWebUploadService'),
        this.$t('smmsImageUploadService')
      ]
    }
  },
  methods: {
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    languageChangeHandler: function (lan) {
      lan = i18n.availableLocales.find(l => {
        return i18n.t(l) === lan
      })
      this.updateStateAndStore({ language: lan })
      i18n.locale = lan
    },
    imageUploadServiceChangeHandler: function (service) {
      const servicePlain = this.imageUploadServiceOptionsPlain.find(
        i => this.$t(i) === service
      )
      this.updateStateAndStore({ imageUploadService: servicePlain })
    },
    checkUpdateHandler: function () {
      this.checkUpdate()
    },
    updateAvailableHandler: function (info) {
      console.log(info)
      // this.$refs.updateDialog.toggle()
      this.$q.notify({
        caption: this.$t('getNewerVersion', { version: info.version }),
        message: info.releaseNotes,
        actions: [
          {
            label: this.$t('update'),
            color: 'white',
            handler: () => {
              if (this.$q.platform.is.mac) {
                window.open('https://github.com/TankNee/Memocast')
              } else {
                needUpdate(true)
                this.$refs.updateDialog.toggle()
              }
            }
          }
        ]
      })
    },
    updateUnavailableHandler: function (info) {
      console.log(info)
      this.$q.notify({
        message: this.$t('noNewerVersion'),
        color: 'green',
        icon: 'check'
      })
    },
    updateErrorHandler: function (err) {
      this.$q.notify({
        caption: this.$t('updateError'),
        color: 'red-10',
        icon: 'error',
        message: err
      })
    },
    flomoSettingHandler: async function () {
      this.$q.dialog({
        prompt: {
          model: this.flomoApiUrl
        },
        title: this.$t('flomo'),
        ok: {
          label: this.$t('submit')
        },
        cancel: {
          label: this.$t('cancel')
        }
      }).onOk(data => {
        this.updateStateAndStore({ flomoApiUrl: data })
      })
      // this.$q.electron.shell.openExternal(
      //   'https://flomoapp.com/mine?source=incoming_webhook'
      // )
    },
    ...mapActions([
      'toggleDarkMode',
      'toggleChanged',
      'updateStateAndStore',
      'checkUpdate'
    ])
  },
  mounted () {
    bus.$on(events.UPDATE_EVENTS.UPDATE_AVAILABLE, this.updateAvailableHandler)
    bus.$on(events.UPDATE_EVENTS.UPDATE_NOT_AVAILABLE, this.updateUnavailableHandler)
    bus.$on(events.UPDATE_EVENTS.UPDATE_NOT_AVAILABLE, this.updateErrorHandler)
  }
}
</script>

<style scoped>
.setting-item {
  margin-top: 2rem;
}
</style>
