import _ from 'lodash'
import he from 'he'
import html2markdown from '../lib/html2markdown'
import api from 'src/utils/api'
import wizMarkdownParser from '@altairwei/wiz-markdown'
import { i18n } from 'boot/i18n'

function isNullOrEmpty (obj) {
  obj = _.toString(obj)
  return _.isNull(obj) || _.isEmpty(obj)
}
function convertHtml2Markdown (html, kbGuid, docGuid, resources) {
  try {
    html = html2markdown(html, {
      imgBaseUrl: `${api.KnowledgeBaseApi.getBaseUrl()}/ks/note/view/${kbGuid}/${docGuid}/`,
      resources: resources,
      imageUrlInLine: true
    })
    html = he.decode(html)
    html = removeDeprecatedTags(html)
    return html
  } catch (e) {
    return html
  }
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
  return wizMarkdownParser.extract(html, { convertImgTag: true, normalizeWhitespace: true })
}

/**
 * embed markdown source string to html string
 * @param markdown
 * @param options
 * @returns {string}
 */
function embedMDNote (markdown, options) {
  return wizMarkdownParser.embed(markdown, options)
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
  markdown = markdown || ''
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
 * 友好时间表达
 * @param {number} date 毫秒数
 * @returns {string} 刚刚，十分钟前 .etc
 */
function displayDateElegantly (date) {
  // 获取js 时间戳
  let currentTime = new Date().getTime()
  // 去掉 js 时间戳后三位，与php 时间戳保持一致
  currentTime = (currentTime - date) / 1000

  // 存储转换值
  let simpleExpression
  if (currentTime < 60 * 10) { // 十分钟内
    return i18n.t('justNow')
  } else if ((currentTime < 60 * 60) && (currentTime >= 60 * 10)) {
    // 超过十分钟少于1小时
    simpleExpression = Math.floor(currentTime / 60)
    return i18n.t('minutesAgo', { num: simpleExpression, plural: simpleExpression > 1 ? 's' : '' })
  } else if ((currentTime < 60 * 60 * 24) && (currentTime >= 60 * 60)) {
    // 超过1小时少于24小时
    simpleExpression = Math.floor(currentTime / 60 / 60)
    return i18n.t('hoursAgo', { num: simpleExpression, plural: simpleExpression > 1 ? 's' : '' })
  } else if ((currentTime < 60 * 60 * 24 * 7) && (currentTime >= 60 * 60 * 24)) {
    // 超过1天少于7天内
    simpleExpression = Math.floor(currentTime / 60 / 60 / 24)
    return i18n.t('daysAgo', { num: simpleExpression, plural: simpleExpression > 1 ? 's' : '' })
  } else {
    // 超过3天
    const result = new Date(date)
    return result.getFullYear() + '/' + (result.getMonth() + 1) + '/' + result.getDate()
  }
}

/**
 * generate categories tree
 * @param {string[] | string[][]} categories
 */
function generateCategoryNodeTree (categories) {
  const result = []
  categories = categories || []
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
  removeMarkdownTag,
  embedMDNote,
  displayDateElegantly
}
