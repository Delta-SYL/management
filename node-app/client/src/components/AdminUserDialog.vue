<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <el-row>
                <el-col :span='12'>
            <div class="form">
        <el-form ref="form" :model="formData"  label-width="120px" style="margin:10px;width:auto">
            <el-form-item prop="address" label="具体地址：" >
                <el-input  v-model="formData.address" ></el-input>
            </el-form-item>
            <el-form-item prop="area" label="使用面积：" >
                <el-input  v-model="formData.area" ></el-input>
            </el-form-item>
            <el-form-item prop="cpid" label="车位编号" >
                <el-input  v-model="formData.cpid" ></el-input>
            </el-form-item>
            <el-form-item prop="size" label="车位类型" >
                <el-input  v-model="formData.size" ></el-input>
            </el-form-item>
            <el-form-item prop="liveName" label="同住人信息：" >
                <el-input type="textarea" :rows="5" v-model="formData.liveName"  ></el-input>
            </el-form-item>
            <el-form-item class="text_right">
                <el-button type="primary" @click="onSubmit('form')">登记</el-button>
            </el-form-item>
        </el-form>
            </div>
                </el-col>
                <el-col :span='12'>
                    <div class="pic">
                        <el-image  v-if="this.path" style="width: 80%"  :src="require('C:/Users/Delta/Desktop/论文/已传图片/'+this.path)" fit="fill">
                            <div class="image-slot">Loading<span class="dot">...</span></div>
                        </el-image>
                    </div>
                </el-col>
                </el-row>

        </el-dialog>
    </div>      
</template>

<script>
export default {
    name:'dialog',
    props:{
        dialog: Object,
       formData: Object,
       path:String
    },

    methods:{
        onSubmit(form){
            this.$refs[form].validate(valid=>{
                if(valid){
                    this.$axios.post(`/api/adminuser/add`,this.formData)
                    .then(res=>{
                        this.$message({
                            message:"已登记",
                            type:"success"
                        })
                        this.dialog.show=false
                        this.$emit('update')
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
/deep/.el-dialog{
    margin-top: 85px;
    width: 1500px;
    height: 700px;
}
.pic{
    margin-left:100px ;
    width: 700px;
}
</style>