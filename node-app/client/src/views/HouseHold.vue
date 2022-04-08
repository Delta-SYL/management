<template>
<div class="fillContainer">
    <div>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-button type="primary" size="big"  @click="handleAdd()">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
        <el-table  :data="tableData" style="width: 100%"  max-height="450" align="center" border>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="liveName" label="姓名" width="250" align="center"></el-table-column>
            <el-table-column prop="idNum" label="身份证号" width="500" align="center"></el-table-column>
            <el-table-column prop="relationship"  label="与户主关系" width="100" align="center"></el-table-column>
            <el-table-column align="center"  width=200 label="操作">
            <template #default="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getRepair"></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/HouseHoldDialog.vue';
export default {
    //name:'fundList',
    data(){
        return{
            tableData:[],
            formData:{
              liveName:"",
              idNum:"",
              relationship:"",
            },
            dialog:{
                show:false,
                title:'',
                option:'edit'
            }
        }
    },
    created(){
        this.getRepair();
    },
    methods:{
        getRepair(){
            this.$axios.post('/api/household/test',this.$store.getters.user)
            .then(res=>{
                this.tableData=res.data
                //console.log(res)
            })
            .catch(err=>console.log(err))
        },
        handleDelete(index,row){
            this.$axios.post('/api/household/delete',row)
            .then(res=>{
                this.$message('删除成功')
                this.getRepair()
            })
        },
        handleAdd(){
             this.dialog={
                show:true,
                title:"添加同住住户：",
                option:"add",
            }
            this.formData={
                liveName:"",
                idNum:"",
                relationship:"",
            }
        }
    },
    components:{
        Dialog
    }
}
</script>

<style  scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight{
    float: right;
}

</style>

