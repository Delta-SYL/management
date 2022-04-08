<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="liveName" label="姓名：">
                        <el-input  v-model="formData.liveName"></el-input>
                    </el-form-item>
                    <el-form-item prop="idNum" label="身份证号：">
                        <el-input  v-model="formData.idNum"></el-input>
                    </el-form-item>
                    <el-form-item prop="relationship" label="与户主关系：">
                        <el-input v-model="formData.relationship"></el-input>
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
                liveName:[
                    { required: true, message: "姓名不能为空！", trigger: "blur" }
                ],
                idNum:[
                      { required: true, message: "身份证号不能为空！", trigger: "blur" }
                ],
                relationship:[
                     { required: true, message: "与户主关系不能为空！", trigger: "blur" }
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
                //console.log(this.formData)
                this.formData.uid=this.$store.getters.user.uid
                if(valid){
                    /*const url=this.dialog.option=='add'?'add':'edit'
                    //console.log(this.formData)
                    this.$axios.post(`/api/repair/${url}`,this.formData)
                    .then(res=>{
                        this.$message({
                            message:"数据添加成功",
                            type:"success"
                        })
                        this.dialog.show=false
                        this.$emit('update')
                    })*/
                        this.$axios.post(`/api/household/add`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"数据添加成功",
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

</style>