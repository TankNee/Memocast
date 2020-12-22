<h2 align="center">Neeto Vue</h2>

<p align="center">又一个设计优良的为知笔记客户端</p>

<h3 align="center"><a href="./README.md" target="_self">English</a> | 简体中文</h3>

### 目录

[目录](#目录)

[状态](#状态)

[介绍](#介绍)

[为知社区](#为知社区)

[软件截图](#软件截图)

[下载](#下载)

[特色](#特色)

[注意事项](#注意事项)

[更新日志](#更新记录)

### 状态

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/TankNee/Neeto-Vue/Neeto-Vue%20Release%20Action/master?label=REALSE%20ACTION&style=for-the-badge) ![GitHub Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/latest/total?style=for-the-badge) ![GitHub All Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/total?style=for-the-badge) ![GitHub Release Date](https://img.shields.io/github/release-date/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/TankNee/Neeto-Vue?style=for-the-badge)[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_shield)

### 介绍

[为了记笔记，我写了一个笔记客户端](https://www.tanknee.cn/2020/10/02/%E6%88%91%E4%B8%BA%E4%BA%86%E8%AE%B0%E7%AC%94%E8%AE%B0%E6%89%8B%E5%86%99%E4%BA%86%E4%B8%80%E4%B8%AA%E5%AE%A2%E6%88%B7%E7%AB%AF/)

### 为知社区

关注为知社区订阅号，获取最新信息：

![qrcode_for_gh_wizcommunity](./screenshot/qrcode_for_gh_wizcommunity.png)

如果你愿意促进社区发展，那[加入我们](https://github.com/altairwei/WizNotePlus/blob/master/加入我们)吧！

### 软件截图

![image-20200925170200202](./screenshot/image-20200925170200202.png)

![image-20200925170301170](./screenshot/image-20200925170301170.png)

![image-20200925170327136](./screenshot/image-20200925170327136.png)

### 下载

[发行版](https://github.com/TankNee/Neeto-Vue/releases/latest)

您也可以在设置弹窗中检查笔记的最新版本

![image-20201011103144579](./screenshot/image-20201011103144579.png)

### 特色

- 更加舒适的设计

- 更加实用的功能

- 相对更小的空间占用

- 更好的黑暗模式

- 方便的笔记层级展示

- 加载动画

- 新版本检测

- 国际化，支持简体中文与英文

- 快捷键: [vditor 快捷键](https://ld246.com/guide/markdown)

- 支持将笔记发送到 Flomo 浮墨

- 支持笔记锁定模式

### 注意事项

- 移动笔记时还存在一些问题。暂时不可用。
- 图片上传还只支持拖拽上传和直接填写图片链接
- 使用为知官方图片服务时只会显示图片的临时地址
- 图片上传服务暂时只可用第三方 web 上传服务。(设置 >> 编辑器 >> 图片上传服务)参数填写方式请参照：[picgo-plugin-web-uploader](https://github.com/yuki-xin/picgo-plugin-web-uploader)
  - `url`: 图床上传 API 地址
  - `paramName`: POST 参数名(eg:`image`)
  - `jsonPath`: 图片 URL 所在返回值的`JsonPath(eg:data.url)`
  - `customHeader`: 自定义请求头 标准 JSON(eg: `{"key":"value"}`)
  - `customBody`: 自定义 Body 标准 JSON(eg: `{"key":"value"}`)

### 更新记录

<details>
<summary>版本变更记录</summary>

## 2020 12 22 Update 0.0.23

1. 实现更简单的图片上传方式：在编辑器中右键选择图片上传。
2. 暂时废弃拖拽上传的方式。

## 2020 12 19 Update 0.0.22

1. 添加中文 Readme 文件
2. 完善 readme 描述
3. 添加笔记锁定功能，实现更方便的笔记查阅。

## 2020 12 17 Update 0.0.21

1. 添加 Flomo Api 的支持。 设置 >> 服务 >> 浮墨. 然后在列表中使用右键菜单即可将笔记发送到 Flomo
2. 笔记编辑器升级到 v3.7.1
3. 缓存 key 命名策略调整

## 2020 12 03 Update 0.0.20

1. 修复服务器返回乱序文件夹列表时无法显示文件夹的问题

## 2020 11 30 Update 0.0.19

1. 修复笔记名称中带有非法字符时导出失败

## 2020 11 27 Update 0.0.18

1. 单个文件导出为 Markdown
2. 导出整个文件夹到指定目录，格式为 Markdown

## 2020 09 27 Update 0.0.6

1. 实现更好的登录体验
2. 优化无内容时的界面
3. 优化代码逻辑

## 2020 09 26 Update 0.0.5

1. 添加 github 自动构建

## 2020 09 25 Update 0.0.4

1. 优化 macos 下的 header 显示
2. 添加 vditor 快捷键，[快捷键查阅地址](https://ld246.com/guide/markdown)
3. 优化图标
4. 添加 vditor 右下角的保存按钮，右上角的 outline 按钮还没有实现
5. 借鉴 wizlite 实现笔记中的链接外部打开
6. 优化无效代码

## 2020 09 22 Update 0.0.3

1. 版本更新至 0.0.3
2. 添加图片的拖拽上传
   1. 将图片直接拖入到编辑器中
   2. 记得要先点击图片要插入的位置，否则会直接插入到上一次点击的地方，我暂时没找到办法修复
3. 修复编辑器区域大小的问题
4. 添加笔记修改日期的显示
5. 修复了翻译缺失的问题

</details>

### License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_large)
