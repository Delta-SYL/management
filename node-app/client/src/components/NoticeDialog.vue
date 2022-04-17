<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="num" label="公告编号：">
                        <el-input  v-model="formData.num"></el-input>
                    </el-form-item>
                    <el-form-item prop="adId" label="发布人员ID：">
                        <el-input  v-model="formData.adId"></el-input>
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
                    <el-form-item class="text_right">
                        <el-button type="primary" @click="dialog.show=false">确定</el-button>
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

}
</script>

<style scoped>

</style>