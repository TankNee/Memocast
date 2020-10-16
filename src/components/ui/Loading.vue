<template>
  <q-inner-loading :showing="visible">
    <q-spinner :color="$q.dark.isActive ? 'warning' : 'primary'" size="5em" />
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
