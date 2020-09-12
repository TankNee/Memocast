import _ from 'lodash'
import he from 'he'
import html2markdown from '../lib/html2markdown'
import api from 'src/utils/api'
import wizMarkdownParser from '@altairwei/wiz-markdown'

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
function extractMarkdownFromMDNote (html, kbGuid, docGuid, resources = []) {
  resources.forEach(resource => {
    html = html.replace(`index_files/${resource.name}`, resource.url)
  })
  return wizMarkdownParser.extract(html, { convertImgTag: true })
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
  // html = html.replace(/\s<img\ssrc="data.*>/g, '- [ ]')
  html = html.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&')
  return html
}

/**
 * remove markdown tags while rendering note list
 * @param {string} markdown
 */
function removeMarkdownTag (markdown) {
  const patterns = [
    /#/g,
    /!?\[.*\]\(.*\)/g,
    />/g,
    /\\+/g,
    /\\-/g
  ]
  patterns.forEach(pattern => (markdown = markdown.replace(pattern, '')))
  return markdown
}

/**
 * generate categories tree
 * @param {string[] | string[][]} categories
 */
function generateCategoryNodeTree (categories = []) {
  const result = []
  categories = categories.map(category => {
    return _.isString(category) ? category.split('/').filter(c => !isNullOrEmpty(c)) : category
  })
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    if (category.length === 1) {
      result.push({
        label: category[0],
        children: [],
        selectable: true,
        key: `/${category[0]}/`
      })
      continue
    }
    const rootNodeIndex = result.findIndex(c => c.label === category[0])
    let rootNode = result[rootNodeIndex]
    const nodeKey = `/${category.join('/')}/`
    let lastNodeLabel = category.shift()
    while (category.length > 0) {
      const children = rootNode.children
      rootNode = children.find(c => c.label === category[0]) || rootNode
      lastNodeLabel = category.shift()
    }
    rootNode.children.push({
      label: lastNodeLabel,
      children: [],
      selectable: true,
      key: nodeKey
    })
  }
  return result
}
export default {
  isNullOrEmpty,
  convertHtml2Markdown,
  extractMarkdownFromMDNote,
  generateCategoryNodeTree,
  removeMarkdownTag
}
