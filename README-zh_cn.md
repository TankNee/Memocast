<div align="center">
  <h1>Neeto Vue</h1>

  <img src="./src-electron/icons/192.png" style="zoom: 33%;"  alt="logo"/>

  <h3>又一个设计优良的为知笔记客户端</h3>

  <h3><a href="./README.md" target="_self">English</a> | 简体中文</h3>

  ### 状态

  ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/TankNee/Neeto-Vue/Neeto-Vue%20Release%20Action/master?label=REALSE%20ACTION&style=for-the-badge) ![GitHub Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/latest/total?style=for-the-badge) ![GitHub All Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/total?style=for-the-badge) ![GitHub Release Date](https://img.shields.io/github/release-date/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/TankNee/Neeto-Vue?style=for-the-badge)

</div>

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

#### Arch Linux

可以通过 [AUR](https://aur.archlinux.org/packages/neeto-vue-bin/) 安装

感谢[yjun123](https://github.com/yjun123)。

```bash
# AUR helper
# yay
yay -S neeto-vue-bin

# pikaur
pikaur -S neeto-vue-bin
```

### 特色

- 更加舒适的设计

- 更加实用的功能

- 相对更小的空间占用

- 更好的黑暗模式

- 方便的笔记层级展示

- 加载动画

- 新版本检测

- 国际化，支持简体中文与英文

- 快捷键: [vditor 快捷键](#更新记录与快捷键)

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

### 更新记录与快捷键

<details>
<summary>版本变更记录</summary>

## 2021 06 22 Update 1.0.3

1. 修复 #72，#73
2. 修复依赖的一些问题

## 2021 01 17 Update 1.0.2

1. 去除超链接的下划线
2. 文章目录识别时自动提取标题的内容而不是使用Markdown原文本

## 2020 12 22 Update 1.0.0

1. 实现标签系统
2. 实现图片右键上传，此功能依赖PicGo
3. 大量细节优化

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

<details>
<summary>快捷键指南</summary>

[Vditor 快捷键](https://ld246.com/article/1582778815353#%E4%B8%AD%E6%96%87)

## 中文

### 通用

| 名称           | 快捷键                | 备注              |
| -------------- | --------------------- | ----------------- |
| 表情           | :/⌘ E                 |                   |
| 标题           | Ctrl H / ⌘ H          | 参见下文          |
| 粗体           | Ctrl B / ⌘ B          |                   |
| 斜体           | Ctrl I / ⌘ I          |                   |
| 删除线         | Ctrl S / ⌘ S          |                   |
| 链接           | Ctrl K / ⌘ K          | 参见下文          |
| 无序列表       | Ctrl L / ⌘ L          | 参见下文          |
| 有序列表       | Ctrl O / ⌘ O          | 参见下文          |
| 任务列表       | Ctrl J / ⌘ J          | 参见下文          |
| 引用           | Ctrl ; / ⌘ ;          | 参见下文          |
| 分割线         | Ctrl Shift H  / ⌘ ⇧ H |                   |
| 代码块         | Ctrl U / ⌘ U          | 参见下文          |
| 代码           | Ctrl G / ⌘ G          |                   |
| 元素前插入空块 | Ctrl Shift B / ⌘ ⇧ B  | wysiwyg & ir 模式 |
| 元素后插入空块 | Ctrl Shift E / ⌘ ⇧ E  | wysiwyg & ir 模式 |
| 表格           | Ctrl M / ⌘ M          | 参见下文          |
| 撤销           | Ctrl Z / ⌘ Z          |                   |
| 重做           | Ctrl Y / ⌘ Y          |                   |
| 隐藏编辑器     | Ctrl P / ⌘ P          | sv 模式           |
| 全屏           | Ctrl ' / ⌘ '          |                   |
| 向上移动块元素 | Ctrl Shift U / ⌘ ⇧ U  | wysiwyg & ir 模式 |
| 向下移动块元素 | Ctrl Shift D / ⌘ ⇧ D  | wysiwyg & ir 模式 |
| 移除当前元素   | Ctrl Shift X / ⌘ ⇧ X  | wysiwyg 模式      |
| At 用户        | @                     |                   |
| 错误输入       | Backspace             |                   |

### 标题 Ctrl H / ⌘ H

| 名称     | 快捷键                                 |
| -------- | -------------------------------------- |
| 变大     | Ctrl + / ⌘ +                           |
| 变小     | Ctrl - / ⌘ -                           |
| H1-H6    | Ctrl Alt 1/2/3/4/5/6 / ⌘ ⌥ 1/2/3/4/5/6 |
| 弹出菜单 | Ctrl H / ⌘ H                           |

### 链接 Ctrl K / ⌘ K

| 名称                 | 快捷键              |
| -------------------- | ------------------- |
| 输入框和元素之间切换 | Alt Enter / ⌥ Enter |
| 输入框之间切换       | Tab                 |

### 列表 Ctrl L/O/J / ⌘ L/O/J

| 名称               | 快捷键                                       | 备注                                                  |
| ------------------ | -------------------------------------------- | ----------------------------------------------------- |
| 缩进               | Tab Ctrl Shift I / ⌘ ⇧ I                     | Tab: 光标需位于开头                                   |
| 反向缩进           | Shift Tab / ⇧ Tab Ctrl Shift O / ⌘ ⇧ O Enter | Shift Tab / ⇧ Tab: 光标需位于开头 Enter: 需为空列表项 |
| 完成和待办之间切换 | Ctrl Shift J / ⌘ ⇧ J                         | 任务列表                                              |

### 引用 Ctrl ; / ⌘ ;

| 名称                 | 快捷键                     | 备注                                                       |
| -------------------- | -------------------------- | ---------------------------------------------------------- |
| 在顶层引用前插入空块 | Ctrl Alt Enter / ⌘ ⌥ Enter | wysiwyg 模式                                               |
| 在顶层引用后插入空块 | Alt Enter / ⌥ Enter        | wysiwyg 模式                                               |
| 插入块元素           | Ctrl Shift : / ⌘ ⇧ :  >    | Ctrl Shift : / ⌘ ⇧ :: 块元素变为引用 >: 内联元素中插入引用 |
| 引用和块元素之间切换 | Ctrl ; / ⌘ ;               |                                                            |

### 代码块 Ctrl U / ⌘ U

| 名称                   | 快捷键              |
| ---------------------- | ------------------- |
| 输入框和代码块之间切换 | Alt Enter / ⌥ Enter |
| 隐藏编辑界面           | Escape              |
| 选中所有代码           | Ctrl A / ⌘ A        |

### 表格 Ctrl M / ⌘ M

| 名称                   | 快捷键                      |
| ---------------------- | --------------------------- |
| 在上方插入一行         | Ctrl + / ⌘ ⇧ F              |
| 在下方插入一行         | Ctrl + / ⌘ +                |
| 删除行                 | Ctrl - / ⌘ -                |
| 在左边插入一列         | Ctrl Shift + / ⌘ ⇧ G        |
| 在右边插入一列         | Ctrl Shift + / ⌘ ⇧ +        |
| 删除列                 | Ctrl Shift - / ⌘ ⇧ -        |
| 左对齐                 | Ctrl Shift L / ⌘ ⇧ L        |
| 中对齐                 | Ctrl Shift C / ⌘ ⇧ C        |
| 右对齐                 | Ctrl Shift R / ⌘ ⇧ R        |
| 光标移动到输入框中     | Alt Enter / ⌥ Enter         |
| 输入框之间切换         | Tab                         |
| 将光标移动到上一个元素 | Shift Tab / ⇧ Tab Backspace |
| 将光标移动到下一个元素 | Tab                         |

</details>

### 许可证

Copyright © 2021 [tanknee <nee@tanknee.cn>](https://github.com/TankNee).<br />
This project is [MIT](https://github.com/TankNee/Neeto-Vue/blob/master/LICENSE) licensed.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_large)
