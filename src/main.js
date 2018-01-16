//1.1、导入第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'normalize.css';  //默认全部样式
import './less/index.less';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 1.2 启动vue插件
Vue.use(VueRouter);

//2.1、导入自己写的东西
import App from './component/App.vue';

// 2.2导入路由配置
import routerConfig from './router/index.js';

//3 非vue的第三方包,方便使用
import axios from 'axios';
//浏览器安全机制如果是夸域请求，浏览器是不会把本地cookie信息携带过去的
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;


//4 导入api配置对象，为了使用方作，把它加到原型中
import api from './js/api-config.js';
Vue.prototype.$api=api;

//5路由实例
import beforeEach from './router/beforeEach.js'; //使用一个文件编写路由守卫
let vueRouter =new VueRouter(routerConfig); //创建路由实例
vueRouter.beforeEach(beforeEach);

//把根组件渲染到指定视图
new Vue({
    el:'#app',
    render:function(createElement){  //把根组件渲染到视图
        return createElement(App);
    },
    router:new VueRouter

});