<div align="center">
  <img title="" src="https://img.tanknee.cn/blogpicbed/2021/07/08/20210708fc3b67e797e90.png" alt="AppIcon" align="center" width="185">
  <h1>Memocast</h1>

  ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/TankNee/Neeto-Vue/Neeto-Vue%20Release%20Action/master?label=REALSE%20ACTION&style=for-the-badge) ![GitHub Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/latest/total?style=for-the-badge) ![GitHub All Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/total?style=for-the-badge) ![GitHub Release Date](https://img.shields.io/github/release-date/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/TankNee/Neeto-Vue?style=for-the-badge)

</div>

## Introduction

一款基于 Electron 、Muya 、Monaco 和为知笔记的编辑器，实现了类似 Typora 的编辑体验，并添加了更优秀的源代码模式，更好的图片服务，支持为知笔记私有部署，提供了众多快捷键。

## Download

你可以在 GitHub 的 Release 页面下载最新版本，与此同时，你也可以使用内置的更新按钮获取最新版本，注意 mac 并不支持直接使用内置更新，因为受限于 macOS 的安全策略，所有自动安装的应用应该被有效地签名。

GitHub Release：[Releases · TankNee/Memocast · GitHub](https://github.com/TankNee/Memocast/releases)

## Feature

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

4. 完整开源， 项目 All in Github， 在网络畅通的情况下可以使用内置的自动更新，快速将软件更新到最新版。


## Screenshot

### 主界面

![](https://img.tanknee.cn/blogpicbed/2021/07/08/202107083870b7fefdc91.png)

### 编辑器

![](https://img.tanknee.cn/blogpicbed/2021/07/08/2021070803b63e24f9b6d.png)

### 快捷输入

![](https://img.tanknee.cn/blogpicbed/2021/07/08/20210708a8305ac3abc86.png)

### 源代码模式

![](https://img.tanknee.cn/blogpicbed/2021/07/08/20210708b84241135796a.png)

更多特色功能还请下载之后体验


## Reference

感谢 Quasar Framework、Monaco 以及 MarkText 项目，从他们身上学到了很多，Memocast 有很多的灵感都来自他们，笔记的所见即所得编辑器来自 MarkText 中的 Muya 编辑器，源代码模式使用的编辑器来自 Monaca-Editor 项目。


## Sponsor

| <img title="" src="https://avatars.githubusercontent.com/u/15263378?v=4" alt="" width="189" data-align="center"> |
|:----------------------------------------------------------------------------------------------------------------:|
| https://github.com/lifeend                                                                                       |

## Contributor

感谢所有Memocast和Neeto-Vue的贡献者！

Thanks to all Memocast's contributors as well as Neeto-Vue's contributors!

## License

MIT @[TankNee](https://github.com/TankNee)
