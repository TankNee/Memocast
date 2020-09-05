/**
* @Description: Wiz Note Item designed for NoteList
* @Author: TankNee
* @Date: 9/5/2020 6:26 PM
**/
<template>
  <q-card bordered :dark="dark" class="note-card cursor-pointer">
    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
    </q-card-section>
    <q-separator :dark="dark" inset/>

    <q-card-section>
      {{ summary }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'NoteItem',
  props: {
    title: String,
    summary: String,
    markdown: Boolean,
    dark: Boolean
  }
}
</script>

<style scoped>
  .note-card {
    width: 100%;
    margin: 1rem 0rem;
  }
</style>
