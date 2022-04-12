<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item prop="content" label="内容：">
                        <el-input type="textarea" :rows="20" class="paydialog" v-model="formData.content"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
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

}
</script>

<style scoped>
.paydialog{
    min-height:500px;
    width: 700px;
}
</style>