<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="400"
    :mini="miniState"
  >
    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" height="150px">
      <div class="bg-transparent user-avatar">
        <q-avatar :size="miniState ? '40px' : '56px'" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </div>
    </q-img>
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox"/>
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item>

        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star"/>
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="drafts"/>
          </q-item-section>

          <q-item-section>
            Drafts
          </q-item-section>
        </q-item>
      </q-list>

    </q-scroll-area>
    <q-fab
      color="secondary"
      push
      icon="keyboard_arrow_right"
      @click="miniState = !miniState"
      active-icon="keyboard_arrow_left"
      class="absolute-bottom-right"
      flat
    ></q-fab>
  </q-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      drawer: false,
      miniState: true
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
