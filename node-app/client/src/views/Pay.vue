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
            tableData:[],
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
                this.tableData=res.data
                //console.log(res)
            })
            .catch(err=>console.log(err))
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
</style>

