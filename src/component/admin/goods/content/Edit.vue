<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:500px">

            <el-form-item label="标题" prop="name">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="副标题" prop="name">
                <el-input v-model="ruleForm.sub_title" placeholder="请选择活动区域">
                </el-input>
            </el-form-item>

            <el-form-item label="所属类别" prop="region">
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">

                        <!--option标签内可以嵌套span等子标签，lable不可以删除-->
                        <span>
                            <span v-if="item.class_layer!=1">|-</span>
                            <span>{{item.title}}</span>
                        </span>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否发布" prop="delivery">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item label="推荐类型" prop="delivery">
                <el-switch active-text="轮播图" v-model="ruleForm.is_slide"></el-switch>
                <el-switch active-text="置顶" v-model="ruleForm.is_slide"></el-switch>
                <el-switch active-text="热门" v-model="ruleForm.is_slide"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面" prop="delivery">
                <!--action属性用来设置图片上传地址 list-type列表类型-->
                <!--file-list用来关联图片列表-->
                <!--on-preview与on-remove是用来添加回调函数的，他们是属性方式添加-->
                <el-upload class="upload-demo" action="http://localhost:8899 /admin/article/uploadimg" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fuleForm.imgList" 
                :on-success="imgUploaded"
                list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="上传附件" prop="delivery">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.fileList" 
                :on-success="fileUploaded">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="货号" prop="name">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存" prop="name">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>

            <el-form-item label="市场价" prop="name">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价" prop="name">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>

            <el-form-item label="摘要" prop="name">
                <el-input v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容" prop="name">
                <el-input v-model="ruleForm.content"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                <el-button @click="resetForm('ruleForm')">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            // 当前编辑的商品ID
            id: null,

            // 分类列表数据
            goodsCategory: [],

            //表单数据
            ruleForm: {},

            // 表单校验规则
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 保存修改
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 获取商品数据
        getGoods() {
            this.$http.get(this.$api.gsDetail + this.id).then(res => {
                this.ruleForm = res.data.message;

                // 默认是个string,给它转换成number类型,这样它就会自动和分类option的value进行匹配
                this.ruleForm.category_id = +this.ruleForm.category_id;

            })
        },

        //获取商品分类
        getGoodsCategory() {
            this.$http.get(this.$api.ctList + 'goods').then(res => {
                this.goodsCategory = res.data.message;

            });
        },

        // img上传成功回调
        // 注意：商品的封面后端接口只能存一个，不能设多个 ，所以每次我们上传成功后，把原有的封面覆盖掉
        imgUploaded(res, file, fileList){
            this.ruleForm.imgList=[res];
        },

        // 附件上传成功回调
        // 注意：附件后端接口可以设多个，所以每次成功后我们在原来的基础上push新附件
        fileUploaded(res, file, fileList){
            this.ruleForm.fileList.push(res);
        }

        //组件初始化完毕后，先拿到url中的id，在请求接口获取商品数据进行回显
        created() {
            this.id = this.$route.params.id;
            this.getGoods();
            this.getGoodsCategory();
        }

    }
}
</script>

<style>

</style>
