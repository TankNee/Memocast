---
sidebar_position: 1
---

# 参与 Memocast 的开发

> Memocast 使用 Quasar + Electron 作为基本框架，因此可以支持 macOS ，Windows 以及 Linux 等多种系统，但由于精力有限，所以 Linux 下并没有经过充分的测试，macOS 也会因为某些原因而未经测试，所以一般来说放出的新版本往往只能在 Windows 平台上得到一定的保证。

Memocast 并不复杂，可以说是十分简陋，没有复杂的设计模式，也没有使用 Typescript ，很多地方实际上比较混乱，有待改进，所以我十分欢迎你参与到 Memocast 的开发中来，我会尽力为你解答 Memocast 中一些可能令人疑惑的代码，如果我能说明白的话。

## 开发的前置知识

1. 你需要有 `Node.js`，`Git` 的环境。
2. 你需要熟悉 ES6 的 JavaScript 语法
3. 最好能熟悉 Quasar 的各种组件，并有一定的改进能力
4. 你需要熟悉 CSS ， HTML 的语法

## 在本地运行

首先你需要使用 git 工具将代码下载到本地。

```bash
git clone https://github.com/TankNee/Memocast.git
```

> 因为整个仓库中有许多图片资源，导致整体大小达到了 40+ MB，所以要求你有一个比较好的网络环境，当然你也可以使用国内的一些代理。

然后你需要安装依赖

```bash
npm i
```

安装依赖的过程可能比较长，这需要视你的网络环境而定。

以开发模式启动 Memocast

```bash
npm run dev
```

Memocast 并没有使用太多和 Native 相关的东西，因此不需要 Xcode 和 VS 环境也能运行。

开发模式下支持代码的热重载，只要你保存了代码文件，Memocast 就会自动重新加载应用更新。

## 编译 Memocast

使用如下命令编译你当前平台的 Memocast 二进制文件。

```bash
npm run build
```

同样这也需要良好的网络环境。

