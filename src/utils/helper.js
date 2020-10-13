import _ from 'lodash'
import wizMarkdownParser from '@altairwei/wiz-markdown'
import { i18n } from 'boot/i18n'
import { Platform } from 'quasar'
import TurndownService from 'turndown'
import cheerio from 'cheerio'
const { dialog, BrowserWindow } = require('electron').remote
const turndownService = new TurndownService({ codeBlockStyle: 'fenced' })
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
      html = html.replace(`index_files/${resource.name}`, resource.url)
    })
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
  resources.forEach(resource => {
    html = html.replace(new RegExp(`index_files/${resource.name}`, 'g'), resource.url)
  })
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
  resources.forEach(resource => {
    const imgReg = new RegExp(`!\\[.*\\]\\(${resource.name}\\)`, 'g')
    markdown = markdown.replace(resource.url, resource.name)
    const result = imgReg.exec(markdown)
    console.log(result)
    markdown = markdown.replace(imgReg, `![](index_files/${resource.name})`)
  })
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
  html = html
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
  return html
}

/**
 * remove markdown tags while rendering note list
 * @param {string} markdown
 */
function removeMarkdownTag (markdown) {
  markdown = markdown || ''
  const patterns = [/#/g, /!?\[.*\]\(.*\)/g, />/g, /\\+/g, /\\-/g]
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

/**
 * generate categories tree
 * @param {string[] | string[][]} categories
 */
function generateCategoryNodeTree (categories) {
  const result = []
  categories = categories || []
  categories = categories.map(category => {
    return _.isString(category)
      ? category.split('/').filter(c => !isNullOrEmpty(c))
      : category
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

/**
 * 开启一个图片选择弹窗
 * @param options
 * @returns {string[]}
 */
function createFileSelectDialog (options) {
  return dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), options)
}

/**
 * 获取文件的拓展名
 * @param filePath 文件路径
 */
function getFileNameWithExt (filePath) {
  const index = filePath.lastIndexOf('/')
  const fileName = filePath.substr(index + 1)

  return fileName
}

/**
 * 兼容Windows与MacOS的Ctrl键判断
 * @param event
 * @returns {boolean}
 */
function isCtrl (event) {
  if (Platform.is.mac) {
    if (event.metaKey && !event.ctrlKey) {
      return true
    }
    return false
  }
  if (!event.metaKey && event.ctrlKey) {
    return true
  }
  return false
}
function filterParentElement (dom, root, filterFn, self = false) {
  if (dom) {
    let parent = self ? dom : dom.parentElement
    while (parent) {
      if (parent === root) {
        break
      }
      if (filterFn(parent)) {
        return parent
      }
      parent = parent.parentElement
    }
  }
  return null
}

/**
 * 更新笔记目录数据结构
 * @param {HTMLElement} editorRootElement
 */
function updateContentsList (editorRootElement) {
  const list = []
  for (let i = 0; i < editorRootElement.childElementCount; i++) {
    const tagName = editorRootElement.children[i].tagName.toLowerCase()
    // 如果是标题类的标签，那么就进行解析
    if (/^h[1-6]$/.test(tagName)) {
      // 解出标签的等级，h1到h6
      const rank = parseInt(tagName[1], 10)
      if (list.length) {
        let target = list
        for (let j = 1; j < rank; j++) {
          if (target.length === 0 || rank === target[0].rank) {
            // target.push({
            //   key: `${i}-${j}`,
            //   label: `${i}-${j}`,
            //   children: [],
            // })
            break
          } else if (!target[target.length - 1].children) {
            target[target.length - 1].children = []
          }
          // 放到最后一个元素的子元素集合中
          target = target[target.length - 1].children
        }
        target.push({
          key: `${i}-${rank}`,
          label: editorRootElement.children[i].innerText.replace(/^#+\s/, ''),
          element: editorRootElement.children[i],
          selectable: true,
          rank: rank
        })
      } else {
        // 处理第一个标题元素
        list.push({})
        const item = list[list.length - 1]
        for (let j = 0; j < rank; j++) {
          if (j === rank - 1) {
            // 生成唯一key，整个编辑器中第i个元素的第j等级的标题
            item.key = `${i}-${j}`
            item.label = editorRootElement.children[i].innerText.replace(
              /^#+\s/,
              ''
            )
            item.selectable = true
            item.rank = rank
            item.element = editorRootElement.children[i]
          }
          // else {
          //   item.key = `${i}-${j}`
          //   item.label = item.key
          //   item.open = true
          //   item.children = [{}]
          //   item = item.children[0]
          // }
        }
      }
    }
  }
  return list
}

/**
 * 根据key查找node对象
 * @param {node[]} nodeList
 * @param {string} key
 * @returns {null|*}
 */
function findNodeByNodeKey (nodeList, key) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].key === key) return nodeList[i]
    if (!nodeList[i].children) continue
    const node = findNodeByNodeKey(nodeList[i].children, key)
    if (node) return node
  }
  return null
}
/**
 * 根据label查找node对象
 * @param {node[]} nodeList
 * @param {string} label
 * @returns {null|*}
 */
function findNodeByNodeLabel (nodeList, label) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].label.replace(/\s/g, '') === label) return nodeList[i]
    if (!nodeList[i].children) continue
    const node = findNodeByNodeLabel(nodeList[i].children, label)
    if (node) return node
  }
  return null
}
export default {
  isNullOrEmpty,
  convertHtml2Markdown,
  extractMarkdownFromMDNote,
  generateCategoryNodeTree,
  removeMarkdownTag,
  embedMDNote,
  displayDateElegantly,
  createFileSelectDialog,
  removeDeprecatedTags,
  updateContentsList,
  getFileNameWithExt,
  isCtrl,
  filterParentElement,
  findNodeByNodeKey,
  findNodeByNodeLabel
}
