<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <q-item clickable v-close-popup v-ripple @click="rename">
        <q-item-section>{{ $t('rename') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple @click="copyTo">
        <q-item-section>{{ $t('copy') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple @click="moveTo">
        <q-item-section>{{ $t('move') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple @click="exportTo">
        <q-item-section>{{ $t('export') }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple>
        <q-item-section>{{ $t('share') }}</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup v-ripple @click="del">
        <q-item-section class="text-red">{{ $t('delete') }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'NoteItemContextMenu',
  props: {
    rename: {
      types: Function,
      default: () => {}
    },
    del: {
      types: Function,
      default: () => {}
    },
    copyTo: {
      types: Function,
      default: () => {}
    },
    moveTo: {
      types: Function,
      default: () => {}
    },
    exportTo: {
      types: Function,
      default: () => {}
    },
    share: {
      types: Function,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style scoped></style>
