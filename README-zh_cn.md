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

[更新日志](#更新日志changelogmd)

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

- Arch Linux

可以通过 [AUR](https://aur.archlinux.org/packages/neeto-vue-bin/) 安装

```
# AUR helper
# yay
yay -S neeto-vue-bin

# pikaur
pikaur -S neeto-vue-bin
```

### 特色

- 更加舒适的设计

- 更加使用的功能

- 相对更小的空间占用

- 更好的黑暗模式

- 方便的笔记层级展示

- 加载动画

- 新版本检测

- 国际化，支持简体中文与英文

- 快捷键: [vditor 快捷键](https://ld246.com/guide/markdown)


### 注意事项

- 移动笔记时还存在一些问题。暂时不可用。
- 图片上传还只支持拖拽上传和直接填写图片链接
- 使用为知官方图片服务时只会显示图片的临时地址
- 图片上传服务暂时只可用第三方web上传服务。(设置 >> 编辑器 >> 图片上传服务)参数填写方式请参照：[picgo-plugin-web-uploader](https://github.com/yuki-xin/picgo-plugin-web-uploader)
  - `url`: 图床上传API地址
  - `paramName`: POST参数名(eg:`image`)
  - `jsonPath`: 图片URL所在返回值的`JsonPath(eg:data.url)`
  - `customHeader`: 自定义请求头 标准JSON(eg: `{"key":"value"}`)
  - `customBody`: 自定义Body 标准JSON(eg: `{"key":"value"}`)

### [更新日志](./CHANGELOG.md)

### License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_large)
