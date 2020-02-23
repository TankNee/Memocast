/**
* @Description: 主界面复用模块
* @Author: TankNee
* @Date: 2/13/2020 2:14 PM
**/
<template>
    <div id="wrapper">
        <div class="block">
            <span class="demonstration">默认</span>
            <el-slider v-model="value1"></el-slider>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                value1: 30
            };
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link);
            }
        }
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }
</style>
