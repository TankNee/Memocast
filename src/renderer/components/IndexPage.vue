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
                @node-expand="handleEx"
                @node-collapse="handleColl"
                node-key="id"
                accordion
                ref="ft"
        >
            <span slot-scope="{ node, data }">
                <i :class="getNodeIcon(node,data)"></i>
                <span style="padding-left: 4px;">{{node.label}}</span>
            </span>

        </el-tree>
        <mavon-editor
                v-model="content"
                :preview="preview"
                ref=md
                class="markdown"
                style="box-shadow: none;border-left: 1px solid rgb(237,237,237);"
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

    const he = require('he');
    const html2markdown = require('../utils/lib/html2markdown/index');
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
            handleFileClick(data, Node) {
                var node = data;
                console.log(Node);
                // if (node.type.indexOf('file') !== -1 && node.type.indexOf('-opened') === -1) {
                //     node.type = node.type + '-opened';
                //     console.log(node.type);
                // } else if (node.type.indexOf('file') !== -1) {
                //     node.type = node.type.replace('-opened', '');
                // }
                if (node.isLoaded && node.type.indexOf('folder') !== -1) {
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
                if (node.type.indexOf('folder') !== -1) {
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
                        const re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
                        const patten = /(<body).*(<\/body>)/g;
                        const patten2 = /<span\sdata-wiz-span="data-wiz-span"\sstyle="font-size:\s10\.5pt;">/g;
                        const patten3 = /<span\sdata-wiz-span="data-wiz-span"\sstyle="font-size: 0\.875rem;">/g;
                        const body = patten.exec(res.html)[0];//执行替换成空字符
                        let text = html2markdown(body, {
                            imgBaseUrl: `${api.getBaseUrl()}/ks/note/view/${node.kbGuid}/${node.docGuid}/`,
                            resources: res.resources
                        });
                        text = text.replace(/&nbsp;/g, '\u0020'); // 将空格统一为转化成半角空格
                        text = he.decode(text); // 处理其他实体字符
                        text = text.replace(patten2, '');
                        text = text.replace(patten3, '');
                        console.log(text.indexOf('data-wiz-span'));
                        this.content = text;
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            handleEx(data, Node) {
                if (data.type.indexOf('-opened') === -1) {
                    data.type = data.type + '-opened';
                }
            },
            handleColl(data, Node) {
                console.log(data);
                data.type = data.type.replace('-opened', '');
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
            /**
             * 获取节点的图标
             * @param node
             * @param data
             * @returns {string}
             */
            getNodeIcon(node, data) {
                var icon;
                console.log(data.type);
                if (data.type === 'folder') {
                    icon = 'el-icon-folder';
                } else if (data.type === 'folder-opened') {
                    icon = 'el-icon-folder-opened';
                } else if (data.type === 'file') {
                    icon = 'el-icon-notebook-1';
                } else if (data.type === 'file-opened') {
                    icon = 'el-icon-notebook-2';
                }
                console.log(icon);
                return icon;
            }
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
            // 退出成功
            bus.$on('Logout Successfully', () => {
                this.fileTree = [];
                this.content = '';
                this.isLogin = false;
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
