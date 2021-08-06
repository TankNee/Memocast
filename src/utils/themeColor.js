// import oneDarkTheme from 'src/css/dark.theme.css'
// import oneDarkPrismTheme from 'src/css/prism/dark.theme.css'
// import lightTheme from 'src/css/lights.theme.css'

const oneDarkTheme = `:root {
  --backgroundColor: #35373e;
  --editorAreaWidth: 90%;
  --activeItemBgColor: rgb(41, 42, 44);
  /*editor*/
  --themeColor: rgb(242, 192, 55);
  --themeColor90: rgba(242, 192, 55, .9);
  --themeColor80: rgba(242, 192, 55, .8);
  --themeColor70: rgba(242, 192, 55, .7);
  --themeColor60: rgba(242, 192, 55, .6);
  --themeColor50: rgba(242, 192, 55, .5);
  --themeColor40: rgba(242, 192, 55, .4);
  --themeColor30: rgba(242, 192, 55, .3);
  --themeColor20: rgba(242, 192, 55, .2);
  --themeColor10: rgba(242, 192, 55, .1);

  --highlightColor: rgba(102, 177, 255, .6);
  --selectionColor: rgba(70, 122, 189, .7);
  --editorColor: rgba(222, 222, 222, .7);
  --editorColor80: rgba(222, 222, 222, .8);
  --editorColor60: rgba(222, 222, 222, .6);
  --editorColor50: rgba(222, 222, 222, .5);
  --editorColor40: rgba(222, 222, 222, .4);
  --editorColor30: rgba(222, 222, 222, .3);
  --editorColor10: rgba(222, 222, 222, .1);
  --editorColor04: rgba(222, 222, 222, .04);
  --editorBgColor: rgb(53, 55, 62);
  --deleteColor: #cf000f;
  --iconColor: rgba(255, 255, 255, .56);
  --codeBgColor: #424344;
  --codeBlockBgColor: #424344;
  --footnoteBgColor: rgba(66, 67, 68, .3);
  --inputBgColor: #2f3336;

  --focusColor: var(--themeColor);

  --buttonFontColor: rgba(255, 255, 255, .6);
  --buttonBgColor: #424344;
  --buttonBorder: 1px solid rgba(0, 0, 0, 0.2);
  --buttonShadow: none;
  --buttonFontColorHover: var(--buttonFontColor);
  --buttonBgColorHover: #4f5051;
  --buttonBorderHover: 1px solid rgba(0, 0, 0, 0.3);
  --buttonFontColorActive: var(--buttonFontColor);
  --buttonBgColorActive: #333434;
  --buttonBorderActive: var(--buttonBorder);

  --buttonPrimaryFontColor: #ffffff;
  --buttonPrimaryBgColor: var(--themeColor);
  --buttonPrimaryBorder: none;
  --buttonPrimaryShadow: none;
  --buttonPrimaryFontColorHover: var(--buttonPrimaryFontColor);
  --buttonPrimaryBgColorHover: #5aabff;
  --buttonPrimaryBorderHover: var(--buttonPrimaryBorder);
  --buttonPrimaryFontColorActive: var(--buttonPrimaryFontColor);
  --buttonPrimaryBgColorActive: #2791ff;
  --buttonPrimaryBorderActive: var(--buttonPrimaryBorder);
  --buttonPrimaryFocusBorder: none;
  --buttonPrimaryFocusShadow: inset 0 0 0 1px rgba(24, 26, 31, 0.5), 0 0 0 1px var(--themeColor);
  --tableBorderColor: rgb(158, 158, 158);
  --highlightThemeColor: rgb(170, 147, 114);

  --treeNodeColor: rgb(174, 180, 187);
  /*marktext*/
  --sideBarColor: rgba(255, 255, 255, .6);
  --sideBarIconColor: var(--iconColor);
  --sideBarTitleColor: rgba(255, 255, 255, .8);
  --sideBarTextColor: rgba(255, 255, 255, .4);
  --sideBarBgColor: #1e1e1e;
  --sideBarItemHoverBgColor: rgba(255, 255, 255, .03);
  --itemBgColor: #3C4650;

  --floatFontColor: rgba(255, 255, 255, .7);
  --floatBgColor: #3C4650;
  --floatHoverColor: rgba(255, 255, 255, .04);
  --floatBorderColor: rgba(0, 0, 0, .05);
  --floatShadow: rgba(0, 0, 0, 0.2);
  --maskColor: rgba(0, 0, 0, .7);
  --editorAreaWidth: 750px;
  --floatShadow: rgba(15, 15, 15, 0.03) 0px 0px 0px 1px, rgba(15, 15, 15, 0.04) 0px 3px 6px, rgba(15, 15, 15, 0.05) 0px 9px 24px;
}

::-webkit-scrollbar {
  background: var(--editorBgColor);
}

#ag-editor-id {
  color: #B8BFC6;
}

/* ------------------------------------ */

:not(pre) > code[class*="language-"],
pre:not(.CodeMirror-line),
pre[class*="language-"],
pre.ag-paragraph {
  background: var(--codeBlockBgColor) !important;
  border: none !important;
}
p:not(.ag-active)[data-role="hr"]::before {
  border-top: 2px dashed var(--editorColor10) !important;
  background: none !important;
}
figure.ag-active.ag-container-block > div.ag-container-preview {
  box-shadow: 0 3px 8px 0 var(--floatShadow) !important;
}
`

const oneDarkPrismTheme = `/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou

The MIT License (MIT)

Copyright (c) 2016 Adrián

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

 #mind code {
   color: inherit;
   background: transparent;
 }

code[class*="language-"],
pre.ag-paragraph {
  color: #ABB2BF;
  /*font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;*/
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  text-shadow: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  font-family: JetBrains Mono;
}

/* Code Fence */
pre.ag-paragraph {
  padding: 1em;
  margin: 1em 0;
  border-radius: 0.3em;
}

/* Inline Code */
:not(pre) > code[class*="language-"],
pre.ag-paragraph {
  background: #3a3f4b;
}

/* Inline Code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #5C6370;
}

.token.punctuation {
  color: #abb2bf;
}

.token.selector,
.token.tag {
  color: #e06c75;
}

.token.property,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.attr-name,
.token.deleted {
  color: #d19a66;
}

.token.string,
.token.char,
.token.attr-value,
.token.builtin,
.token.inserted {
  color: #98c379;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #56b6c2;
  background-color: transparent !important;
}

.token.atrule,
.token.keyword {
  color: #c678dd;
}

.token.function {
  color: #61afef;
}

.token.regex,
.token.important,
.token.variable {
  color: #c678dd;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
`

const lightTheme = `/* Common CSS use by both light and dark themes */
:root {
  --titleBarHeight: 32px;
  --editorAreaWidth: 90%;
  --backgroundColor: #ffffff;
  --activeItemBgColor: rgb(204, 207, 214);
  /*editor*/
  /*Theme color cluster*/
  --themeColor: rgba(25, 118, 210, 1);
  --themeColor90: rgba(25, 118, 210, .9);
  --themeColor80: rgba(25, 118, 210, .8);
  --themeColor70: rgba(25, 118, 210, .7);
  --themeColor60: rgba(25, 118, 210, .6);
  --themeColor50: rgba(25, 118, 210, .5);
  --themeColor40: rgba(25, 118, 210, .4);
  --themeColor30: rgba(25, 118, 210, .3);
  --themeColor20: rgba(25, 118, 210, .2);
  --themeColor10: rgba(25, 118, 210, .1);

  --highlightColor: rgba(25, 118, 210, .4);
  --selectionColor: #DAE3E9;
  --editorColor: rgba(0, 0, 0, .7);
  --editorColor80: rgba(0, 0, 0, .8);
  --editorColor60: rgba(0, 0, 0, .6);
  --editorColor50: rgba(0, 0, 0, .5);
  --editorColor40: rgba(0, 0, 0, .4);
  --editorColor30: rgba(0, 0, 0, .3);
  --editorColor10: rgba(0, 0, 0, .1);
  --editorColor04: rgba(0, 0, 0, .03);
  --editorBgColor: rgba(255, 255, 255, 1);
  --deleteColor: #ff6969;
  --iconColor: #6B737B;
  --codeBgColor: #d8d8d869;
  --codeBlockBgColor: rgba(0, 0, 0, 0.03);
  --inputBgColor: rgba(0, 0, 0, .06);
  --buttonBgColor: #ffffff;
  --buttonBorderColor: rgba(0, 0, 0, 0.2);
  --buttonShadow: rgba(0, 0, 0, 0.12);
  --buttonHover: #f2f2f2;
  --buttonActive: #e5e5e5;

  --treeNodeColor: rgb(62, 43, 42);
  --highlightThemeColor: rgb(100, 203, 154);

  /*marktext*/
  --sideBarColor: rgba(0, 0, 0, .6);
  --sideBarTitleColor: rgba(0, 0, 0, 1);
  --sideBarTextColor: rgba(0, 0, 0, .4);
  --sideBarBgColor: rgba(242, 242, 242, 0.9);
  --sideBarItemHoverBgColor: rgba(0, 0, 0, .03);
  --itemBgColor: rgba(255, 255, 255, 0.6);
  --floatBgColor: #fff;
  --floatHoverColor: rgba(0, 0, 0, .04);
  --floatBorderColor: rgba(0, 0, 0, .1);
  --floatShadow: rgba(15, 15, 15, 0.03) 0px 0px 0px 1px, rgba(15, 15, 15, 0.04) 0px 3px 6px, rgba(15, 15, 15, 0.05) 0px 9px 24px;
  --maskColor: rgba(255, 255, 255, .7);
  --tableBorderColor: rgb(158, 158, 158);
}
`

const lightPrismTheme = `/*
 * ------------------------------------
 * Prism.js light theme
 */

 #mind code {
   color: inherit;
   background: transparent;
 }

code[class*="language-"],
pre.ag-paragraph {
  color: black;
  /*font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;*/
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  text-shadow: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  font-family: JetBrains Mono;
}

/* Code Fence */
pre.ag-paragraph {
  padding: 1em;
  margin: 1em 0;
}

/* Inline Code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #690;
}

.token.inserted {
  color: #22863a;
  background: #f0fff4;
}

.token.deleted {
  color: #b31d28;
  background: #ffeef0;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #9a6e3a;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}

.token.function,
.token.class-name {
  color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
`

export const oneDark = () => {
  return oneDarkTheme + '\n' + oneDarkPrismTheme
}

export const light = () => {
  return lightTheme + '\n' + lightPrismTheme
}
