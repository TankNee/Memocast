<template>
  <!-- <q-inner-loading :showing="isLoading">
    <q-spinner-ball style="color:var(--themeColor)" size="6em" />
  </q-inner-loading> -->
  <div class="inner-loading z-50" v-show="isLoading">
      <div class="spinner">
        <div class="double-bounce1 dot" style="background:var(--themeColor)"></div>
        <div class="double-bounce2 dot" style="background:var(--themeColor)"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    visible: Boolean,
    delay: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      isLoading: false,
      timer: null
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.timer = setTimeout(() => {
          this.isLoading = true
        }, this.delay)
      } else {
        clearTimeout(this.timer)
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.inner-loading {
  position: absolute;
  background: transparent;
  -webkit-app-region: drag;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
