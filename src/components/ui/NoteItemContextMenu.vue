<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <q-item clickable v-close-popup v-ripple @click="rename">
        <q-item-section>{{$t('rename')}}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple>
        <q-item-section>{{$t('copyTo')}}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple>
        <q-item-section>{{$t('moveTo')}}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-ripple>
        <q-item-section>{{$t('share')}}</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup v-ripple>
        <q-item-section class="text-red">{{$t('delete')}}</q-item-section>
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
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>
#menu {
  position: absolute;
  z-index: 99999999;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  transition: 0.3s;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
  /*transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;*/
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

.menu-item {
  padding: 4px 16px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(179, 216, 255, 0.3);
}
</style>
