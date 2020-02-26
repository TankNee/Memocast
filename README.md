# neeto-vue

> 为知笔记客户端，使用electron构建，暂时还不提供本地文件的读取，所以所有的操作都是线上完成的，后期会考虑做本地文件。

### 实现了的功能

- [X] 登录
- [X] 选择登录的服务器--可以是官方也可以是自己的构建的docker镜像
- [X] 笔记文件夹树状显示，其中笔记和文件夹同级显示，同windows的操作目录
- [X] markdown文件的渲染和修改
- [X] 笔记的修改，删除，添加
- [X] 文件夹的修改，删除，添加 

### 运行时截图
<img src="https://img.tanknee.cn/blogpicbed/2020/02/2020022695d9aa97e199f.png" alt="登录到自己的docker镜像服务"/>

<img src="https://img.tanknee.cn/blogpicbed/2020/02/20200226ef23899092365.png"/>

<img src="https://img.tanknee.cn/blogpicbed/2020/02/2020022655449881c27cb.png"/>

本项目构建之后自带有一个demo账号，可以提供测试用

### TODO
- [ ] 图片上传
- [ ] 自定义图床
- [ ] 发布到博客
- [ ] 编辑本地文件
- [ ] 本地markdown文件转为笔记并上传
- [ ] 提供主题，夜间模式，优化显示效果 

### Build Setup

``` bash
# install dependencies
cnpm install

# serve with hot reload at localhost:9080
cnpm run dev

# build electron application for production
cnpm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
