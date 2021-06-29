// import oneDarkTheme from 'src/css/dark.theme.css'
// import oneDarkPrismTheme from 'src/css/prism/dark.theme.css'
// import ulyssesTheme from 'src/css/ulyssess.theme.css'

const oneDarkTheme = `:root {
  --backgroundColor: #35373e;

  /*editor*/
  --themeColor: #409eff;
  --themeColor90: rgba(64, 158, 255, .9);
  --themeColor80: rgba(64, 158, 255, .8);
  --themeColor70: rgba(64, 158, 255, .7);
  --themeColor60: rgba(64, 158, 255, .6);
  --themeColor50: rgba(64, 158, 255, .5);
  --themeColor40: rgba(64, 158, 255, .4);
  --themeColor30: rgba(64, 158, 255, .3);
  --themeColor20: rgba(64, 158, 255, .2);
  --themeColor10: rgba(64, 158, 255, .1);

  --highlightColor: rgba(102, 177, 255, .6);
  --selectionColor: rgba(102, 177, 255, .3);
  --editorColor: rgba(255, 255, 255, .7);
  --editorColor80: rgba(255, 255, 255, .8);
  --editorColor60: rgba(255, 255, 255, .6);
  --editorColor50: rgba(255, 255, 255, .5);
  --editorColor40: rgba(255, 255, 255, .4);
  --editorColor30: rgba(255, 255, 255, .3);
  --editorColor10: rgba(255, 255, 255, .1);
  --editorColor04: rgba(255, 255, 255, .04);
  --editorBgColor: #282828;
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
  --tableBorderColor: #363839;

  /*marktext*/
  --sideBarColor: rgba(255, 255, 255, .6);
  --sideBarIconColor: var(--iconColor);
  --sideBarTitleColor: rgba(255, 255, 255, .8);
  --sideBarTextColor: rgba(255, 255, 255, .4);
  --sideBarBgColor: #1e1e1e;
  --sideBarItemHoverBgColor: rgba(255, 255, 255, .03);
  --itemBgColor: #3f3f3f;

  --floatFontColor: rgba(255, 255, 255, .7);
  --floatBgColor: #3f3f3f;
  --floatHoverColor: rgba(255, 255, 255, .04);
  --floatBorderColor: rgba(0, 0, 0, .05);
  --floatShadow: rgba(0, 0, 0, 0.2);
  --maskColor: rgba(0, 0, 0, .7);
  --editorAreaWidth: 750px;
}

::-webkit-scrollbar {
  background: var(--editorBgColor);
}

.ag-front-menu .submenu,
.ag-float-wrapper {
  box-shadow: 0 4px 8px 0 var(--floatShadow) !important;
}

.title-bar .frameless-titlebar-button > div > svg {
  fill: #ffffff;
}
.title-bar .frameless-titlebar-minimize:hover,
.title-bar .frameless-titlebar-toggle:hover {
  background-color: rgb(255, 255, 255, .05);
}

.side-bar {
  border-right: 1px solid #1d1d1d !important;
}

.recent-files-projects a,
.open-project a {
  box-shadow: none !important;
}

.editor-tabs {
  box-shadow: none !important;
}
.editor-tabs:after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #1d1d1d;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.editor-tabs ul.tabs-container:after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #1d1d1d;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

.tabs-container > li,
.tabs-container > li.active {
  background: var(--editorBgColor) !important;
}

.aidou .search-wrapper {
  box-shadow: none;
}

.open-project button,
.recent-files-projects button {
  box-shadow: none !important;
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

/*
 * Prism.js theme (override light theme)
 */

/* @import url("prismjs/dark.theme.css"); */

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

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  overflow: visible;
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

const ulyssesTheme = `:root {
  --backgroundColor: #35373e;

  --themeColor: rgb(12, 139, 186);
  --themeColor90: rgba(12, 139, 186, .9);
  --themeColor80: rgba(12, 139, 186, .8);
  --themeColor70: rgba(12, 139, 186, .7);
  --themeColor60: rgba(12, 139, 186, .6);
  --themeColor50: rgba(12, 139, 186, .5);
  --themeColor40: rgba(12, 139, 186, .4);
  --themeColor30: rgba(12, 139, 186, .3);
  --themeColor20: rgba(12, 139, 186, .2);
  --themeColor10: rgba(12, 139, 186, .1);

  --highlightColor: rgba(12, 139, 186, .4);
  --selectionColor: rgba(0, 0, 0, .1);
  --editorColor: rgba(101, 101, 101, .7);
  --editorColor80: rgba(101, 101, 101, .8);
  --editorColor60: rgba(101, 101, 101, .6);
  --editorColor50: rgba(101, 101, 101, .5);
  --editorColor40: rgba(101, 101, 101, .4);
  --editorColor30: rgba(101, 101, 101, .3);
  --editorColor10: rgba(101, 101, 101, .1);
  --editorColor04: rgba(101, 101, 101, .04);
  --editorBgColor: #f3f3f3;
  --deleteColor: #cf000f;
  --iconColor: rgba(101, 101, 101, .8);
  --codeBgColor: #d8d8d869;
  --codeBlockBgColor: rgba(12, 139, 186, .05);
  --footnoteBgColor: rgba(0, 0, 0, .03);
  --inputBgColor: rgba(0, 0, 0, .06);
  --focusColor: var(--themeColor);

  --buttonFontColor: var(--editorColor);
  --buttonBgColor: #ffffff;
  --buttonBorder: 1px solid #dcdfe6;
  --buttonShadow: none;
  --buttonFontColorHover: var(--buttonFontColor);
  --buttonBgColorHover: linear-gradient(#fafafa, #f5f5f5);
  --buttonBorderHover: var(--buttonBorder);
  --buttonFontColorActive: var(--buttonFontColor);
  --buttonBgColorActive: #f5f5f5;
  --buttonBorderActive: var(--buttonBorder);
  --buttonFocusBorder: 1px solid var(--themeColor);

  --buttonPrimaryFontColor: #ffffff;
  --buttonPrimaryBgColor: var(--themeColor);
  --buttonPrimaryBorder: none;
  --buttonPrimaryShadow: 0 0 8px 0 rgba(0, 0, 0, .1);
  --buttonPrimaryFontColorHover: var(--buttonPrimaryFontColor);
  --buttonPrimaryBgColorHover: var(--buttonPrimaryBgColor);
  --buttonPrimaryBorderHover: var(--buttonPrimaryBorder);
  --buttonPrimaryFontColorActive: var(--buttonPrimaryFontColor);
  --buttonPrimaryBgColorActive: var(--buttonPrimaryBgColor);
  --buttonPrimaryBorderActive: var(--buttonPrimaryBorder);
  --buttonPrimaryFocusBorder: none;
  --buttonPrimaryFocusShadow: inset 0 0 0 1px rgba(5, 66, 89, 0.5), 0 0 0 1px var(--themeColor);
  --tableBorderColor: #e5e5e5;

  --sideBarColor: rgba(101, 101, 101, .6);
  --sideBarIconColor: var(--iconColor);
  --sideBarTitleColor: rgba(101, 101, 101, 1);
  --sideBarTextColor: rgba(101, 101, 101, .4);
  --sideBarBgColor: rgba(248, 248, 248, 0.9);
  --sideBarItemHoverBgColor: rgba(101, 101, 101, .03);
  --itemBgColor: rgba(245, 245, 245, 0.6);

  --floatFontColor: rgba(101, 101, 101, .7);
  --floatBgColor: #ffffff;
  --floatHoverColor: rgba(101, 101, 101, .04);
  --floatBorderColor: rgba(0, 0, 0, .03);
  --maskColor: rgba(232, 232, 232, .8);
  --editorAreaWidth: 750px;
}

.editor-tabs {
  box-shadow: none !important;
}

.tabs-container > li {
  border-right: 1px solid #e5e5e5 !important;
  background: var(--editorBgColor) !important;
}

/* ------------------------------------ */

h1, h2, h3, h4, h5, h6 {
  color: var(--themeColor);
  text-align: center;
}

li.ag-bullet-list-item {
  position: relative;
  list-style: none;
}
li.ag-bullet-list-item::before {
  content: '';
  display: block;
  position: absolute;
  width: 5px;
  height: 2px;
  left: -18px;
  top: 15px;
  background: var(--editorColor);
}

blockquote.ag-paragraph {
  background: rgb(233, 233, 233);
}
blockquote.ag-paragraph::before {
  content: none;
}

li.ag-paragraph {
  color: var(--editorColor);
}

/*task list*/
li.ag-task-list-item {
  list-style-type: none;
  position: relative;
}
li.ag-task-list-item > input[type=checkbox] {
  position: absolute;
  cursor: pointer;
  width: 16px;
  height: 16px;
  top: .1em;
  transform: rotate(-90deg);
  margin: 0;
  left: -24px;
  transform-origin: center;
  transition: all .2s ease;
}
li.ag-task-list-item > input.ag-checkbox-checked {
  transform: rotate(0);
  opacity: .5;
}
li.ag-task-list-item > input[type=checkbox]::before {
  content: '';
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  display: inline-block;
  border: 2px solid var(--editorColor);
  border-radius: 2px;
  background-color: var(--editorBgColor);
  position: absolute;
  top: 0;
  left: 0;
  transition: all .2s ease;
}
li.ag-task-list-item > input.ag-checkbox-checked::before {
  border: transparent;
  background-color: var(--editorColor);
}
li.ag-task-list-item > input::after {
  content: '';
  transform: rotate(-45deg) scale(0);
  width: 9px;
  height: 5px;
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  position: absolute;
  display: inline-block;
  top: 1px;
  left: 5px;
  transition: all .2s ease;
}
li.ag-task-list-item > input.ag-checkbox-checked::after {
  transform: rotate(-45deg) scale(1);
}

/*horizontal line*/
p:not(.ag-active)[data-role="hr"]::before {
  content: '';
  position: absolute;
  width: 50%;
  display: block;
  left: 50%;
  top: 50%;
  height: 2px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px dashed var(--editorColor50);
  transform: translateX(-50%) translateY(-50%);
}
`

export const oneDark = () => {
  return oneDarkTheme + '\n' + oneDarkPrismTheme
}

export const ulysses = () => {
  return ulyssesTheme
}
