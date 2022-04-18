<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="adId" label="公告发布人ID：">
                        <el-input v-model="formData.adId" disabled></el-input>
                    </el-form-item>
                    <el-form-item prop="title" label="标题：">
                        <el-input  v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="content" label="内容：">
                        <el-input type="textarea" :rows="20" v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>      
</template>

<script>
export default {
    name:'dialog',
    data(){
      return{
          form_rules:{
              title:[
                  { required: true, message: "标题不能为空！", trigger: "blur" }
              ],
              content:[
                  { required: true, message: "内容不能为空！", trigger: "blur" }
              ]
          }
      }  
    },
    props:{
        dialog: Object,
        formData:Object
    },
    methods:{
        onSubmit(form){
            this.$refs[form].validate(valid=>{
                if(valid){
                    if(this.dialog.option=='add'){
                        this.$axios.post(`/api/adminnotice/add`,this.formData)
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
                        this.$axios.post(`/api/adminnotice/edit`,this.formData)
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

</style>