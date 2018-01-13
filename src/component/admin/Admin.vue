<template>
    <div>

        <el-container class="admin">
            <!--左侧-->
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>
            
            <el-container>
                <!--头部-->
                <el-header>
                    <Header></Header>
                </el-header>
                <!--主体-->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
        
    </div>
</template>

<script>

import Header from './common/Header.vue';
import Aside from './common/Aside.vue';

    export default {

        // 注册子组件, 下面使用了es6语法
        components: {
            Header,
            Aside
        }
    }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;

  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;

  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }

  .admin{
      height: 100%;
  }
  
</style>