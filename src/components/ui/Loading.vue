<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-ball style="color:var(--themeColor)" size="6em" />
  </q-inner-loading>
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

<style scoped></style>
