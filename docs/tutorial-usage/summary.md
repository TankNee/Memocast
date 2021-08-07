---
sidebar_position: 1
---

# 应用概览

## 介绍

一款基于 Electron 、Muya 、Monaco 和为知笔记的编辑器，实现了类似 Typora 的编辑体验，并添加了更优秀的源代码模式，更好的图片服务，支持为知笔记私有部署，提供了众多快捷键。


## 下载

你可以在 GitHub 的 Release 页面下载最新版本，与此同时，你也可以使用内置的更新按钮获取最新版本，注意 mac 并不支持直接使用内置更新，因为受限于 macOS 的安全策略，所有自动安装的应用应该被有效地签名。

GitHub Release：[Releases · TankNee/Memocast · GitHub](https://github.com/TankNee/Memocast/releases)

更多有关下载的内容请查看这个[指南](/docs/tutorial-usage/install-application)。

## 特色

1. 较为完整的为知服务的支持。

   1. 笔记增删查改

   2. 文件夹增删

   3. 笔记导出成 PNG、Markdown

   4. 笔记文件夹批量导出 Markdown

   5. 支持为知图片服务

   6. 笔记标签增删查改

   7. 私有化部署服务器的支持

2. 良好的 Markdown 编辑器体验

   1. 按下 @ 快捷输入

   2. 完整的快捷键支持，并在 macOS 下支持菜单和帮助查询。

   3. 将为知的网页剪辑笔记轻松转换为可阅读的 Markdown 文件

   4. 良好的图片支持，支持为知图片，支持 PicGo 上传图片，支持本地图片

   5. 相比 marktext ，编辑器做了很多的优化和本地化

   6. 支持笔记目录，支持目录跳转

   7. 支持流程图，vega 图，mermaid 图等等

   8. 笔记锁定模式，锁定之后键盘无法输入，减少误触

   9. 所见即所得，良好输入体验

   10. 支持 PicGo 图片服务，将笔记图片上传到指定图床

   11. 支持使用 pangu 格式化 markdown 文本，自动在中英文字符之间加入空格

       ```text
       你好Memocast => 你好 Memocast
       ```

3. 强大的源代码模式

   1. 使用 Monaco 作为源代码编辑器

   2. 使用 `CmdOrCtrl + Shift + .` 快捷切换源代码模式和 markdown 模式

   3. 语法高亮

   4. 侧边栏预览

4. 完整开源， 项目 All in Github，在网络畅通的情况下可以使用内置的自动更新，快速将软件更新到最新版。


## 截图展示

### 主界面

![](https://img.tanknee.cn/blogpicbed/2021/07/08/202107083870b7fefdc91.png)

### 编辑器

![](https://img.tanknee.cn/blogpicbed/2021/07/08/2021070803b63e24f9b6d.png)

### 快捷输入

![](https://img.tanknee.cn/blogpicbed/2021/07/08/20210708a8305ac3abc86.png)

### 源代码模式

![](https://img.tanknee.cn/blogpicbed/2021/07/08/20210708b84241135796a.png)

### 编辑器与国际化

![](https://img.tanknee.cn/blogpicbed/2021/07/13/202107135f7205e6b31ef.gif)

### 图片快速插入

![](https://img.tanknee.cn/blogpicbed/2021/07/13/202107133edb79c27785e.gif)

### 编辑器快捷操作

![](https://img.tanknee.cn/blogpicbed/2021/07/13/202107132123328bb83b9.gif)

### 切换源代码模式

![](https://img.tanknee.cn/blogpicbed/2021/07/13/20210713fd47059a2a7e6.gif)

### 打字机模式

![](https://img.tanknee.cn/blogpicbed/2021/07/13/20210713874ba9ea28ec8.gif)

更多特色功能还请下载之后体验


## 引用

感谢 Quasar Framework、Monaco 以及 MarkText 项目，从他们身上学到了很多，Memocast 有很多的灵感都来自他们，笔记的所见即所得编辑器来自 MarkText 中的 Muya 编辑器，源代码模式使用的编辑器来自 Monaca-Editor 项目。

感谢 Quasar 中文网，他们的文档对我有很大帮助。http://www.quasarchs.com/

## 贡献者

感谢所有 Memocast 和 Neeto-Vue 的贡献者！

Thanks to all Memocast's contributors as well as Neeto-Vue's contributors!

## 分发许可证

Copyright © 2021 [TankNee](https://github.com/TankNee).<br />
This project is [MIT](https://github.com/TankNee/Neeto-Vue/blob/master/LICENSE) licensed.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_large)
