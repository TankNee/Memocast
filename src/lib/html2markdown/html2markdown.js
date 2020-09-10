/**
 * html2markdown - An HTML to Markdown converter.
 *
 * This implementation uses HTML or DOM parsing for conversion. Parsing code was
 * abstracted out in a parsing function which should be easy to remove in favor
 * of other parsing libraries.
 *
 * Converted MarkDown was tested with ShowDown library for HTML rendering. And
 * it tries to create MarkDown that does not confuse ShowDown when certain
 * combination of HTML tags come together.
 *
 * @author Himanshu Gilani
 * @author Kates Gasis (original author)
 *
 * 为了用于解析为知笔记的文档的HTML，做出了相应的修改
 */

/**
 * html2markdown
 * @param html - html string to convert
 * @return converted markdown text
 */

/*
 Universal JavaScript Module, supports AMD (RequireJS), Node.js, and the browser.
 https://gist.github.com/kirel/1268753
*/

;(function(name, definition) {
  if (typeof define === 'function') {
    // AMD
    define(definition)
  } else if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = definition()
  } else {
    // Browser
    var theModule = definition(),
      global = this,
      old = global[name]
    theModule.noConflict = function() {
      global[name] = old
      return theModule
    }
    global[name] = theModule
  }
})('html2markdown', function() {
  /**
   * 将连续的空格删除
   * @param {String} value 要剔除的文本
   */
  function trim(value) {
    if (value == '  \n') {
      // br 转换成的字符不算空白
      return value
    } else {
      return value.replace(/^\s+|\s+$/g, '')
    }
  }

  /**
   * 检查是否以某个后缀结束
   * @param {String} value 要检查的文本
   * @param {String} suffix 要检查的后缀
   * @returns {Boolean}
   */
  function endsWith(value, suffix) {
    return value.match(suffix + '$') == suffix
  }

  /**
   * 检查是否以某个字符串开始
   * @param {String} value 要检查的文本
   * @param {String} str 要检查的字符串
   * @returns {Boolean}
   */
  function startsWith(value, str) {
    return value.indexOf(str) == 0
  }

  function html2markdown(html, opts) {
    opts = opts || {}
    /**
     * 用来承载Markdown文本的数组
     * @constant
     * @type {Array}
     */
    var nodeList = []

    /**
     * 用于储存列表的堆栈
     * @constant
     * @type {Array}
     */
    var listTagStack = []
    var linkAttrStack = []
    var blockquoteStack = []
    var preStack = []
    var codeStack = []
    var links = []
    var inlineStyle = opts['inlineStyle'] || false
    var parser = opts['parser']

    /**
     * 将HTML标签与Markdown标记匹配字典
     * @constant
     * @type {Object}
     */
    var markdownTags = {
      hr: '- - -\n\n',
      br: '  \n',
      title: '# ',
      h1: '# ',
      h2: '## ',
      h3: '### ',
      h4: '#### ',
      h5: '##### ',
      h6: '###### ',
      b: '**',
      strong: '**',
      i: '_',
      em: '_',
      dfn: '_',
      var: '_',
      cite: '_',
      span: ' ',
      ul: '* ',
      ol: '1. ',
      dl: '- ',
      blockquote: '> '
    }

    if (!parser && typeof markdownDOMParser !== 'undefined')
      parser = markdownDOMParser

    /**
     * 根据层级在li前添加空格
     */
    function getListMarkdownTag() {
      var listItem = ''
      if (listTagStack) {
        for (var i = 0; i < listTagStack.length - 1; i++) {
          listItem += '  '
        }
      }
      listItem += peek(listTagStack)
      return listItem
    }

    function convertAttrs(attrs) {
      var attributes = {}
      for (var k in attrs) {
        var attr = attrs[k]
        attributes[attr.name] = attr
      }
      return attributes
    }

    /**
     * 窥视数组最后一个元素
     * @param {Array} list 要窥视的数组
     */
    function peek(list) {
      if (list && list.length > 0) {
        return list.slice(-1)[0]
      }
      return ''
    }

    /**
     * 从尾到头窥视数组元素，直到非空元素为止，返回最后一个非空元素
     * @param {Array} list 要窥视的数组
     */
    function peekTillNotEmpty(list) {
      if (!list) {
        return ''
      }

      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] != '') {
          return list[i]
        }
      }
      return ''
    }

    /**
     * 判断`nodeList`内某个标签是否闭合，如果没有闭合则清除掉
     *
     */
    function removeIfEmptyTag(start) {
      var cleaned = false
      // 如果nodeList最后一个非空元素就是start
      if (start == peekTillNotEmpty(nodeList)) {
        // 从尾到头挨个去除空元素
        while (peek(nodeList) != start) {
          nodeList.pop()
        }
        // 将start一并去除
        nodeList.pop()
        cleaned = true
      }
      return cleaned
    }

    /**
     * 将某个标签内的文本提取出来
     *
     */
    function sliceText(start) {
      var text = []
      // 只要nodeList非空且某个的文本没有完全取出
      while (nodeList.length > 0 && peek(nodeList) != start) {
        // 将文本取出
        var t = nodeList.pop()
        text.unshift(t)
      }
      return text.join('')
    }

    /**
     * 处理前一个块级元素的换行符
     * @param {Boolean} isEndBlock 是否为闭合元素
     */
    function block(isEndBlock, doLineFeed = true) {
      var lastItem = nodeList.pop()
      if (!lastItem) {
        return
      }

      if (!isEndBlock && doLineFeed) {
        var block
        if (/\s*\n\n\s*$/.test(lastItem)) {
          // 如果前一文本已有两个换行符，则不再添加
          lastItem = lastItem.replace(/\s*\n\n\s*$/, '\n\n')
          block = ''
        } else if (/\s*\n\s*$/.test(lastItem)) {
          // 如果前一文本只有一个换行符，则再添加一个
          lastItem = lastItem.replace(/\s*\n\s*$/, '\n')
          block = '\n'
        } else if (/\s+$/.test(lastItem)) {
          // 如果前一文本没有换行符，则添加两个
          block = '\n\n'
        } else {
          block = '\n\n'
        }

        nodeList.push(lastItem)
        nodeList.push(block)
      } else if (isEndBlock && doLineFeed) {
        // 如果该块级元素是闭合元素
        nodeList.push(lastItem)
        // 且前一文本不是以换行符结尾，则添加两个换行符
        if (!endsWith(lastItem, '\n')) {
          nodeList.push('\n\n')
        }
      } else if (!isEndBlock && !doLineFeed) {
        // 如果是起始元素，且不要求换行
        var block
        if (/\s*\n\n\s*$/.test(lastItem)) {
          // 如果前一文本已有两个换行符，则不再添加
          lastItem = lastItem.replace(/\s*\n\n\s*$/, '\n\n')
          block = ''
        } else if (/\s*\n\s*$/.test(lastItem)) {
          // 如果前一文本只有一个换行符，也不添加
          lastItem = lastItem.replace(/\s*\n\s*$/, '\n')
          block = ''
        } else if (/\s+$/.test(lastItem)) {
          // 如果前一文本没有换行符，则添加一个
          block = '\n'
        } else {
          block = '\n'
        }

        nodeList.push(lastItem)
        nodeList.push(block)
      } else if (isEndBlock && !doLineFeed) {
        // 如果是闭合元素，且不要求换行
        nodeList.push(lastItem)
        if (!endsWith(lastItem, '\n')) {
          nodeList.push('\n') // 只添加一个换行
        }
      }
    }

    /**
     * 给前一个列表添加换行符
     */
    function listBlock() {
      if (nodeList.length > 0) {
        var li = peek(nodeList)

        if (!endsWith(li, '\n')) {
          // 如果前一个列表未换行，则添加一个换行
          nodeList.push('\n')
        }
      } else {
        // 如果之前没有任何文本，则先添加一个换行符
        nodeList.push('\n')
      }
    }

    parser(
      html,
      {
        // 处理起始标签的函数
        start: function(tag, attrs, unary) {
          tag = tag.toLowerCase()

          if (unary && tag != 'br' && tag != 'hr' && tag != 'img') {
            return
          }

          switch (tag) {
            case 'br':
              nodeList.push(markdownTags[tag]) // 添加一个换行符\n
              //console.log([peek(nodeList)])
              break
            case 'hr':
              block() // 处理当前一块级元素，并添加相应的换行符
              nodeList.push(markdownTags[tag]) // 添加横线并且换两次行- - -\n\n
              break
            case 'title':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
              block() // 处理当前一块级元素，并添加相应的换行符
              nodeList.push(markdownTags[tag]) // 添加 ##，文本由chars句柄处理
              break
            case 'b':
            case 'strong':
            case 'i':
            case 'em':
            case 'dfn':
            case 'var':
            case 'cite':
              nodeList.push(markdownTags[tag]) // 添加 _
              break
            case 'code':
            case 'span':
              if (preStack.length > 0) {
                // 如果有pre元素，则不添加任何Markdown标记了
                break
              } else if (!/\s+$/.test(peek(nodeList))) {
                // 如果前一个元素不是以空格结尾，则添加一个空格
                nodeList.push(markdownTags[tag])
              }
              break
            case 'p':
            case 'div':
              //case "td":
              block(false, false) // 处理前一块级元素，并添加相应的换行符
              break
            case 'ul':
            case 'ol':
            case 'dl':
              listTagStack.push(markdownTags[tag]) // 在列表标签堆栈添加列表相应的MD标记
              // lists are block elements
              if (listTagStack.length > 1) {
                // 如果已经有了列表堆栈，则给前一个元素添加换行符
                listBlock()
              } else {
                // 如果是一个新的列表开始
                block()
              }
              break
            case 'li':
            case 'dt':
              var li = getListMarkdownTag()
              nodeList.push(li)
              break
            case 'a':
              var attribs = convertAttrs(attrs)
              linkAttrStack.push(attribs)
              nodeList.push('[')
              break
            case 'img':
              var attribs = convertAttrs(attrs)
              var alt, title, url

              attribs['src'] ? (url = attribs['src'].value) : (url = '')
              if (!url) {
                break
              }

              attribs['alt'] ? (alt = trim(attribs['alt'].value)) : (alt = '')
              attribs['title']
                ? (title = trim(attribs['title'].value))
                : (title = '')

              // if parent of image tag is nested in anchor tag use inline style
              if (
                !inlineStyle &&
                !startsWith(peekTillNotEmpty(nodeList), '[')
              ) {
                var l = links.indexOf(url)
                if (l == -1) {
                  links.push(url)
                  l = links.length - 1
                }

                block()
                nodeList.push('![')
                if (alt != '') {
                  nodeList.push(alt)
                } else if (title != null) {
                  nodeList.push(title)
                }
                if (
                  opts.imageUrlInLine &&
                  opts.resources &&
                  Array.isArray(opts.resources)
                ) {
                  opts.resources.forEach(res => {
                    if (url.indexOf(res.name) !== -1) {
                      url = res.url
                    }
                  })
                  nodeList.push('](' + url + ')')
                } else {
                  nodeList.push('][' + l + ']')
                }

                block()
              } else {
                //if image is not a link image then treat images as block elements
                if (!startsWith(peekTillNotEmpty(nodeList), '[')) {
                  block()
                }

                nodeList.push(
                  '![' +
                    alt +
                    '](' +
                    url +
                    (title ? ' "' + title + '"' : '') +
                    ')'
                )

                if (!startsWith(peekTillNotEmpty(nodeList), '[')) {
                  block(true)
                }
              }
              break
            case 'blockquote':
              //listBlock();
              block()
              blockquoteStack.push(markdownTags[tag])
              break
            case 'pre':
              block()
              preStack.push(true)
              nodeList.push('    ')
              break
            case 'table':
              nodeList.push('<table>')
              break
            case 'thead':
              nodeList.push('<thead>')
              break
            case 'tbody':
              nodeList.push('<tbody>')
              break
            case 'tr':
              nodeList.push('<tr>')
              break
            case 'td':
              nodeList.push('<td>')
              break
          }
        },
        chars: function(text) {
          if (preStack.length > 0) {
            // 如果处于代码块堆栈中，则要添加四个空格
            text = text.replace(/\n/g, '\n    ')
          } else if (trim(text) != '') {
            // 如果内容不为空
            // 因为直接提取自Markdown格式的HTML反而不需要剔除空格
            //text = text.replace(/\s+/g, " "); //不要去除空格

            var prevText = peekTillNotEmpty(nodeList)
            if (/\s+$/.test(prevText)) {
              //text = text.replace(/^\s+/g, ""); //不要去除开始的空格
            }

            //TODO: 检验chars中是否为h1等等需要换行的元素，进行换行
            /*
                    if ( /^#{1,7}/.test(text) ) {
                        text = '\n' + text + '\n'
                    }
                    */
          } else {
            nodeList.push('')
            return
          }

          //if(blockquoteStack.length > 0 && peekTillNotEmpty(nodeList).endsWith("\n")) {
          if (blockquoteStack.length > 0) {
            nodeList.push(blockquoteStack.join(''))
          }

          nodeList.push(text)
        },
        end: function(tag) {
          tag = tag.toLowerCase()

          switch (tag) {
            case 'title':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
              if (!removeIfEmptyTag(markdownTags[tag])) {
                block(true)
              }
              break
            case 'p':
            case 'div':
              //case "td":
              while (nodeList.length > 0 && trim(peek(nodeList)) == '') {
                nodeList.pop()
              }
              block(true, false)
              break
            case 'b':
            case 'strong':
            case 'i':
            case 'em':
            case 'dfn':
            case 'var':
            case 'cite':
              if (!removeIfEmptyTag(markdownTags[tag])) {
                nodeList.push(trim(sliceText(markdownTags[tag])))
                nodeList.push(markdownTags[tag])
              }
              break
            case 'a':
              var text = sliceText('[')
              text = text.replace(/\s+/g, ' ')
              text = trim(text)

              if (text == '') {
                nodeList.pop()
                break
              }

              var attrs = linkAttrStack.pop()
              var url
              attrs['href'] && attrs['href'].value != ''
                ? (url = attrs['href'].value)
                : (url = '')

              if (url == '') {
                nodeList.pop()
                nodeList.push(text)
                break
              }

              nodeList.push(text)

              if (!inlineStyle && !startsWith(peek(nodeList), '!')) {
                var l = links.indexOf(url)
                if (l == -1) {
                  links.push(url)
                  l = links.length - 1
                }
                nodeList.push('][' + l + ']')
              } else {
                if (startsWith(peek(nodeList), '!')) {
                  var text = nodeList.pop()
                  text = nodeList.pop() + text
                  block()
                  nodeList.push(text)
                }

                var title = attrs['title']
                nodeList.push(
                  '](' +
                    url +
                    (title
                      ? ' "' + trim(title.value).replace(/\s+/g, ' ') + '"'
                      : '') +
                    ')'
                )

                if (startsWith(peek(nodeList), '!')) {
                  block(true)
                }
              }
              break
            case 'ul':
            case 'ol':
            case 'dl':
              listBlock()
              listTagStack.pop()
              break
            case 'li':
            case 'dt':
              var li = getListMarkdownTag()
              if (!removeIfEmptyTag(li)) {
                var text = trim(sliceText(li))

                if (startsWith(text, '[![')) {
                  nodeList.pop()
                  block()
                  nodeList.push(text)
                  block(true)
                } else {
                  nodeList.push(text)
                  listBlock()
                }
              }
              break
            case 'blockquote':
              blockquoteStack.pop()
              break
            case 'pre':
              //uncomment following experimental code to discard line numbers when syntax highlighters are used
              //notes this code thorough testing before production user
              /*
                        var p=[];
                        var flag = true;
                        var count = 0, whiteSpace = 0, line = 0;
                        console.log(">> " + peek(nodeList));
                        while(peek(nodeList).startsWith("    ") || flag == true)
                        {
                            //console.log('inside');
                            var text = nodeList.pop();
                            p.push(text);

                            if(flag == true && !text.startsWith("    ")) {
                                continue;
                            } else {
                                flag = false;
                            }

                            //var result = parseInt(text.trim());
                            if(!isNaN(text.trim())) {
                                count++;
                            } else if(text.trim() == ""){
                                whiteSpace++;
                            } else {
                                line++;
                            }
                            flag = false;
                        }

                        console.log(line);
                        if(line != 0)
                        {
                            while(p.length != 0) {
                                nodeList.push(p.pop());
                            }
                        }
                        */
              block(true)
              preStack.pop()
              break
            case 'code':
            case 'span':
              if (preStack.length > 0) {
                break
              } else if (trim(peek(nodeList)) == '') {
                nodeList.pop()
                nodeList.push(markdownTags[tag])
              } else {
                var text = nodeList.pop()
                nodeList.push(trim(text))
                nodeList.push(markdownTags[tag])
              }
              break
            case 'table':
              nodeList.push('</table>')
              break
            case 'thead':
              nodeList.push('</thead>')
              break
            case 'tbody':
              nodeList.push('</tbody>')
              break
            case 'tr':
              nodeList.push('</tr>')
              break
            case 'td':
              nodeList.push('</td>')
              break
            case 'br':
            case 'hr':
            case 'img':
              break
          }
        }
      },
      {
        nodesToIgnore: [
          'script',
          'noscript',
          'object',
          'iframe',
          'frame',
          'head',
          'style',
          'label'
        ]
      }
    )

    if (!inlineStyle) {
      for (let i = 0; i < links.length; i++) {
        // 如果图片链接没有前缀，那么就加上默认前缀
        if (
          links[i].indexOf('http') === -1 &&
          (links[i].indexOf('.jpg') !== -1 ||
            links[i].indexOf('.png') !== -1 ||
            links[i].indexOf('.gif') !== -1)
        ) {
          if (opts.imageUrlInLine) continue
          opts.resources.forEach(r => {
            if (links[i].indexOf(r.name) !== -1) {
              links[i] = r.url
            }
            // if (r.url.indexOf(links[i].split('/')[1]) !== -1) {
            //     links[i] = r.url;
            // }
          })
          // links[i] = opts.imgBaseUrl + links[i];
        }
        if (i === 0) {
          const lastItem = nodeList.pop()
          nodeList.push(lastItem.replace(/\s+$/g, ''))
          nodeList.push('\n\n[' + i + ']: ' + links[i])
        } else {
          nodeList.push('\n[' + i + ']: ' + links[i])
        }
      }
    }
    return nodeList.join('')
  }

  return html2markdown
})
