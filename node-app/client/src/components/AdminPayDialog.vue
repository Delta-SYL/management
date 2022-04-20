<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="pid" label="缴费单号：">
                        <el-input disabled v-model="formData.pid"></el-input>
                    </el-form-item>
                    <el-form-item prop="uid" label="户主编号：">
                        <el-input disabled v-model="formData.uid"></el-input>
                    </el-form-item>
                    <el-form-item prop="date" label="创建日期：">
                        <el-input disabled v-model="formData.date"></el-input>
                    </el-form-item>
                    <el-form-item prop="payment" label="金额：">
                        <el-input v-model="formData.payment"></el-input>
                    </el-form-item>
                    <el-form-item prop="content" label="明细：">
                        <el-input type="textarea" :rows="20" v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
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
      }  
    },
    props:{
        dialog: Object,
        formData:Object
    },
    methods:{
        onSubmit(form){
            this.$refs[form].validate(valid=>{
                this.formData.uid=this.$store.getters.user.uid
                if(valid){
                        if(this.dialog.option=='edit'){
                        //console.log(this.formData)
                        this.$axios.post(`/api/adminpay/edit`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"数据修改成功",
                                type:"success"
                            })
                            this.dialog.show=false
                            this.$emit('update')
                        })
                    }else{
                        this.dialog.show=false
                        this.$emit('update')
                    }
                }
            })
        }
    }
}
</script>

<style scoped>

</style>