<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import ErrorHandler from './ErrorHandler'
const { RegisterErrorHandler } = ErrorHandler
export default {
  name: 'App',
  mounted () {
    RegisterErrorHandler()
  }
}
</script>
