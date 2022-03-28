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
        <el-table v-if="tableData.length>0" :data="tableData" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
            <el-table-column prop="type" label="类型" width="250" align="center"></el-table-column>
            <el-table-column prop="money" label="金额" width="250" align="center"></el-table-column>
            <el-table-column prop="other" label="其他" width="250" align="center"></el-table-column>
            <el-table-column align="center" width=180 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
   <!-- <el-row>
        <el-col :span="24">
            <div class="pagination">
                <el-pagination :currentPage.sync="paginations.page_index" :page-size="paginations.page_size"
                :page-sizes="paginations.page_sizes"
                :small="small"
                :disabled="disabled"
                :background="background"
                :layout="paginations.layout"
                :total="paginations.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
            </div>
        </el-col>
    </el-row>-->
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/Dialog.vue';
export default {
    name:'fundList',
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
              type:"",
              money:"",
              other:""
            },
            dialog:{
                show:false,
                title:'',
                option:'edit'
            }
        }
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get('/api/profiles/test')
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
                title:"修改信息",
                option:"edit",
            }
            this.formData={
                type:row.type,
                money:row.money,
                other:row.other
            }
        },
        handleDelete(index,row){
            this.$axios.post('/api/profiles/delete',row)
            .then(res=>{
                this.$message('删除成功')
                this.getProfile()
            })
        },
        handleAdd(){
             this.dialog={
                show:true,
                title:"添加信息",
                option:"add",
            }
            this.formData={
                type:'',
                money:'',
                other:''
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

