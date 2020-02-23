import req from './request';

let fetchPost = req.fetchPost;
let fetchGet = req.fetchGet;
let baseUrl = req.baseUrl;
export default {
    baseUrl,
    /**
     * 用户登录接口
     * @param params {userId,password}
     * @returns {Promise | Promise<unknown>}
     * @constructor
     */
    Login(params) {
        return fetchPost('/as/user/login', params);
    },
    /**
     * 根据token获取用户信息
     * @param params {token}
     * @returns {Promise<unknown>}
     */
    getUserInfo(params) {
        return fetchPost('/as/user/login/token', params);
    },
    /**
     * 获取用户头像
     * @param params {userGuid}
     * @returns {Promise<unknown>}
     */
    getUserAvatar(params) {
        return fetchGet(`/as/user/avatar/${params.userGuid}`);
    },
    /**
     * 用户登出
     * @param params {none}
     * @returns {Promise<unknown>}
     * @constructor
     */
    Logout(params) {
        return fetchGet('/as/user/logout');
    },
    /**
     * 获取用户文件夹
     * @param params {kbServer,kbGuid}
     * @returns {Promise<unknown>}
     */
    getFolders(params) {
        return fetchGet(`${params.kbServer}/ks/category/all/${params.kbGuid}`);
    },
    /**
     * 获取文件夹下的笔记
     * @param params {kbServer,kbGuid,data:{start,count,category,orderBy}}
     * @returns {Promise<unknown>}
     */
    getFolderNotes(params) {
        return fetchGet(`${params.kbServer}/ks/note/list/category/${params.kbGuid}`, params.data);
    },
    /**
     * 获取笔记内容--下载笔记
     * @param params {kbServer,kbGuid,data:{downloadInfo,downloadData}}
     */
    getNoteContent(params) {
        return fetchGet(`/ks/note/download/${params.kbGuid}/${params.docGuid}`, params.data);
    }
};
