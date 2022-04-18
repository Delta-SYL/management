<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="cpid" label="车位号：">
                        <el-input  v-model="formData.cpid" disabled></el-input>
                    </el-form-item>
                    <el-form-item prop="uid" label="住户编号：">
                        <el-input  v-model="formData.uid"></el-input>
                    </el-form-item>
                    <el-form-item prop="size" label="状态：">
                        <el-input  v-model="formData.size"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
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
    },
    props:{
        dialog: Object,
        formData:Object
    },
    methods:{
        onSubmit(form){
            this.$refs[form].validate(valid=>{
                this.$axios.post('/api/admincar/edit',this.formData)
                .then(res=>{
                    this.$message({
                        message:"数据修改成功",
                        type:"success"
                    })
                    this.dialog.show=false
                    this.$emit('update')
                })
            })
        }
    }
}
</script>

<style scoped>

</style>