---
sidebar_position: 5
---

# 🔪导出笔记与上传

> 导出功能在 `2.1.9` 之后的版本得到完善。

Memocast 可以将使用为知笔记或 Memocast 写的笔记导出成通用的 Markdown，供给一般的本地 Markdown 文本编辑器使用。

当然，Memocast 无法保证所有导出都有完美的效果。

Markdown 文本中的图片会以本地图片的形式导出到笔记文件同级目录下的 `ExportImage` 文件夹中，并替换笔记中所有可识别的图片路径。

## 将导出的文件中的图片上传到图床

如果你需要将导出的笔记发布到网络上，那么你或许会需要将图片上传到指定图床以便网络访问。因此我写了一个笔记图片上传工具，可以识别文件夹中的markdown文件，并自动上传本地图片。

上传服务使用的是 PicGo，需要保持 PicGo 的启动，当你在使用该工具时。

### 安装 `ndm-cli`

首先请确保你有 `npm` 与 `node` 环境，没有请谷歌安装。

在终端或者 cmd 中运行下面的指令。

```bash
npm install ndm-cli -g
```

然后定位到刚刚导出的笔记的目录。

```bash
ndm upload <Your-Note-File-Name>
```

然后等待图片上传完成即可，上传之后会自动替换笔记所有的本地图片链接。

### `ndm-cli` 简易文档

```bash
 tanknee@LAPTOP  ~  ndm -h
  Usage: ndm [options] [command]

  Commands:
    config     Configure local .ndmrc file by command line interface    
    create     Create a note by template in current folder or the folder specified by config file (.ndmrc)
    flomo      Save message to flomo
    help       Display help
    init       Initialize the note folder, providing a simple configuration file with .ndmrc
    lint       Lint markdown note files using the remark cli (TODO)
    templates  Show all templates that have installed
    upload     Upload local images which are found in note file
    version    Display version

  Options:
    -a, --all               Upload all images of a folder
    -e, --ext [value]       Extension of note file, md,txt etc. (defaults to "md")
    -g, --global            Set global .ndmrc file
    -h, --help              Output usage information
    -l, --language [value]  Choose the language of note template, en-us,zh-cn etc. -l or --language (defaults to "zh-cn")
    -r, --recursion         Recursively call the input to file path
    -t, --type [value]      Choose the type of note template. leetcode, plain note or costum template from internet(https://.
..) etc. -t or --type <type name> (defaults to "leetcode")
    -v, --version           Output the version number

  Examples:
    - Create a markdown note in relative path ./note which name is test.md and apply template by zh-cn
    $ ndm create ./note/test.md -l zh-cn -t leetcode -e md

    - Send message to flomo app!
    $ ndm flomo 'Hello Flomo!'

    - Config your .ndmrc file which is found on the local scale or global.
    $ ndm config flomourl=123123 < -g >
    
    - Upload Images
    $ ndm upload test.md
```

### `ndm-cli` 仓库地址

GitHub: https://github.com/TankNee/ndm-cli
