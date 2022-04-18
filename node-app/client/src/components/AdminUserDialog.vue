<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <el-row>
                <el-col :span='12'>
            <div class="form">
               <!-- <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="title" label="标题：">
                        <el-input  v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="content" label="内容：">
                        <el-input type="textarea" :rows="20" v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>jpeg
                    </el-form-item>
                </el-form>-->
        <el-table stripe :model="formData" style="width: 100%"  max-height="450" border>
            <el-table-column prop="liveName" label="同住人姓名" width="250" align="center"></el-table-column>
            <el-table-column prop="idNum"  label="身份证号" width="300" align="center"></el-table-column>
            <el-table-column prop="relationship"  label="关系" width="180" align="center"></el-table-column>
        </el-table>
        <el-form ref="form" :model="formData"  label-width="120px" style="margin:10px;width:auto">
            <el-form-item prop="size" label="内容：">
                <el-input  v-model="formData.size"></el-input>
            </el-form-item>
        </el-form>
            </div>
                </el-col>
                <el-col :span='12'>
                    <div class="pic">
                        <el-image  v-if="this.path" style="width: 80%"  :src="require('C:/Users/Delta/Desktop/论文/已传图片/房产002.jpeg')" fit="fill">
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
        formData:Object
    },

    methods:{
        onSubmit(form){
            this.$refs[form].validate(valid=>{
                //console.log(this.formData)
                this.formData.uid=this.$store.getters.user.uid
                if(valid){
                    if(this.dialog.option=='add'){
                        this.$axios.post(`/api/${this.dialog.type}/add`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"数据添加成功",
                                type:"success"
                            })
                            this.dialog.show=false
                            this.$emit('update')
                        })
                    }else if(this.dialog.option=='edit'){
                        //console.log(this.formData)
                        this.$axios.post(`/api/${this.dialog.type}/edit`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"数据修改成功",
                                type:"success"
                            })
                            this.dialog.show=false
                            this.$emit('update')
                        })
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
/deep/.el-dialog{
    margin-top: 60px;
    width: 1500px;
    height: 800px;
}
.pic{
    margin-left:100px ;
    width: 700px;
}
</style>