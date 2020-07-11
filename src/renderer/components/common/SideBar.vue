/** * @Description: 侧边工具栏 * @Author: TankNee * @Date: 2/23/2020 9:31 AM **/
<template>
	<div class="sidebar">
		<div class="top-items">
			<button class="btn editor-btn"></button>
		</div>
		<div class="bottom-items">
			<div @click="attendTologin" style="cursor: pointer">
				<el-popover placement="top-start" :title="`${userInfo.displayName}(${userInfo.userId})`" width="200" trigger="hover" :content="`创建时间：${userInfo.created}`">
					<el-avatar style="border: 2px solid white" :src="userAvatar" slot="reference"></el-avatar>
				</el-popover>
			</div>
			<button class="btn settings-btn"></button>
		</div>
		<el-dialog title="登录账户" :visible.sync="dialogFormVisible" v-loading="isLoading" destroy-on-close>
			<el-form :model="loginForm">
				<el-form-item label="服务器地址" class="form-item">
					<el-input v-model="loginForm.url" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="账户" class="form-item">
					<el-input v-model="loginForm.userId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" class="form-item">
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
import api from '../../utils/api';
import bus from './Bus';

export default {
	name: 'SideBar',
	data() {
		return {
			isLogin: false,
			loginForm: {
				userId: '',
				password: '',
				url: '',
			},
			isLoading: false,
			dialogFormVisible: false,
			userInfo: {
				displayName: '您还未登录',
			},
			userAvatar: 'https://tankneeimg.oss-cn-shenzhen.aliyuncs.com/profile/girlavatar.jpg',
		};
	},
	methods: {
		async attendTologin() {
			if (!this.isLogin) {
				this.dialogFormVisible = true;
			} else {
				try {
					const logout = await this.$confirm('确认登出？', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true,
					})

					if (logout) {
						try {
							const result = await api.AccountServerApi.Logout();
							this.$message({
								type: 'success',
								message: '登出成功!',
							});
							bus.$emit('Logout Successfully');
							this.isLogin = false;
							this.userAvatar = 'https://tankneeimg.oss-cn-shenzhen.aliyuncs.com/profile/girlavatar.jpg';
						} catch(err) {
							this.$message({
								type: 'error',
								message: `登出失败，已取消登出：${err.message}`,
							});
						}
					}
				} catch(err) {
					// Cancelled
				}

			}
		},
		async login() {
			this.isLoading = true;
			console.log(this.loginForm.userId, this.loginForm.password);
			api.AccountServerApi.setBaseUrl(this.loginForm.url);
			try {
				const result = await api.AccountServerApi.Login({
					userId: this.loginForm.userId,
					password: this.loginForm.password,
				});

				this.isLoading = false;
				this.dialogFormVisible = false;
				this.$message({
					message: '登录成功',
					type: 'success',
				});
				this.userInfo = result.user;
				localStorage.setItem('userSettings', JSON.stringify(result));
				this.userAvatar = `${api.AccountServerApi.getBaseUrl()}/as/user/avatar/${JSON.parse(localStorage.getItem('userSettings')).userGuid}`;
				this.isLogin = true;
				bus.$emit('Login Successfully');
			} catch (err) {
				this.isLoading = false;
				this.$message({
					message: `登录失败：${err.message}`,
					type: 'error',
				});
			}
		},
	},
};
</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-color: rgb(247, 247, 247);
	overflow: hidden;
}

.top-items,
.bottom-items {
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
	background-image: url('../../assets/images/edit.png');
}

.settings-btn {
	background-image: url('../../assets/images/settings.png');
}

.form-item {
}
</style>
