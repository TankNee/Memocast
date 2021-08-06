import _ from 'lodash'
import wizMarkdownParser from '@altairwei/wiz-markdown'
import { i18n } from 'boot/i18n'
import { Platform } from 'quasar'
import TurndownService from 'turndown'
import cheerio from 'cheerio'
import bus from 'components/bus'
import events from 'src/constants/events'
import ClientFileStorage from './storage/ClientFileStorage'
import remark from 'remark'
import pangu from 'remark-pangu'
// import { getCacheImage } from 'src/ApiInvoker'

const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx'
})

function isNullOrEmpty (obj) {
  obj = _.toString(obj)
  return _.isNull(obj) || _.isEmpty(obj)
}

/**
 * converter
 * @param {string} html
 * @param kbGuid
 * @param docGuid
 * @param resources
 * @returns {*}
 */
function convertHtml2Markdown (html, kbGuid, docGuid, resources) {
  try {
    resources.forEach(resource => {
      html = html.replace(new RegExp(`index_files/${resource.name}`, 'g'),
        `memocast://memocast.app/${kbGuid}/${docGuid}/${resource.name}`
      )
    })
    ClientFileStorage.setItemInStore('currentResources', resources)
    const $ = cheerio.load(html)
    const $body = $('html').clone()
    $body.find('style').remove()
    $body.removeClass()
    html = turndownService.turndown($body.html())
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
  // for (const resource of resources) {
  //   // getCacheImage(resource.url, kbGuid, docGuid)
  //   html = html.replace(
  //     new RegExp(`index_files/${resource.name}`, 'g'),
  //     resource.url
  //   )
  // }
  resources.forEach(resource => {
    html = html.replace(
      new RegExp(`index_files/${resource.name}`, 'g'),
      `memocast://memocast.app/${kbGuid}/${docGuid}/${resource.name}`
    )
  })
  ClientFileStorage.setItemInStore('currentResources', resources)
  return wizMarkdownParser.extract(html, {
    convertImgTag: true,
    normalizeWhitespace: true
  })
}

/**
 * embed markdown source string to html string
 * @param markdown
 * @param resources
 * @param options
 * @returns {string}
 */
function embedMDNote (markdown, resources, options) {
  const {
    kbGuid,
    docGuid
  } = options
  resources.forEach(resource => {
    const imgReg = new RegExp(`memocast://memocast.app/${kbGuid}/${docGuid}/${resource.name}`, 'g')
    markdown = markdown.replace(imgReg, `index_files/${resource.name}`)
  })
  return wizMarkdownParser.embed(markdown, options)
}

/**
 * remove markdown tags while rendering note list
 * @param {string} markdown
 */
function removeMarkdownTag (markdown) {
  markdown = markdown || ''
  const patterns = [/#/g, /!?\[.*]\(.*\)/g, />/g, /\\+/g, /\\-/g]
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
  if (currentTime < 60 * 10) {
    // 十分钟内
    return i18n.t('justNow')
  } else if (currentTime < 60 * 60 && currentTime >= 60 * 10) {
    // 超过十分钟少于1小时
    simpleExpression = Math.floor(currentTime / 60)
    return i18n.t('minutesAgo', {
      num: simpleExpression,
      plural: simpleExpression > 1 ? 's' : ''
    })
  } else if (currentTime < 60 * 60 * 24 && currentTime >= 60 * 60) {
    // 超过1小时少于24小时
    simpleExpression = Math.floor(currentTime / 60 / 60)
    return i18n.t('hoursAgo', {
      num: simpleExpression,
      plural: simpleExpression > 1 ? 's' : ''
    })
  } else if (currentTime < 60 * 60 * 24 * 7 && currentTime >= 60 * 60 * 24) {
    // 超过1天少于7天内
    simpleExpression = Math.floor(currentTime / 60 / 60 / 24)
    return i18n.t('daysAgo', {
      num: simpleExpression,
      plural: simpleExpression > 1 ? 's' : ''
    })
  } else {
    // 超过3天
    const result = new Date(date)
    return (
      result.getFullYear() +
      '/' +
      (result.getMonth() + 1) +
      '/' +
      result.getDate()
    )
  }
}

function wizIsPredefinedLocation (strLocation) {
  return [
    '/Deleted Items/',
    '/My Notes/',
    '/My Journals/',
    '/My Contacts/',
    '/My Events/',
    '/My Sticky Notes/',
    '/My Emails/',
    '/My Drafts/',
    '/My Tasks/',
    '/My Tasks/Inbox/',
    '/My Tasks/Completed/'
  ].includes(strLocation)
}

/**
 * generate categories tree
 * @param {string[] | string[][]} categories
 * @param {{}} categoriesPos
 */
function generateCategoryNodeTree (categories, categoriesPos) {
  const result = []
  categories = categories || []
  categories = categories.map(category => {
    return _.isString(category)
      ? category.split('/').filter(c => !isNullOrEmpty(c))
      : category
  })
  // 适配乱序的返回结果
  const rootCategories = categories.filter(c => c.length === 1)
  const leafCategories = categories.filter(c => c.length !== 1)
  let _categories = []
  rootCategories.forEach(rc => {
    _categories.push(rc)
    const children = leafCategories
      .filter(lc => lc[0] === rc[0])
      .sort((a, b) => a.length - b.length)
    _categories = _categories.concat(children)
  })
  categories = _categories
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    if (category.length === 1) {
      result.push({
        label: wizIsPredefinedLocation(`/${category[0]}/`) ? i18n.t(`/${category[0]}/`) : category[0],
        originLabel: category[0],
        children: [],
        selectable: true,
        key: `/${category[0]}/`
      })
      result.sort((c1, c2) => {
        if (categoriesPos[c1.key] && categoriesPos[c2.key]) {
          return categoriesPos[c1.key] - categoriesPos[c2.key]
        } else {
          return c1.originLabel.localeCompare(c2.originLabel)
        }
      })
      continue
    }
    const rootNodeIndex = result.findIndex(c => c.originLabel === category[0])
    let rootNode = result[rootNodeIndex]
    const nodeKey = `/${category.join('/')}/`
    let lastNodeLabel = category.shift()
    while (category.length > 0) {
      const children = rootNode.children
      rootNode = children.find(c => c.originLabel === category[0]) || rootNode
      lastNodeLabel = category.shift()
    }
    rootNode.children.push({
      label: wizIsPredefinedLocation(nodeKey) ? i18n.t(nodeKey) : lastNodeLabel,
      originLabel: lastNodeLabel,
      children: [],
      selectable: true,
      key: nodeKey
    })
    rootNode.children.sort((c1, c2) => {
      if (categoriesPos[c1.key] && categoriesPos[c2.key]) {
        return categoriesPos[c1.key] - categoriesPos[c2.key]
      } else {
        return c1.originLabel.localeCompare(c2.originLabel)
      }
    })
  }
  return result
}

/**
 * @param {{}[]} tags
 */
function generateTagNodeTree (tags = []) {
  if (!tags.length) return

  let result = []
  const rootTags = tags
    .filter(t => isNullOrEmpty(t.parentTagGuid))
    .sort((tagA, tagB) => tagA.pos - tagB.pos)
  result = result.concat(
    rootTags.map(t => ({
      label: t.name,
      children: [],
      selectable: true,
      key: t.tagGuid
    }))
  )
  // const leafTags = tags.filter(t => !isNullOrEmpty(t.parentTagGuid)) || []
  const seekLeafTags = rootTag => {
    tags
      .filter(t => t.parentTagGuid === rootTag.key)
      .forEach(t => {
        rootTag.children.push({
          label: t.name,
          children: [],
          selectable: true,
          key: t.tagGuid
        })
      })
    rootTag.children.forEach(t => {
      seekLeafTags(t)
    })
  }
  result.forEach(t => seekLeafTags(t))
  return result
}

/**
 * 获取文件的拓展名
 * @param filePath 文件路径
 */
function getFileNameWithExt (filePath) {
  const index = filePath.lastIndexOf('/')
  return filePath.substr(index + 1)
}

/**
 * 兼容Windows与MacOS的Ctrl键判断
 * @param event
 * @returns {boolean}
 */
function isCtrl (event) {
  if (Platform.is.mac) {
    return event.metaKey && !event.ctrlKey
  }
  return !event.metaKey && event.ctrlKey
}

/**
 * @param {{}[]} targetArray
 */
function generateRandomResult (targetArray) {
  const rnd = Math.floor(Math.random() * targetArray.length)
  return targetArray[rnd]
}

/**
 * extract content
 * @param {string} markdown
 * @returns {string}
 */
function extractMarkdownContent (markdown) {
  const linkPattern = /!?\[(.*)\]\(.*\)/
  const emphasizePattern = /\*?(.*)\*?/
  if (linkPattern.test(markdown)) {
    const matches = markdown.match(linkPattern)
    markdown = matches[1]
  }
  if (emphasizePattern.test(markdown)) {
    const matches = markdown.match(emphasizePattern)
    markdown = matches[1]
  }
  return markdown
}

class Node {
  constructor (item) {
    const {
      parent,
      lvl,
      content,
      key
    } = item
    this.parent = parent
    this.lvl = lvl
    this.label = extractMarkdownContent(content || '').replace(/#*\s?/, '')
    this.key = key
    this.handler = (v) => {
      bus.$emit(events.SCROLL_TO_HEADER, v.key)
    }
    this.children = []
  }

  // Add child node.
  addChild (node) {
    this.children.push(node)
  }
}

const findParent = (item, lastNode, rootNode) => {
  if (!lastNode) {
    return rootNode
  }
  const { lvl: lastLvl } = lastNode
  const { lvl } = item

  if (lvl < lastLvl) {
    return findParent(item, lastNode.parent, rootNode)
  } else if (lvl === lastLvl) {
    return lastNode.parent
  } else {
    return lastNode
  }
}

const updateContentsList = list => {
  list = list.map(i => {
    i.key = i.slug
    delete i.slug
    return i
  })
  const rootNode = new Node({
    parent: null,
    lvl: null,
    content: null,
    key: null
  })
  let lastNode = null

  for (const item of list) {
    const parent = findParent(item, lastNode, rootNode)

    const node = new Node({ parent, ...item })
    parent.addChild(node)
    lastNode = node
  }

  return rootNode.children
}

/**
 * 检查同名文件夹是否存在
 * @param {string[]} categories
 * @param {string} parentCategory
 * @param {string} childCategory
 */
function checkCategoryExistence (categories, parentCategory, childCategory) {
  parentCategory = isNullOrEmpty(parentCategory) ? '/' : parentCategory
  const absolutePath = `${parentCategory}${childCategory}/`
  return categories.includes(absolutePath)
}

function checkTagExistence (tags, newTag) {
  const tagTree = generateTagNodeTree(tags)
  for (const tagTreeElement of tagTree) {
    if (tagTreeElement.label === newTag) return true
  }
  return false
}

function formatDocumentByRemarkPangu (markdown) {
  return new Promise((resolve, reject) => {
    remark().use(pangu).process(markdown, (err, res) => {
      if (err) {
        reject(err)
      } else {
        // * \[ ] 12312321
        resolve(res.contents.replace(/\*\s*\\\[/g, '* ['))
      }
    })
  })
}

function animatedScrollTo (element, to, duration, callback) {
  const start = element.scrollTop
  const change = to - start
  const animationStart = +new Date()
  let animating = true
  let lastPos = null
  const easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  const animateScroll = function () {
    if (!animating) {
      return
    }
    requestAnimationFrame(animateScroll)
    const now = +new Date()
    const val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration))
    if (lastPos) {
      if (lastPos === element.scrollTop) {
        lastPos = val
        element.scrollTop = val
      } else {
        animating = false
      }
    } else {
      lastPos = val
      element.scrollTop = val
    }
    if (now > animationStart + duration) {
      element.scrollTop = to
      animating = false
      if (callback) {
        callback()
      }
    }
  }
  requestAnimationFrame(animateScroll)
}

export default {
  isNullOrEmpty,
  convertHtml2Markdown,
  extractMarkdownFromMDNote,
  wizIsPredefinedLocation,
  generateCategoryNodeTree,
  generateTagNodeTree,
  generateRandomResult,
  removeMarkdownTag,
  embedMDNote,
  displayDateElegantly,
  updateContentsList,
  getFileNameWithExt,
  isCtrl,
  checkCategoryExistence,
  checkTagExistence,
  formatDocumentByRemarkPangu,
  animatedScrollTo
}
