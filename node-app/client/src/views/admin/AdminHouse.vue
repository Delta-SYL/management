<template>
<div class="fillContainer">
    <div class="table_container">
        <div class="houseinfo">
            住房信息
        </div>
        <el-table stripe :data="tableData" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
            <el-table-column prop="uid" label="住户编号" width="100px" align="center"></el-table-column>
            <el-table-column prop="address" label="具体楼栋" width="650px" align="center"></el-table-column>
            <el-table-column prop="area" label="面积" width="200px" align="center"></el-table-column>
            <el-table-column width="500px"></el-table-column>
            <el-table-column align="center" fixed="right" width="200px" label="操作">
            <template #default="scope">
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
    </div>

</template>

<script>
export default {
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
        }
    },
    created(){
        this.getRepair();
    },
    methods:{
        getRepair(){
            this.$axios.post('/api/adminhouse/test',this.$store.getters.user)
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
            this.$axios.post('/api/adminhouse/delete',row)
            .then(res=>{
                this.$message('删除成功')
                this.getRepair()
            })
        },
    },

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
.houseinfo{
    margin-top:30px ;
    margin-bottom: 30px;
    margin-left: 5px;
    font-size: 30px;
}
</style>

