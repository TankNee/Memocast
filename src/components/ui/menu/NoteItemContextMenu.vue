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
      <q-item clickable  v-ripple>
        <q-item-section>{{ $t('export') }}</q-item-section>
        <q-item-section side>
          <q-icon color="primary" name="navigate_next"></q-icon>
        </q-item-section>
        <q-menu anchor="top end" self="top start">
          <q-list dense>
            <q-item clickable v-close-popup v-ripple @click="exportToMarkdown">
              <q-item-section>Markdown</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-ripple @click="exportToPdf">
              <q-item-section>PDF</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-item clickable v-close-popup v-ripple @click="flomo">
        <q-item-section>{{ $t('flomo') }}</q-item-section>
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
    exportToMarkdown: {
      types: Function,
      default: () => {}
    },
    exportToPdf: {
      types: Function,
      default: () => {}
    },
    flomo: {
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
