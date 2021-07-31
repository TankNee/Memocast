<template>
  <q-inner-loading :showing="visible">
    <transition
      appear
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'
    >
      <q-spinner style="color:var(--themeColor)" size="6em" />
    </transition>
  </q-inner-loading>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    visible: Boolean
  }
}
</script>

<style scoped></style>
