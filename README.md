<h2 align="center">Neeto Vue</h2>

<p align="center">An Awesome Wiz Note Client</p>

<h3 align="center">English | <a href="./README-zh_cn.md" target="_self">简体中文</a></h3>

### Status

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/TankNee/Neeto-Vue/Neeto-Vue%20Release%20Action/master?label=REALSE%20ACTION&style=for-the-badge) ![GitHub Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/latest/total?style=for-the-badge) ![GitHub All Releases](https://img.shields.io/github/downloads/TankNee/Neeto-Vue/total?style=for-the-badge) ![GitHub Release Date](https://img.shields.io/github/release-date/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/TankNee/Neeto-Vue?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/TankNee/Neeto-Vue?style=for-the-badge)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_shield)

### Introduction

[In order to write notes, I develop a note application](https://www.tanknee.cn/2020/10/02/%E6%88%91%E4%B8%BA%E4%BA%86%E8%AE%B0%E7%AC%94%E8%AE%B0%E6%89%8B%E5%86%99%E4%BA%86%E4%B8%80%E4%B8%AA%E5%AE%A2%E6%88%B7%E7%AB%AF/)

### Wiz Community

Follow Wiz Community in WeChat：

![qrcode_for_gh_wizcommunity](./screenshot/qrcode_for_gh_wizcommunity.png)

If you intend to prompt the development of Wiz Community，join us pls！

### ScreenShot

![image-20200925170200202](./screenshot/image-20200925170200202.png)

![image-20200925170301170](./screenshot/image-20200925170301170.png)

![image-20200925170327136](./screenshot/image-20200925170327136.png)

### Installation

[Releases](https://github.com/TankNee/Neeto-Vue/releases/latest)

You are also be able to check update in Neeto-Vue Settings Dialog

![image-20201011103144579](./screenshot/image-20201011103144579.png)

#### Arch Linux

Install and upgrade from [AUR](https://aur.archlinux.org/packages/neeto-vue-bin/)

Thanks to [yjun123](https://github.com/yjun123)'s contribution.

```bash
# AUR helper
# yay
yay -S neeto-vue-bin

# pikaur
pikaur -S neeto-vue-bin
```

### Feature and Keymap

- More Beautiful

- More Powerful

- Lighter Size

- Better Dark Mode In Desktop Platform

- Export single note or whole note folder to certain path

- Loading Animation

- New version check

- International, support English and Chinese(Simplified)

- Keymap: [vditor keymap](#Feature and Keymap)

- Support to send note to flomo app

- Support note lock

### Attention

- There's another problem with copying notes, Since I haven't handled the transfer of note resources, I don't recommend copying notes for the time being
- Image upload service only supports drag and drop upload or fill in picture link directly
- When using the wiz official image service, only the temporary address of the image will be displayed
- For the time being, only the third-party Web upload service is available. (Settings > > editor > > image upload service) please refer to：[picgo-plugin-web-uploader](https://github.com/yuki-xin/picgo-plugin-web-uploader)
  - `url`: Picture upload api url
  - `paramName`: POST parameter name(eg:`image`)
  - `jsonPath`: Jsonpath of the return value of the image URL`(eg:data.url)`
  - `customHeader`: custom request http headers,using standard JSON schema(eg: `{"key":"value"}`)
  - `customBody`: custom request body, using standard JSON schema(eg: `{"key":"value"}`)

### Change Log

<details>
<summary>Version change log</summary>

## 2021 01 17 Update 1.0.2

1. Remove the underline of links
2. Extract source plain text from note content instead of using the origin markdown text

## 2020 12 22 Update 1.0.0

1. Realize the label system
2. Right click to upload pictures, which depends on picgo
3. Optimize a lot of details

## 2020 12 22 Update 0.0.23

1. To achieve a simpler image upload method: right click in the editor and select the image to upload.
2. Temporarily abandon the drag upload mode.

## 2020 12 19 Update 0.0.22

1. Add Chinese readme file
2. Improve the readme description
3. Add note locking function to make it easier to check notes.

## 2020 12 17 Update 0.0.21

1. Add flomo API support. Set > > Service > > flomo. Then use the right-click menu in the list to send notes to flomo
2. Upgrade note editor to v3.7.1
3. Cache key naming policy adjustment

## 2020 12 03 Update 0.0.20

1. Fixed the problem that the server could not display the folder when it returned the out of order folder list

## 2020 11 30 Update 0.0.19

1. Repair the export failure when there are illegal characters in the note name

## 2020 11 27 Update 0.0.18

1. Export a single file to markdown
2. Export the entire folder to the specified directory in the format of markdown

## 2020 09 27 Update 0.0.6

1. Better login experience
2. Optimize the interface without content
3. Optimize code logic

## 2020 09 26 Update 0.0.5

1. Add GitHub to build automatically

## 2020 09 25 Update 0.0.4

1. Optimize the header display in MacOS
2. Add vditor shortcut key, [shortcut key to check address]（ https://ld246.com/guide/markdown )
3. Optimization Icon
4. Add the Save button in the lower right corner of vdtor, but the outline button in the upper right corner has not been implemented
5. Learn from wizlite to open the links in notes
6. Optimize invalid code

## 2020 09 22 Update 0.0.3

1. Version updated to 0.0.3
2. Add drag and drop image upload
3. Drag the picture directly into the editor
4. Remember to click the location of the image to be inserted first, otherwise it will be inserted directly into the place where I last clicked. I have no way to fix it for the time being
5. Fix the size of editor area
6. Add notes to modify the date display
7. Fix the problem of missing translation

</details>

<details>
<summary>Keymap reference </summary>

[Origin Site](https://ld246.com/article/1582778815353#English)

## English

### Summary

| Name                   | Keymap                | Remarks           |
| ---------------------- | --------------------- | ----------------- |
| Emoji                  | :/⌘ E                 |                   |
| Headings               | Ctrl H / ⌘ H          | see below         |
| Bold                   | Ctrl B / ⌘ B          |                   |
| Italic                 | Ctrl I / ⌘ I          |                   |
| Strikeout              | Ctrl S / ⌘ S          |                   |
| Link                   | Ctrl K / ⌘ K          | see below         |
| Unordered List         | Ctrl L / ⌘ L          | see below         |
| Ordered List           | Ctrl O / ⌘ O          | see below         |
| Task List              | Ctrl J / ⌘ J          | see below         |
| Blockquote             | Ctrl ; / ⌘ ;          | see below         |
| Horizontal             | Ctrl Shift H  / ⌘ ⇧ H |                   |
| Code Block             | Ctrl U / ⌘ U          | see below         |
| Inline Code            | Ctrl G / ⌘ G          |                   |
| Insert Block to Before | Ctrl Shift B / ⌘ ⇧ B  | wysiwyg & ir mode |
| Insert Block to End    | Ctrl Shift E / ⌘ ⇧ E  | wysiwyg & ir mode |
| Table                  | Ctrl M / ⌘ M          | see below         |
| Undo                   | Ctrl Z / ⌘ Z          |                   |
| Redo                   | Ctrl Y / ⌘ Y          |                   |
| Hide Edit              | Ctrl P / ⌘ P          | sv mode           |
| Fullscreen             | Ctrl ' / ⌘ '          |                   |
| Move Block to Up       | Ctrl Shift U / ⌘ ⇧ U  | wysiwyg & ir mode |
| Move Block to Down     | Ctrl Shift D / ⌘ ⇧ D  | wysiwyg & ir mode |
| Remove                 | Ctrl Shift X / ⌘ ⇧ X  | wysiwyg mode      |
| At User                | @                     |                   |
| Mistyped               | Backspace             |                   |

### Headings Ctrl H / ⌘ H

| Name    | Keymap                                 |
| ------- | -------------------------------------- |
| Bigger  | Ctrl + / ⌘ +                           |
| Smaller | Ctrl - / ⌘ -                           |
| H1-H6   | Ctrl Alt 1/2/3/4/5/6 / ⌘ ⌥ 1/2/3/4/5/6 |
| Menu    | Ctrl H / ⌘ H                           |

### Link Ctrl K / ⌘ K

| Name                  | Keymap              |
| --------------------- | ------------------- |
| Toggle Input and Link | Alt Enter / ⌥ Enter |
| Toggle Input          | Tab                 |

### List Ctrl L/O/J / ⌘ L/O/J

| Name         | Keymap                                       | Remarks                                               |
| ------------ | -------------------------------------------- | ----------------------------------------------------- |
| Indent       | Tab Ctrl Shift I / ⌘ ⇧ I                     | Tab: Caret must be at Zero                            |
| Unindent     | Shift Tab / ⇧ Tab Ctrl Shift O / ⌘ ⇧ O Enter | Shift Tab / ⇧ Tab: Caret must be at Zero Enter: Empty |
| Toggle Check | Ctrl Shift J / ⌘ ⇧ J                         | Task List                                             |

### Blockquote Ctrl ; / ⌘ ;

| Name                    | Keymap                     | Remarks                                               |
| ----------------------- | -------------------------- | ----------------------------------------------------- |
| Move Caret to Top Start | Ctrl Alt Enter / ⌘ ⌥ Enter | wysiwyg mode                                          |
| Move Caret to Top End   | Alt Enter / ⌥ Enter        | wysiwyg mode                                          |
| Insert Blockquote       | Ctrl Shift : / ⌘ ⇧ :  >    | Ctrl Shift : / ⌘ ⇧ :: Block Element >: Inline Element |
| Toggle Blockquote       | Ctrl ; / ⌘ ;               |                                                       |

### Code Block Ctrl U / ⌘ U

| Name                        | Keymap              |
| --------------------------- | ------------------- |
| Toggle Input and Code Block | Alt Enter / ⌥ Enter |
| Hide Edit                   | Escape              |
| Select all Code Block       | Ctrl A / ⌘ A        |

### Table Ctrl M / ⌘ M

| Name                        | Keymap                      |
| --------------------------- | --------------------------- |
| Insert 1 above              | Ctrl + / ⌘ ⇧ F              |
| Insert 1 below              | Ctrl + / ⌘ +                |
| Delete Row                  | Ctrl - / ⌘ -                |
| Insert 1 left               | Ctrl Shift + / ⌘ ⇧ G        |
| Insert 1 right              | Ctrl Shift + / ⌘ ⇧ +        |
| Delete Column               | Ctrl Shift - / ⌘ ⇧ -        |
| Left Alignment              | Ctrl Shift L / ⌘ ⇧ L        |
| Center Alignment            | Ctrl Shift C / ⌘ ⇧ C        |
| Right Alignment             | Ctrl Shift R / ⌘ ⇧ R        |
| Move Caret to Input         | Alt Enter / ⌥ Enter         |
| Toggle Input                | Tab                         |
| Move Caret to Previous Cell | Shift Tab / ⇧ Tab Backspace |
| Move Caret to Next Cell     | Tab                         |

</details>

### License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FTankNee%2FNeeto-Vue?ref=badge_large)

