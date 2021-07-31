<template>
  <q-inner-loading :showing="visible">
    <q-spinner-ball style="color:var(--themeColor)" size="6em" />
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
