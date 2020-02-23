/**
* @Description: 菜单栏组件，置于全局的顶部
* @Author: TankNee
* @Date: 2/22/2020 7:30 PM
**/
<template>
    <div class="nee-header" style="-webkit-app-region: drag;">
        <div class="left-items">
            <el-dropdown class="menu-item">
                <span class="el-dropdown-link" style="color: black">
                    文件
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>打开</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="right-items">
            <button class="action-btn mini-btn" @click="shrink"></button>
            <button class="action-btn resize-btn" @click="resizeWin"></button>
            <button class="action-btn close-btn" @click="closeWin"></button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MenuBar",
        data() {
            return {
                currentWindow: {},
                mainProcess: {}
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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .menu-item {
        margin-left: 10px;
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
</style>
