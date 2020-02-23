/**
* @Description: 侧边工具栏
* @Author: TankNee
* @Date: 2/23/2020 9:31 AM
**/
<template>
    <div class="sidebar">
        <div class="top-items">
            <button class="btn editor-btn"></button>
        </div>
        <div class="bottom-items">
            <div @click="attendTologin" style="cursor: pointer">
                <el-avatar style="border: 2px solid white"
                           :src="userAvatar"></el-avatar>
            </div>
            <button class="btn settings-btn"></button>
        </div>
        <el-dialog title="登录账户" :visible.sync="dialogFormVisible">
            <el-form :model="loginForm">
                <el-form-item label="账户">
                    <el-input v-model="loginForm.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../utils/api";
    import bus from "./Bus";
    export default {
        name: "SideBar",
        data() {
            return {
                isLogin: false,
                loginForm: {},
                dialogFormVisible: false,
                userAvatar: 'https://tankneeimg.oss-cn-shenzhen.aliyuncs.com/profile/girlavatar.jpg'
            };
        },
        methods: {
            attendTologin() {
                if (!this.isLogin) {
                    this.dialogFormVisible = true;
                } else {
                    this.$confirm('确认登出？', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        api.Logout().then(res => {
                            if (res.returnCode !== 200) {
                                this.$message({
                                    message: `${res.returnMessage}`,
                                    type: 'warning'
                                });
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '登出成功!'
                                });
                                this.isLogin = false;
                                this.userAvatar = 'https://tankneeimg.oss-cn-shenzhen.aliyuncs.com/profile/girlavatar.jpg';
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消登出'
                        });
                    });
                }
            },
            login() {
                console.log(this.loginForm.userId, this.loginForm.password);
                api.Login({
                    userId: this.loginForm.userId,
                    password: this.loginForm.password
                }).then(res => {
                    if (res.returnCode !== 200) {
                        this.$message({
                            message: `登录失败 :${res.returnMessage}`,
                            type: 'warning'
                        });
                    } else {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        localStorage.setItem('userSettings', JSON.stringify(res.result));
                    }
                }).catch(err => {
                    this.$message({
                        message: `登录失败,请检查网络`,
                        type: 'error'
                    });
                }).then(() => {
                    this.userAvatar = `${api.baseUrl}/as/user/avatar/${JSON.parse(localStorage.getItem('userSettings')).userGuid}`;
                    this.isLogin = true;
                    this.dialogFormVisible = false;
                    bus.$emit('Login Successfully');
                });
            }
        }
    };
</script>

<style scoped>
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(247, 247, 247);
    }

    .top-items, .bottom-items {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .btn {
        background-repeat: no-repeat;
        height: 35px;
        width: 35px;
        background-color: transparent;
        background-size: 100% 100%;
        margin: 20px 0px;
        cursor: pointer;
        border: none;
        outline: none;
    }

    .editor-btn {
        background-image: url("../../assets/images/edit.png");
    }

    .settings-btn {
        background-image: url("../../assets/images/settings.png");
    }
</style>
