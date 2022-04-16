<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="wid" label="报修单号：">
                        <el-input  v-model="formData.wid"></el-input>
                    </el-form-item>
                    <el-form-item prop="uid" label="住户编号：">
                        <el-input  v-model="formData.uid"></el-input>
                    </el-form-item>
                    <el-form-item prop="title" label="标题：">
                        <el-input  v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="date" label="日期：">
                        <el-input  v-model="formData.date"></el-input>
                    </el-form-item>
                    <el-form-item prop="content" label="内容：">
                        <el-input type="textarea" :rows="15" v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item prop="money" label="金额：">
                        <el-input  v-model="formData.money"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">处理</el-button>
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
                //console.log(this.formData)
                this.formData.adId=this.$store.getters.user.adId
                if(valid){
                    if(this.dialog.option=='wait'){
                        this.$axios.post(`/api/${this.dialog.type}/wait`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"处理中",
                                type:"success"
                            })
                            this.dialog.show=false
                            this.$emit('update')
                        })
                    }else if(this.dialog.option=='processing'){
                        this.$axios.post(`/api/${this.dialog.type}/processing`,this.formData)
                        .then(res=>{
                            this.$message({
                                message:"处理中",
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