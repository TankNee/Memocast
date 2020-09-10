import _ from 'lodash'
import he from 'he'
import html2markdown from '../lib/html2markdown'
import api from 'src/utils/api'
function isNullOrEmpty (obj) {
  obj = _.toString(obj)
  return _.isNull(obj) || _.isEmpty(obj)
}
function convertHtml2Markdown (html, kbGuid, docGuid, resources) {
  html = html2markdown(html, {
    imgBaseUrl: `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/`,
    resources: resources,
    imageUrlInLine: true
  })
  html = he.decode(html)
  html = removeDeprecatedTags(html)
  return html
}

/**
 * In markdown note the resource markdown code is wrapped in body tag
 * @param {string} html
 * @param {string} kbGuid
 * @param {string} docGuid
 * @param {[Object]} resources
 * @returns {*}
 */
function extractMarkdownFromMDNote (html, kbGuid, docGuid, resources) {
  const pattern = /<body[\d\D]*<\/body>/
  if (!pattern.test(html)) {
    return html
  } else {
    const matches = pattern.exec(html)
    if (isNullOrEmpty(matches)) return html
    html = html2markdown(matches[0], {
      imgBaseUrl: `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/`,
      resources: resources,
      imageUrlInLine: true
    })
    html = he.decode(html)
    html = removeDeprecatedTags(html)
    return html
  }
}

/**
 * remove deprecatedTags
 * @param {string} html
 */
function removeDeprecatedTags (html) {
  const patterns = [
    /<span\sdata-wiz-span="data-wiz-span"\sstyle="font-size:\s10\.5pt;">/g,
    /<span\sdata-wiz-span="data-wiz-span"\sstyle="font-size: 0\.875rem;">/g
  ]
  patterns.forEach(pattern => {
    html = html.replace(pattern, '')
  })
  html = html.replace(/\s<img\ssrc="data.*>/g, '- [ ]')
  return html
}
export default {
  isNullOrEmpty,
  convertHtml2Markdown,
  extractMarkdownFromMDNote
}
