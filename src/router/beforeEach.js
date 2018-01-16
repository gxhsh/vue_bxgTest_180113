//  因为当前不是vue组件, 所以无法this.$http this.$api拿取东西, 只能单独导入使用
import axios from 'axios';
import api from '../js/api-config.js';

// 1、先获取用户要去的页面
// 2、如果用户要去登陆页
// 2.1那么判断用户是不是登陆过了，是的话直接给他跳到后台
// 3、如果用户要去后台管理相关页
// 3.1那么判断用户是不是登陆过了，不是就给他跳到登陆页
export default function(to,from,next){
    var toPageName=to.name;

    //请求接口判断用户有没有登陆
    axios.get(api.isLogin).then(ren=>{
        let isLogin=false;
        if(res.data.code=='logined'){
            isLogin=true;
        }

        //用户访问登陆页面，如果已登陆，那么自动跳转到首页
        if(toPageName=='login'&&isLogin){
            next('/admin');
        }

        //用户访问后台管理页面，但是没有登陆就跳到登陆页
        else if(toPageName!='login'&&!isLogin){
            next({name:'login',query:{nextPath:to.fullpath}});
        }
        else{
            next();
        }
    })
}