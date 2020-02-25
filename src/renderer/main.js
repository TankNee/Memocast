import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



var schedule = require('node-schedule');
import App from './App';
import router from './router';
import store from './store';
import api from "./utils/api";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.use(ElementUI);
// Vue.prototype.$contextmenu = Contextmenu;
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

schedule.scheduleJob(`30 * * * * *`, () => {
    api.keepTokenAlive().then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
});

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');
