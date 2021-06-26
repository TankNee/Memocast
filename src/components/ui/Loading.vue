<template>
  <q-inner-loading :showing="visible">
    <q-spinner-hourglass :color="$q.dark.isActive ? 'warning' : 'primary'" size="6em" />
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
