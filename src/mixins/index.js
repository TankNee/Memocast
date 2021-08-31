export const initLoadingPageMixins = {
  methods: {
    hideInitLoadingPage () {
      const loadingPage = document.querySelector('#loading-page')
      if (loadingPage) {
        loadingPage.remove()
      }
    }
  }
}
