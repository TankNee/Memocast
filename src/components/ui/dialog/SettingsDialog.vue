<template>
  <q-dialog ref="dialog" persistent>
    <q-card style="height: 70vh;min-width: 70vw">
      <q-toolbar>
        <q-avatar>
          <q-icon
            name="settings"
            class="text-primary"
            style="font-size: 1.8em"
          />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-weight-bold">{{ $t('settings') }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="scroll">
        <q-splitter v-model="splitterModel" style="height: 55vh">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal no-border">
              <q-tab
                name="general"
                icon="tune"
                :label="$t('general')"
                class="text-primary"
              />
              <q-tab
                name="editor"
                icon="edit_attributes"
                :label="$t('editor')"
                class="text-amber-10"
              />
              <q-tab
                name="server"
                icon="storage"
                :label="$t('server')"
                class="text-red-7"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="general">
                <div class="text-h4 q-mb-md">{{ $t('general') }}</div>
                <q-separator />
                <div>
                  <div class="text-h5 q-mb-md setting-item">
                    {{ $t('language') }}
                  </div>
                  <q-select
                    :value="$t(language)"
                    :options="languageOptions"
                    @input="languageChangeHandler"
                  />
                </div>
                <div>
                  <div class="text-h5 q-mb-md setting-item">
                    <span>{{ $t('darkMode') }}</span>
                    <q-toggle
                      :value="darkMode"
                      color="black"
                      @input="v => toggleDarkMode(v)"
                    />
                  </div>
                </div>
                <q-separator />
                <div>
                  <div class="text-h5 q-mb-md setting-item fa-align-center">
                    <span>{{ $t('currentVersion', { version }) }}</span>
                    <q-btn
                      class="fab-btn"
                      flat
                      round
                      color="primary"
                      icon="cached"
                      @click="checkUpdateHandler"
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="editor">
                <div class="text-h4 q-mb-md">{{ $t('editor') }}</div>
                <q-separator />
                <div>
                  <div class="text-h5 q-mb-md setting-item">
                    <span>{{ $t('imageUploadService') }}</span>
                    <q-select
                      :value="$t(imageUploadService)"
                      :options="imageUploadServiceOptions"
                      @input="imageUploadServiceChangeHandler"
                    >
                      <template v-slot:after>
                        <q-btn
                          v-if="imageUploadService === 'customWebUploadService'"
                          round
                          dense
                          flat
                          icon="settings"
                          @click="$refs.imageUploadServiceDialog.toggle()"
                        />
                      </template>
                    </q-select>
                  </div>
                  <div class="text-h5 q-mb-md setting-item">
                    <span>{{ $t('codeTheme') }}</span>
                    <q-icon
                      name="launch"
                      color="primary"
                      style="margin-left: 5px"
                      class="cursor-pointer"
                      @click="
                        () =>
                          $q.electron.shell.openExternal(
                            'https://xyproto.github.io/splash/docs/longer/all.html?utm_source=ld246.com'
                          )
                      "
                    />
                  </div>
                  <q-separator />
                  <div class="text-h6 q-mb-md setting-item">
                    <span>{{ $t('lightCodeTheme') }}</span>
                    <q-select
                      :value="lightCodeTheme"
                      :options="codethems"
                      @input="v => codeThemeChangeHandler(v, true)"
                    >
                    </q-select>
                  </div>
                  <div class="text-h6 q-mb-md setting-item">
                    <span>{{ $t('darkCodeTheme') }}</span>
                    <q-select
                      :value="darkCodeTheme"
                      :options="codethems"
                      @input="v => codeThemeChangeHandler(v, false)"
                    >
                    </q-select>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="server">
                <div class="text-h4 q-mb-md">{{ $t('server') }}</div>
                <q-separator />
                <div>
                  <div class="text-h5 q-mb-md setting-item">
                    <span>{{ $t('markdownOnly') }}</span>
                    <q-toggle
                      :value="markdownOnly"
                      color="primary"
                      @input="
                        v => toggleChanged({ key: 'markdownOnly', value: v })
                      "
                    />
                  </div>
                </div>
                <q-separator />
                <div>
                  <div class="text-h5 q-mb-md setting-item">
                    <span>{{ $t('flomo') }}</span>
                    <q-icon
                      name="settings"
                      color="primary"
                      style="margin-left: 5px"
                      class="cursor-pointer"
                      @click="flomoSettingHandler"
                    />
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
    <ImageUploadServiceDialog ref="imageUploadServiceDialog" />
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ImageUploadServiceDialog from './ImageUploadServiceDialog'
import { i18n } from 'boot/i18n'
import { version } from '../../../../package.json'
import codethems from '../../../constants/codethems'
import VditorPreview from 'vditor/dist/method.min'

const { mapState, mapActions } = createNamespacedHelpers('client')

export default {
  name: 'SettingsDialog',
  components: { ImageUploadServiceDialog },
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
      'lightCodeTheme',
      'darkCodeTheme',
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
    },
    codethems: function () {
      return codethems
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
    codeThemeChangeHandler: function (v, light) {
      if (light) {
        this.updateStateAndStore({ lightCodeTheme: v })
      } else {
        this.updateStateAndStore({ darkCodeTheme: v })
      }
    },
    checkUpdateHandler: async function () {
      // eslint-disable-next-line camelcase
      const { tag_name, html_url, body, author: { avatar_url } } = await this.getLatestVersion()
      const latestVersion = tag_name.replace('v', '')
      const that = this

      if (version !== latestVersion) {
        VditorPreview.md2html(body).then(bodyContent => {
          this.$q.notify({
            message: bodyContent,
            color: 'primary',
            actions: [
              {
                label: that.$t('update'),
                color: 'white',
                handler: () => {
                  that.$q.electron.shell.openExternal(html_url)
                }
              }
            ],
            caption: that.$t('getNewerVersion', { version: latestVersion }),
            avatar: avatar_url,
            html: true,
            multiLine: true
          })
        }).catch(err => {
          console.log(err)
          this.$q.notify({
            message: body,
            color: 'primary',
            actions: [
              {
                label: that.$t('update'),
                color: 'white',
                handler: () => {
                  that.$q.electron.shell.openExternal(html_url)
                }
              }
            ],
            caption: that.$t('getNewerVersion', { version: latestVersion }),
            avatar: avatar_url,
            html: true,
            multiLine: true
          })
        })
      } else {
        this.$q.notify({
          message: that.$t('noNewerVersion'),
          color: 'green',
          icon: 'check'
        })
      }
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
      'getLatestVersion'
    ])
  }
}
</script>

<style scoped>
.setting-item {
  margin-top: 2rem;
}
</style>
