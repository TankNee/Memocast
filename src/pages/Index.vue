<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 2" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

      <template v-slot:after>
          <Vditor />
      </template>
    </q-splitter>
<!--    <Vditor />-->

  </q-page>
</template>

<script>
import Vditor from 'components/Vditor'
export default {
  name: 'PageIndex',
  components: { Vditor },
  data () {
    return {
      splitterModel: 50
    }
  }
}
</script>
