// 导入组件
import Login from '../component/login/Login.vue';
import Admin from '../component/admin/Admin.vue';

import GoodsCgEdit from '../component/admin/goods/category/Edit.vue';
import GoodsCgList from '../component/admin/goods/category/List.vue';
import GoodCtEdit from '../component/admin/goods/content/Edit.vue';
import GoodsCtList from '../component/admin/goods/content/List.vue';


//admin页面的子路由
let adminChildren=[
    //内容管理
    {name:'goodsCtList',path:'goods/content/list',component:GoodsCtList},
    {name:'goodCtEdit',path:'goods/content/edit/:id',component:GoodCtEdit},
    {name:'goodsCtAdd',path:'goods/content/add',component:GoodCtEdit},

    // 商品分类
    {name:'goodsCgList',path:'goods/category/add',component:GoodsCgList},
    {name:'goodsCgEdit',path:'goods/category/add',component:GoodsCgEdit},
    {name:'goodsCgAdd',path:'goods/category/add',component:GoodsCgEdit},

]


//该文件对名导出路由配置
export default{
    routes:[
        {name:'login',path:'/login',component:Login}, //登陆
        
        {path:'/',redirect: '/admin'},
        {name:'admin',path:'/admin',component:Admin,children:adminChildren}, //登陆

        
      
    ]
}