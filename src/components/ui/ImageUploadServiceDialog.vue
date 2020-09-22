<template>
  <q-dialog ref="dialog" class="base-dialog">
    <q-card class="q-dialog base-dialog">
      <q-toolbar>
        <q-toolbar-title
          ><span class="text-weight-bold">{{
            $t('imageUploadService')
          }}</span></q-toolbar-title
        >
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent.stop="submitHandler" class="q-gutter-md">
          <q-input
            dense
            debounce="500"
            v-model="tempApiServerUrl"
            autofocus
            clearable
            :label="$t('apiServerUrl')"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck="false"
          />
          <q-input
            dense
            clearable
            debounce="500"
            v-model="tempPostParam"
            :label="$t('postParam')"
            :rules="[val => !!val || $t('fieldIsRequired')]"
            spellcheck="false"
          />
          <q-input
            dense
            clearable
            debounce="500"
            v-model="tempJSONPath"
            :label="$t('jsonPath')"
            spellcheck="false"
          />
          <q-input
            dense
            clearable
            debounce="500"
            v-model="tempCustomHeader"
            :label="$t('customHeader')"
            spellcheck="false"
          />
          <q-input
            dense
            clearable
            debounce="500"
            v-model="tempCustomBody"
            :label="$t('customBody')"
            spellcheck="false"
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
const { mapState, mapActions } = createNamespacedHelpers('client')
export default {
  name: 'ImageUploadServiceDialog',
  computed: {
    ...mapState([
      'apiServerUrl',
      'postParam',
      'jsonPath',
      'customHeader',
      'customBody'
    ])
  },
  data () {
    return {
      tempApiServerUrl: '',
      tempPostParam: '',
      tempJSONPath: '',
      tempCustomHeader: '',
      tempCustomBody: ''
    }
  },
  methods: {
    submitHandler: function () {
      const {
        tempApiServerUrl,
        tempPostParam,
        tempJSONPath,
        tempCustomHeader,
        tempCustomBody
      } = this
      this.updateStateAndStore({
        apiServerUrl: tempApiServerUrl,
        postParam: tempPostParam,
        jsonPath: tempJSONPath,
        customHeader: tempCustomHeader,
        customBody: tempCustomBody
      })
      this.toggle()
    },
    toggle: function () {
      return this.$refs.dialog.toggle()
    },
    ...mapActions(['updateStateAndStore'])
  },
  mounted () {
    this.tempApiServerUrl = this.apiServerUrl
    this.tempPostParam = this.postParam
    this.tempJSONPath = this.jsonPath
    this.tempCustomHeader = this.customHeader
    this.tempCustomBody = this.customBody
  }
}
</script>

<style scoped></style>
