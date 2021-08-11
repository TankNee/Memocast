<template>
  <div class="absolute-bottom-right q-ma-md">
    <q-btn-group rounded>
      <q-btn style="background-color: var(--themeColor); color: floralwhite;" rounded icon="zoom_in" @click="zoomInHandler" :title="$t('zoomIn')" />
      <q-btn style="background-color: var(--themeColor); color: floralwhite;" rounded icon="zoom_out" @click="zoomOutHandler" :title="$t('zoomOut')" />
      <q-btn style="background-color: var(--themeColor); color: floralwhite;" rounded icon="aspect_ratio" @click="fitScreenHandler" :title="$t('fitScreen')" />
      <q-btn style="background-color: var(--themeColor); color: floralwhite;" rounded :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="fullscreenHandler" :title="isFullscreen ? $t('fullscreenExit') : $t('fullscreen')" />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  name: 'MarkMapToolBar',
  data () {
    return {
      markMap: {},
      container: {},
      isFullscreen: false
    }
  },
  methods: {
    zoomInHandler: function () {
      this.markMap.rescale(1.25)
    },
    zoomOutHandler: function () {
      this.markMap.rescale(0.8)
    },
    fitScreenHandler: function () {
      this.markMap.fit()
    },
    fullscreenHandler: function () {
      if (this.isFullscreen) {
        document.exitFullscreen()
      } else {
        this.container.requestFullscreen().then(() => {
          this.fitScreenHandler()
        })
      }
    },
    fullscreenEventChangeHandler: function () {
      this.isFullscreen = !this.isFullscreen
      this.fitScreenHandler()
    },
    setMarkMap: function (markMap) {
      this.markMap = markMap
      setTimeout(() => {
        this.fitScreenHandler()
      }, 300)
    },
    setContainer: function (container) {
      document.removeEventListener('fullscreenchange', () => {})
      this.container = container
      document.addEventListener('fullscreenchange', this.fullscreenEventChangeHandler.bind(this))
    }
  }
}
</script>

<style scoped></style>
