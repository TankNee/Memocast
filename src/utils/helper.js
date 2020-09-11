import _ from 'lodash'
import he from 'he'
import html2markdown from '../lib/html2markdown'
import api from 'src/utils/api'
function isNullOrEmpty (obj) {
  obj = _.toString(obj)
  return _.isNull(obj) || _.isEmpty(obj)
}
/**
 * 生成随机的UUID
 * 32位字符,数字和小写英文混杂
 * 例子: d330d7c9d64087419f88672cf421e81d
 */
const generateUUID = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  const uuid = s.join('')
  return uuid
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
  // const pattern = /<body[\d\D]*<\/body>/
  // if (!pattern.test(html)) {
  //   return html
  // }
  // const matches = pattern.exec(html)
  // if (isNullOrEmpty(matches)) return html
  // html = html2markdown(matches[0], {
  //   imgBaseUrl: `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/`,
  //   resources: resources,
  //   imageUrlInLine: true
  // })
  // html = he.decode(html)
  // html = removeDeprecatedTags(html)
  // const $ = cheerio.load(html)
  // const markdown = $('body').text()
  // return markdown
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(html, 'text/html')
  html = html2markdown(doc.body.innerHTML, {
    imgBaseUrl: `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/`,
    resources: resources,
    imageUrlInLine: true
  })
  html = he.decode(html)
  html = removeDeprecatedTags(html)
  return html
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

/**
 * generate categories tree
 * @param {string[] | string[][]} categories
 */
function generateCategoryNodeTree (categories) {
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
        key: generateUUID()
      })
      continue
    }
    const rootNodeIndex = result.findIndex(c => c.label === category[0])
    let rootNode = result[rootNodeIndex]
    // let lastNode = result[rootNodeIndex]
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
      key: generateUUID()
    })
  }
  return result
}
export default {
  isNullOrEmpty,
  convertHtml2Markdown,
  extractMarkdownFromMDNote,
  generateCategoryNodeTree
}
