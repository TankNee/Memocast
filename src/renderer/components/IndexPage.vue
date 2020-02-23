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
        ></el-tree>
        <mavon-editor
                v-model="content"
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
                isLogin: false,
                isLoading: false,
                configs: {
                    spellChecker: false // 禁用拼写检查
                },
                fileTree: []
            };
        },
        methods: {
            handleFileClick() {
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
