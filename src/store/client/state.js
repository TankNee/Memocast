const { app } = require('electron').remote
export default function () {
  return {
    language: app.getLocale().toLocaleLowerCase(),
    autoLogin: false,
    rememberPassword: true,
    darkMode: false,
    markdownOnly: false,
    enableSelfHostServer: false,
    imageUploadService: 'wizOfficialImageUploadService',
    imageUploadServiceParam: {},
    noteOrderType: 'orderByModifiedTime',
    apiServerUrl: '',
    postParam: '',
    jsonPath: '',
    customHeader: '',
    customBody: '',
    shrinkInTray: false,
    noteListVisible: true,
    flomoApiUrl: '',
    enablePreviewEditor: true,
    rightClickNoteItem: {},
    rightClickCategoryItem: ''
  }
}
