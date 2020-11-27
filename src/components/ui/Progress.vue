<template>
  <q-inner-loading :showing="visible">
    <q-circular-progress
      show-value
      :value="value"
      size="5em"
      :color="$q.dark.isActive ? 'warning' : 'primary'"
    >
      {{ current }} / {{ total }}
    </q-circular-progress>
  </q-inner-loading>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    visible: Boolean,
    value: Number,
    current: Number,
    total: Number
  }
}
</script>

<style scoped>

</style>
