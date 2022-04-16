<template>
<div class="fillContainer">
    <div class="table_container">
        <el-table stripe :data="tableData" style="width: 100%"  max-height="800" border>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="pid" label="缴费单号" width="80" align="center"></el-table-column>
            <el-table-column prop="payment" label="金额" width="80" align="center"></el-table-column>
            <el-table-column prop="content" label="明细" width="1000" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="140" align="center"></el-table-column>
            <el-table-column prop="flag"  label="状态" width="100" align="center"></el-table-column>
            <el-table-column align="center"  width=200 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleRead(scope.$index, scope.row)">查看</el-button>
                <el-button type="warning" size="small" @click="handleConfirm(scope.$index, scope.row)">缴费</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row>
        <el-col :span='24'>
        <div class="pagination">
        <el-pagination
            :currentPage.sync="paginations.page_index"
            :page-size="paginations.page_size"
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
        </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getRepair"></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/PayDialog.vue';
export default {
    //name:'fundList',
    data(){
        return{
            paginations:{
                page_index:1,
                total:0,
                page_size:5,
                layout:'total, prev, pager, next, jumper'
            },
            tableData:[],
            allTableData:[],
            formData:{
              pid:"",
              payment:"",
              content:"",
              date:"",
              flag:"",
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
            this.$axios.post('/api/pay/test',this.$store.getters.user)
            .then(res=>{
                this.allTableData=res.data
                this.setPaginations()
                //console.log(res)
            })
            .catch(err=>console.log(err))
        },
        setPaginations(){
            this.paginations.total=this.allTableData.length
            this.paginations.page_index=1
            this.paginations.page_size=5
            this.tableData=this.allTableData.filter((item,index)=>{
                //console.log(index)
                return index<this.paginations.page_size
            })
        },
        handleRead(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"查看物业管理明细：",
            }
            this.formData={
              content:row.content,
            }
        },
        handleConfirm(index,row){
            this.$axios.post('/api/pay/confirm',row)
            .then(res=>{
                this.$message('已缴费')
                this.getRepair()
            })
        },
        /*handleSizeChange(page_size){
            this.paginations.page_index=1
            this.paginations.page_size=page_size
            this.tableData=this.allTableData.filter((item,index)=>{
                return index<page_size
            })
        },*/
        handleCurrentChange(page){
            let index=this.paginations.page_size*(page-1)
            let nums=this.paginations.page_size*page
            let tables=[]
            for(let i=index;i<nums;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i])
                }
                this.tableData=tables
                this.paginations.page_index=page
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
.table_container{
    margin-top: 2%;
}
.pagination{
    width: 400px;
    text-align: right;
    margin-top: 10px;
     float:right;
}
</style>

