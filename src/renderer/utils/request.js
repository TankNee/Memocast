import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
// var baseUrl = 'http://127.0.0.1:6880';
var baseUrl = 'https://oj.tanknee.cn';
// axios.defaults.baseURL = 'http://nezha.neeto.cn';   //配置接口地址
axios.defaults.baseURL = baseUrl;

export async function execRequest(method, url, body, token, extraConfig) {
    const config = {
        url,
        method,
        data: body,
    };

    if (token) {
        config['headers'] = {
            'X-Wiz-Token': token
        };
    } else if (localStorage.getItem('userSettings')) {
        config['headers'] = {
            'X-Wiz-Token': JSON.parse(localStorage.getItem('userSettings')).token
        };
    }

    Object.assign(config, extraConfig);

    const res = await axios(config);
    const data = res.data;

    if (data.returnCode !== 200) {
        console.error(`request error: ${data.returnMessage}`);
        const err = new Error(data.returnMessage);
        err.code = data.returnCode;
        err.externCode = data.externCode;
        throw err;
    }

    return ('result' in data) ? data.result : data;
}
