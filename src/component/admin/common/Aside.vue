<template>
 <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose" style="height:100%"
      >

      <!--子菜单标题-->
      <el-submenu v-for="item in menu" :key="item.title"  :index="item.title">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.title}}</span>
        </template>

        <!--子菜单分组-->
          <el-menu-item  v-for="subitem in item.children" :key="subitem.title"  :index="subitem.title">
              <router-link :to="subitem.path">{{subitem.title}}</router-link>
          </el-menu-item>
         
      </el-submenu>

    </el-menu>
</template>

<script>




  export default {
    data(){
        return{
            //菜单有很多项，所以是一个大数组
            //里面数据比较染，所以是一个对角
            //title字段 children字段放子菜单（数组）、
            menu:[
                {
                    title:'资源下载',
                    children:[
                        {title:'内容管理',path:'/a'},
                        {title:'类别管理',path:'/b'},
                        {title:'评论管理',path:'/c'}
                    ]
                },
                                {
                    title:'购物商城',
                    children:[
                        {title:'内容管理',path:'/a'},
                        {title:'类别管理',path:'/b'},
                        {title:'评论管理',path:'/c'}
                    ]
                },
                                {
                    title:'订单管理',
                    children:[
                        {title:'内容管理',path:'/a'},
                        {title:'类别管理',path:'/b'},
                        {title:'评论管理',path:'/c'}
                    ]
                },
            ]
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped >

</style>