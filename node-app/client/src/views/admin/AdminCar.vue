<template>
<div class="fillContainer">
    <div class="table_container">
        <div class="carinfo">
            车位信息
        </div>
        <el-table stripe :data="tableData" style="width: 100%"  max-height="500" border>
            <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
            <el-table-column prop="cpid" label="车位编号" width="300px" align="center"></el-table-column>
            <el-table-column prop="uid" label="住户编号" width="350px" align="center"></el-table-column>
            <el-table-column prop="size" label="状态" width="300px" align="center"></el-table-column>
            <el-table-column width="500px"></el-table-column>
            <el-table-column align="center" fixed="right" width="200px" label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row>
        <el-col :span='24'>
        <div class="pagination">
        <el-pagination
            :currentPage.sync="paginations.page_index"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
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
import Dialog from '../../components/AdminCarDia.vue';
export default {
    data(){
        return{
            paginations:{
                page_index:1,
                total:0,
                page_size:10,
                layout:'total, prev, pager, next, jumper'
            },
            dialog:{
                show:false,
                title:'',
                option:'edit'
            },
            tableData:[],
            allTableData:[],
            formData:[]
        }
    },
    created(){
        this.getRepair();
    },
    methods:{
        getRepair(){
            this.$axios.post('/api/admincar/test',this.$store.getters.user)
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
            this.paginations.page_size=10
            this.tableData=this.allTableData.filter((item,index)=>{
                //console.log(index)
                return index<this.paginations.page_size
            })
        },
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
        },
        handleDelete(index,row){
            this.$axios.post('/api/admincar/delete',row)
            .then(res=>{
                this.$message('删除成功')
                this.getRepair()
            })
        },
        handleEdit(index,row){
            this.dialog={
                show:true,
                title:"修改车位信息：",
                option:"edit",
                type:"complain"
            }
            this.formData={
              cpid:row.cpid,
              uid:row.uid,
              size:row.size
            }
        },
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
.pagination{
    width: 400px;
    text-align: right;
    margin-top: 10px;
     float:right;
}
.carinfo{
    margin-top:30px ;
    margin-bottom: 30px;
    margin-left: 5px;
    font-size: 30px;
}
</style>

