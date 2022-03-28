<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" 
            v-model="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px;width:auto">
                    <el-form-item label="收支类型：">
                        <el-select v-model="formData.type" placeholder="收支类型">
                            <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="money" label="金额：">
                        <el-input type="money" v-model="formData.money"></el-input>
                    </el-form-item>
                    <el-form-item prop="other" label="其他：">
                        <el-input type="textarea" v-model="formData.other"></el-input>
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
          
          format_type_list:[
              '水费',
              '电费',
              '煤气'
          ],
          form_rules:{
              money:[
                  { required: true, message: "金额不能为空！", trigger: "blur" }
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
                    const url=this.dialog.option=='add'?'add':'edit'
                    //console.log(this.formData)
                    this.$axios.post(`/api/profiles/${url}`,this.formData)
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