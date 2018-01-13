<template>
    <div>



        <!--公共头部
        <router-view></router-view>
        <el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
        公共底部-->
        <router-view></router-view>

    </div>
</template>

<script>
export default {
    data() {
      return {
        value1: null,
        value2: null
      }
    }
  }
</script>

// scoped属性加了只对当前标签生效
<style scoped>
  div{
        height: 100%;
       background-color:rgb(38,124,183);
  }
</style>