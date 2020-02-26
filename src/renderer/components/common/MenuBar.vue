/**
* @Description: 菜单栏组件，置于全局的顶部
* @Author: TankNee
* @Date: 2/22/2020 7:30 PM
**/
<template>
    <div class="nee-header" style="-webkit-app-region: drag;">
        <div class="left-items">
            <span class="menu-item">文件</span>
            <span class="menu-item">编辑</span>
            <span class="menu-item">视图</span>
        </div>
        <div class="middle-items">
            <span>{{fileTitle}}</span>
        </div>
        <div class="right-items">
            <button class="action-btn mini-btn" @click="shrink"></button>
            <button class="action-btn resize-btn" @click="resizeWin"></button>
            <button class="action-btn close-btn" @click="closeWin"></button>
        </div>

    </div>
</template>

<script>
    import bus from "./Bus";

    export default {
        name: "MenuBar",
        data() {
            return {
                dataSource: ['mail'],
                currentWindow: {},
                mainProcess: {},
                fileTitle: 'NeetoEditor',
                searchWord: '',
            };
        },
        methods: {
            // 缩小窗口
            shrink() {
                this.currentWindow.minimize();
            },
            // 窗口化
            resizeWin() {
                if (this.currentWindow.isMaximized()) {
                    this.currentWindow.restore();
                } else {
                    this.currentWindow.maximize();
                }
            },
            // 关闭窗口
            closeWin() {
                this.currentWindow.close();
            }
        },
        mounted() {
            this.currentWindow = this.$electron.remote.getCurrentWindow();
            bus.$on('Note Opened', title => {
                console.log(title);
                this.fileTitle = title;
            });
        }
    };
</script>

<style scoped>
    * {
        -webkit-app-region: no-drag;
    }

    .nee-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(252, 252, 252);
        border-bottom: 1px;
    }

    .left-items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 99999;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .menu-item {
        margin-left: 23px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
    }

    .action-btn {
        border: none;
        outline: none;
        background-repeat: no-repeat;
        height: 15px;
        width: 15px;
        background-color: transparent;
        background-size: 100% 100%;
        margin: 0px 8px;
        cursor: pointer;
    }

    .mini-btn {
        background-image: url("../../assets/images/minize.png");
    }

    .resize-btn {
        background-image: url("../../assets/images/win.png");
    }

    .close-btn {
        background-image: url("../../assets/images/close.png");
    }

    .search-input {
        border-radius: 5px;
        height: 50px;
    }
</style>
