/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * 此代码经过改动用于解析为知笔记html文档
 * 
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

/*
 Universal JavaScript Module, supports AMD (RequireJS), Node.js, and the browser.
 https://gist.github.com/kirel/1268753
*/

(function (name, definition) {
  if (typeof define === 'function') { // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('markdownHTMLParser', function() {

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		endTag = /^<\/(\w+)[^>]*>/,
		attr = /(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

	// Empty Elements - HTML 4.01
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

	// Block Elements - HTML 4.01
	var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

	// Inline Elements - HTML 4.01
	var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

	// Attributes that have their values filled in disabled="disabled"
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

	// Special Elements (can contain anything)
	var special = makeMap("script,style");

	function HTMLParser( html, handler ) {
		var index, chars, match, stack = [], last = html;
		/**
		 * 查询堆栈中最后一个元素
		 */
		stack.last = function(){
			return this[ this.length - 1 ];
		};

		// 只要html还没解析完，循环一直进行
		while ( html ) {
			chars = true;

			// Make sure we're not in a script or style element 确保不解析脚本和样式
			// 只有当堆栈为空时（只有第一次为空吧？）或者堆栈最后一个元素不为特殊元素时
			if ( !stack.last() || !special[ stack.last() ] ) {

				// Comment 解析注释
				if ( html.indexOf("<!--") == 0 ) {
					// 当html截取到<!--时，计算-->位置
					index = html.indexOf("-->");

					if ( index >= 0 ) {
						if ( handler.comment ) handler.comment( html.substring( 4, index ) ); // 传入<!-- -->直接按的文字
						html = html.substring( index + 3 ); // 从-->后进行截取
						chars = false;
					}

				// end tag
				} else if ( html.indexOf("</") == 0 ) {
					// 当html截取到</时，判断为结束闭合标签
					match = html.match( endTag ); // 仅匹配一次

					if ( match ) {
						html = html.substring( match[0].length ); // 截取剩余html
						match[0].replace( endTag, parseEndTag ); // 用 parseEndTag 函数处理endTag
						chars = false;
					}

				// start tag
				} else if ( html.indexOf("<") == 0 ) {
					// 当截取到<时，判断为开放标签
					match = html.match( startTag ); // 精确匹配开放标签

					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( startTag, parseStartTag );
						chars = false;
					}
				}

				if ( chars ) { // 当以上条件判断都失败后，该内容被当作chars处理
					//避免将Markdown中的php代码<? ?>或者<https://>语法解析成开放标签, 这里做出了修改
					// 寻找下一个标签位置
					var tagRegex = /<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>|<\/(\w+)[^>]*>/
					index = html.match(tagRegex).index;
					// 如果没有标签了则剩余内容全部当作chars，否则提取到下一个标签为止。
					var text = index < 0 ? html : html.substring( 0, index );
					// 截取剩余html
					html = index < 0 ? "" : html.substring( index );

					if ( handler.chars )
						handler.chars( text );
				}

			} else {
				// 处理script和style时
				html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text){
					// 处理JS脚本或者CSS样式内容，直接转化为文本
					text = text.replace(/<!--(.*?)-->/g, "$1")
						.replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

					if ( handler.chars )
						handler.chars( text );

					return "";
				});

				parseEndTag( "", stack.last() );
			}
			// 判断截取后的html是否等于前一次last的html
			if ( html == last )	throw "Parse Error: " + html;
			// 通过判定后，将hmtl赋值到前一次last
			last = html;
		}

		// Clean up any remaining tags
		parseEndTag();

		/**
		 * 处理匹配到的开放标签
		 * @param {String} tag 匹配到的开放标签
		 * @param {String} tagName 开放标签名称
		 * @param {String} rest 各种属性
		 * @param {String} unary 是否为空标签
		 */
		function parseStartTag( tag, tagName, rest, unary ) {
			// 块级元素
			if ( block[ tagName ] ) {
				// 当堆栈存在元素且最后一个元素为行内元素时循环执行
				while ( stack.last() && inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}

			if ( closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}

			// 判断是否为空标签
			unary = empty[ tagName ] || !!unary;

			// 如果不是空标签就将开放标签推入堆栈中
			if ( !unary ) stack.push( tagName );

			if ( handler.start ) {
				var attrs = [];
				
				// 提取标签属性
				rest.replace(attr, function(match, name) {
					var value = arguments[2] ? arguments[2] :
						arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
						fillAttrs[name] ? name : "";

					attrs.push({
						name: name,
						value: value,
						escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
					});
				});

				if ( handler.start ) handler.start( tagName, attrs, unary );
			}
		}
		/**
		 * 当标签闭合时，处理掉标签内部的所有标签
		 * @param {String} tag 匹配的标签
		 * @param {String} tagName 从匹配中提取出来的标签名
		 */
		function parseEndTag( tag, tagName ) {
			// If no tag name is provided, clean shop
			if ( !tagName ){
				var pos = 0;
			} else {
				// 在堆栈中找到最近的同类开放标签
				for ( var pos = stack.length - 1; pos >= 0; pos-- ) {
					if ( stack[ pos ] == tagName )
						break;
				}

			}
			// 如果最近的同类开放标签存在
			if ( pos >= 0 ) {
				// Close all the open elements, up the stack
				// 将该同类开放标签内部的所有开放标签闭合掉
				for ( var i = stack.length - 1; i >= pos; i-- ) {
					if ( handler.end )	handler.end( stack[ i ] );
				}
				// Remove the open elements from the stack
				// 将处理完的标签移出堆栈
				stack.length = pos;
			}

		}
	};

	this.HTMLtoXML = function( html ) {
		var results = "";

		HTMLParser(html, {
			start: function( tag, attrs, unary ) {
				results += "<" + tag;

				for ( var i = 0; i < attrs.length; i++ )
					results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {
				results += "</" + tag + ">";
			},
			chars: function( text ) {
				results += text;
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});

		return results;
	};

	this.HTMLtoDOM = function( html, doc ) {
		// There can be only one of these elements
		var one = makeMap("html,head,body,title");

		// Enforce a structure for the document
		var structure = {
			link: "head",
			base: "head"
		};

		if ( !doc ) {
			if ( typeof DOMDocument != "undefined" )
				doc = new DOMDocument();
			else if ( typeof document != "undefined" && document.implementation && document.implementation.createDocument )
				doc = document.implementation.createDocument("", "", null);
			else if ( typeof ActiveX != "undefined" )
				doc = new ActiveXObject("Msxml.DOMDocument");

		} else
			doc = doc.ownerDocument ||
				doc.getOwnerDocument && doc.getOwnerDocument() ||
				doc;

		var elems = [],
			documentElement = doc.documentElement ||
				doc.getDocumentElement && doc.getDocumentElement();

		// If we're dealing with an empty document then we
		// need to pre-populate it with the HTML document structure
		if ( !documentElement && doc.createElement ) (function(){
			var html = doc.createElement("html");
			var head = doc.createElement("head");
			head.appendChild( doc.createElement("title") );
			html.appendChild( head );
			html.appendChild( doc.createElement("body") );
			doc.appendChild( html );
		})();

		// Find all the unique elements
		if ( doc.getElementsByTagName )
			for ( var i in one )
				one[ i ] = doc.getElementsByTagName( i )[0];

		// If we're working with a document, inject contents into
		// the body element
		var curParentNode = one.body;

		HTMLParser( html, {
			start: function( tagName, attrs, unary ) {
				// If it's a pre-built element, then we can ignore
				// its construction
				if ( one[ tagName ] ) {
					curParentNode = one[ tagName ];
					return;
				}

				var elem = doc.createElement( tagName );

				for ( var attr in attrs )
					elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );

				if ( structure[ tagName ] && typeof one[ structure[ tagName ] ] != "boolean" )
					one[ structure[ tagName ] ].appendChild( elem );

				else if ( curParentNode && curParentNode.appendChild )
					curParentNode.appendChild( elem );

				if ( !unary ) {
					elems.push( elem );
					curParentNode = elem;
				}
			},
			end: function( tag ) {
				elems.length -= 1;

				// Init the new parentNode
				curParentNode = elems[ elems.length - 1 ];
			},
			chars: function( text ) {
				curParentNode.appendChild( doc.createTextNode( text ) );
			},
			comment: function( text ) {
				// create comment node
			}
		});

		return doc;
	};

	function makeMap(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	}

	return HTMLParser;

});