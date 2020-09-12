<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="statics/wiz.png" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold">Quasar</span>
          Framework</q-toolbar-title
        >

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SearchDialog',
  methods: {
    toggle: function () {
      this.$refs.dialog.toggle()
    }
  }
}
</script>

<style scoped></style>
