<template>
    <div class="login">
        <h2>后台登陆</h2>

        <!--model用来关联表单数据，rules用来指定验证规则-->
        <el-form label-position="left" label-width="80px" :rules="rules" :model="formLabelAlign" ref="ruleForm2">
            <!--如果要表单校验与重置，要加porp属性-->
            <el-form-item label="账号" prop='uname'>
                <el-input v-model="formLabelAlign.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='upwd'>
                <el-input v-model="formLabelAlign.upwd"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        function unameFn(rule, value, callback) {
            if (value == "") {
                callback(new Error('帐号不能为空'))
            } else {
                callback()
            }
        }


        function upwdFn(rule, value, callback) {
            if (value == '') {
                callback(new Error('密码不能为空'))
            } else {
                callback();
            }
        }

        return {  //表单提交数据
            formLabelAlign: {
                uname: '',
                upwd: ''
            },

            //表单验证规则
            rules: {


                uname: [
                    { require: true, message: "请填写账号", trigger: 'blur' },
                    { min: 5, max: 18,message:"账号在5~18位",trigger: 'blur' },
                    {validator:unameFn,trigger:'blur'}
               
                ],

                upwd: [
                    { validator: upwdFn, trigger: 'blur' },
                    { pattern: /^\w{6,18}$/, message: '密码在6-18位', trigger: 'blur' },
                    
                ]
            }



        }
    },

    // 组件初始化完毕, 自动调用
    // created() {
    //     // 测试
    //     this.$http.get(this.$api.islogin).then(res => {
    //         console.log(res.data);
    //     });
    // },

    methods: {
        login() {
            this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
                if (res.data.status == 0) {
                //使用路由插件后，组件实例就会有两个对象，$router代表路由实例,$router代表url对象,
                // 我们这里通过$route对象拿取url中的信息，$router对象进行路由跳转等操作
                let nextPage=this.$route.query.nextPage;
                    this.$router.push({path:nextPage?nextPage:'/admin'});
                } else {
                    this.$alert(res.data.message);
                }
            });
        },

        submitForm(formName) { //表单提交 
            //通过ref引用得到form表单元素，然后调用validate去检验全部字段，回调收到的值为true和false
            //this.$refs是Vue提供的内置空对象，用于替代传统的dom方式获取方式    上面加了ref='h1'  这样就不是空对象，里面就有了h1 就是不用操作dom  
            this.$refs[formName].validate(result => {
                if (result) { //全部通过才true
                    this.login();
                } else {
                    this.$alert("失败");
                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>

<style scoped >
.login {
    width: 400px;
    height: 200px;
    border: 1px solid blue;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    padding: 20px;
}

h2 {
    position: absolute;
    top: -60px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #fff;
}
</style>