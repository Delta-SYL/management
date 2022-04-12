<template>
<div class="fillContainer">
    <div>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-button type="primary" size="small"  @click="handleAdd()">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
        <el-table stripe  :data="tableData" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="oid" label="投诉号" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="250" align="center"></el-table-column>
            <el-table-column prop="content" label="内容" width="600" align="center"></el-table-column>
            <el-table-column prop="flag"  label="状态" width="100" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="140" align="center"></el-table-column>
            <el-table-column prop="money"  label="费用" width="75" align="center"></el-table-column>
            <el-table-column prop="handleid"  label="受理人员编号" width="200" align="center"></el-table-column>
            <el-table-column align="center"  width=200 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="warning" size="small" @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getRepair"></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/Dialog.vue';
export default {
    //name:'fundList',
    data(){
        return{
            /*paginations:{
              page_index:1,
              total:2,
              page_size:5,
              page_sizes:[5,10,15,20],
              layout:'total,sizes,prev,pager,next,jumper'  
            },*/
            tableData:[],
            formData:{
              oid:"",
              title:"",
              content:"",
              flag:"",
              date:"",
              handleid:"",
              money:""
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
            this.$axios.post('/api/other/test',this.$store.getters.user)
            .then(res=>{
                this.tableData=res.data
                //console.log(res)
            })
            .catch(err=>console.log(err))
        },
        handleEdit(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"修改报修单：",
                option:"edit",
                type:"other"
            }
            this.formData={
              title:row.title,
              content:row.content,
              oid:row.oid
            }
        },
        handleDelete(index,row){
            this.$axios.post('/api/other/delete',row)
            .then(res=>{
                this.$message('删除成功')
                this.getRepair()
            })
        },
        handleAdd(){
             this.dialog={
                show:true,
                title:"创建报修单：",
                option:"add",
                type:"other"
            }
            this.formData={
                title:'',
                content:'',
            }
        },
        handleConfirm(index,row){
            this.$axios.post('/api/other/confirm',row)
            .then(res=>{
                this.$message('已确认')
                this.getRepair()
            })
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

