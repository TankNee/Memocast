<template>
    <div id="app">
        <el-container style="height: 100%;margin: 0;padding: 0;">
            <el-header style="height: 35px;padding: 0; border-bottom: 1px solid rgb(237,237,237);"><MenuBar style="height: 100%;width: 100%"/></el-header>
            <el-container>
                <el-aside width="75px"><SideBar style="height: 100%;width: 100%"/></el-aside>
                <el-main style="padding: 0;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MenuBar from "./components/common/MenuBar";
    import SideBar from "./components/common/SideBar";
    export default {
        name: 'neeto-vue',
        components: {SideBar, MenuBar}
    };
</script>

<style>
    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    #app {
        padding: 0;
        margin: 0;
        height: 100%;
        overflow: hidden;
    }

</style>
