/**
* @Description: 主界面编辑视图
* @Author: TankNee
* @Date: 2/23/2020 8:47 AM
**/
<template>
    <div class="main">
        <el-tree
                class="file-tree"
                :data="fileTree"
                :props="defaultProps"
                @node-click="handleFileClick"
                v-loading="isLoading"
                node-key="id"
                ref="ft"
        ></el-tree>
        <mavon-editor
                v-model="content"
                :preview="preview"
                ref=md
                class="markdown"
                style="box-shadow: none;border-left: 1px solid rgb(237,237,237);"
                :toolbarsFlag="false"
                :navigation="showNav"
                placeholder="Write your ideas"
        />
    </div>

</template>

<script>
    import Home from "./common/Home";
    import bus from "./common/Bus";
    import api from "../utils/api";
    import {mavonEditor} from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';

    export default {
        name: 'IndexPage',
        components: {
            Home,
            mavonEditor
        },
        data() {
            return {
                value1: 30,
                showNav: false,
                defaultProps: [],
                content: '',
                preview: '',
                isLogin: false,
                isLoading: false,
                configs: {
                    spellChecker: false // 禁用拼写检查
                },
                fileTree: [],
                folderPathsArray: [],
                treeId: 1,
            };
        },
        methods: {
            handleFileClick(node) {
                console.log(node);
                if (node.isLoaded && node.type === 'folder') {
                    return;
                }
                node.isLoaded = true;
                console.log(node);
                // this.$refs.ft.updateKeyChildren(node.id, node);
                var path = '';
                console.log(this.folderPathsArray);
                this.folderPathsArray.forEach(fpa => {
                    if (fpa[fpa.length - 1] === node.label) {
                        path = fpa[0];
                        for (let i = 1; i < fpa.length; i++) {
                            path = `${path}/${fpa[i]}`;
                        }
                    }
                });
                var userSettings = JSON.parse(localStorage.getItem('userSettings'));
                //如果点击的是文件夹，就加载这个文件夹的笔记
                if (node.type === 'folder') {
                    this.isLoading = true;
                    api.getFolderNotes({
                        kbServer: userSettings.kbServer,
                        kbGuid: userSettings.kbGuid,
                        data: {
                            start: 0,
                            count: 100,
                            category: `/${path}/`,
                            orderBy: 'modified',
                            ascending: 'desc',
                            withAbstract: 'true',
                            clientType: 'web',
                            clientVersion: 4.0,
                            lang: 'zh-cn',
                        }
                    }).then(res => {
                        console.log(res);
                        res.result.forEach(note => {
                            const newChild = {
                                label: note.title,
                                type: 'file',
                                id: this.treeId++,
                                docGuid: note.docGuid,
                                kbGuid: note.kbGuid
                            };
                            this.$refs.ft.append(newChild, node.id);
                            console.log(note);
                        });
                    }).catch(err => {
                        console.log(err);
                    }).then(() => {
                        this.isLoading = false;
                    });
                } else {
                    api.getNoteContent({
                        kbGuid: node.kbGuid,
                        docGuid: node.docGuid,
                        data: {
                            downloadInfo: 1,
                            downloadData: 1,
                            clientType: 'web',
                            clientVersion: 4.0,
                            lang: 'zh-cn',
                        }
                    }).then(res => {
                        // if (document.body.createTextRange) {
                        //     var range = document.body.createTextRange();
                        //     range.moveToElementText(htmlView);
                        //     range.select();
                        // } else if (window.getSelection) {
                        //     var selection = window.getSelection();
                        //     var range = document.createRange();
                        //     range.selectNodeContents(htmlView);
                        //     selection.removeAllRanges();
                        //     selection.addRange(range);
                        // } else {
                        //     console.warn("none");
                        // }
                        // document.execCommand("Copy");
                        // window.getSelection().empty();
                        var re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
                        var patten = /(<body).*(<\/body>)/g;
                        var msg = patten.exec(res.html)[0].replace(re1, '');//执行替换成空字符
                        console.log(msg);
                        this.content = msg;
                        console.log(this.preview);
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            /**
             * 处理文件夹路径
             * @param folderPaths 文件夹路径数组
             */
            dealFileFolder(folderPaths) {
                var maxLevel = 0;
                // 首先将文件夹的名字解析成数组
                var folderPathsArray = [];
                folderPaths.forEach(fp => {
                    var temp = fp.split('/').splice(1);
                    folderPathsArray.push(temp.splice(0, temp.length - 1));
                });
                console.log(folderPathsArray);
                this.folderPathsArray = folderPathsArray;

                // 再处理一级目录
                folderPathsArray.forEach((fpa, index) => {
                    console.log(fpa);
                    if (fpa.length > maxLevel) {
                        maxLevel = fpa.length;
                    }
                    if (fpa.length === 1) {
                        this.fileTree.push({
                            type: 'folder',
                            isLoaded: false,
                            id: this.treeId,
                            label: fpa[0]
                        });
                        this.treeId = this.treeId + 1;
                    }
                });
                // 接着处理其他级别的目录
                folderPathsArray.forEach((fpa, index) => {
                    this.fileTree.forEach(node => {
                        if (fpa.length !== 1 && node.label === fpa[0]) {
                            node = this.insertFolderNode(node, fpa);
                        }
                    });
                });

            },
            /**
             * 插入文件夹节点
             * @param topNode 顶级节点
             * @param folderPathsArray 文件夹名数组--包含父文件夹
             */
            insertFolderNode(topNode, folderPathsArray) {
                if (folderPathsArray.length === 1) {
                    return topNode;
                }
                // 如果没有子节点集，那么直接创建
                if (!topNode.children) {
                    topNode['children'] = [];
                    let child = {
                        type: 'folder',
                        isLoaded: false,
                        id: this.treeId,
                        label: folderPathsArray[1]
                    };
                    this.treeId = this.treeId + 1;
                    // 创建指定的目录树
                    topNode.children.push(this.insertFolderNode(child, folderPathsArray.slice(1)));
                    return topNode;
                } else if (folderPathsArray.length === 2) {
                    let child = {
                        type: 'folder',
                        isLoaded: false,
                        id: this.treeId,
                        label: folderPathsArray[1]
                    };
                    this.treeId = this.treeId + 1;
                    return topNode.children.push(child);
                }
                topNode.children.forEach(child => {
                    if (child.label === folderPathsArray[1]) {
                        this.insertFolderNode(child, folderPathsArray.slice(1));
                    }
                });
            },
        },
        created() {
            //登陆成功
            bus.$on('Login Successfully', () => {
                this.isLoading = true;
                this.isLogin = true;
                var settings = JSON.parse(localStorage.getItem('userSettings'));
                console.log(settings);
                api.getFolders({
                    kbServer: settings.kbServer,
                    kbGuid: settings.kbGuid,
                }).then(res => {
                    if (res.returnCode !== 200) {
                        this.$message({
                            message: `${res.returnMessage}`,
                            type: 'warning'
                        });
                    } else {
                        this.dealFileFolder(res.result);
                        this.isLoading = false;
                    }
                });
            });
        }
    };
</script>

<style scoped>
    .main {
        display: flex;
        height: calc(100% - 35px);
        resize: none;
        width: calc(100% - 75px);
        position: absolute;
    }

    .file-tree {
        width: 200px;
    }

    .markdown {
        width: calc(100% - 200px);
    }
</style>
