---
sidebar_position: 2
---

# 🎄创建你自己的主题

> 此功能在 `2.1.7` 之后提供。

你可以在设置中选择主题。

![](/img/create-theme-1.png)

主题右侧有三个按钮，分别是帮助，刷新主题缓存，以及打开本地主题文件夹。

## 添加主题的步骤

1. 打开主题文件夹
2. 放入主题文件，并校验主题文件名是否符合[规范](#主题文件规范)！
3. 回到 Memocast 刷新主题缓存
4. 在下拉框中选择主题

## 主题文件规范

主题文件是一个纯粹的 `css` 文件，因此你可以使用任何与之相关的语法，Memocast 相关的元素选择器可以通过开发者工具查看，打开开发者工具的快捷键是：<kbd>Ctrl + Shift + P</kbd> ，Mac 下也可以直接使用顶部的菜单打开开发者工具。

**主题文件必须选择一种明暗模式**

明亮模式的主题的后缀应该是 `light.css`，而黑暗主题的后缀应该是 `dark.css`，如果命名不规范 Memocast 将会拒绝引入主题样式。

> Memocast 实现主题的方式实际上就是直接把 CSS 文件的内容插入到一个 `<style>` 标签中，因此你可以在开发者工具中快速调试，效果是完全一样的。

## CSS 变量

Memocast 提供了很多的实用 CSS 变量。

```css
:root {
    // 主题背景颜色
  --backgroundColor: #35373e;
    // 编辑器宽度
  --editorAreaWidth: 90%;
    // 笔记列表的背景颜色
  --activeItemBgColor: rgb(41, 42, 44);
  /*editor*/
    // 主题颜色，以透明度作为区分
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
    // 高亮颜色
  --highlightColor: rgba(102, 177, 255, .6);
  --selectionColor: rgba(70, 122, 189, .7);
    // 编辑区域的颜色，具体应用请在开发者工具中搜索
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

  --floatFontColor: rgba(255, 255, 255, .7);
  --floatBgColor: #3C4650;
  --floatHoverColor: rgba(255, 255, 255, .04);
  --floatBorderColor: rgba(0, 0, 0, .05);
  --floatShadow: rgba(0, 0, 0, 0.2);
  --maskColor: rgba(0, 0, 0, .7);
  --editorAreaWidth: 750px;
  --floatShadow: rgba(15, 15, 15, 0.03) 0px 0px 0px 1px, rgba(15, 15, 15, 0.04) 0px 3px 6px, rgba(15, 15, 15, 0.05) 0px 9px 24px;
}
```

你可以在这里找到默认主题：https://github.com/TankNee/Memocast/blob/master/src-electron/main-process/assets/css/Default-Dark.dark.css