<template>
<div class="fillContainer">
    <div class="table_container">
        <div class="userinfo">
            住户信息
        </div>
        <el-table stripe :data="tableData" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="uid" label="户主编号" width="100" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" width="250" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="300" align="center"></el-table-column>
            <el-table-column prop="email"  label="邮箱" width="300" align="center"></el-table-column>
            <el-table-column prop="idNum"  label="身份证号" width="300" align="center"></el-table-column>
            <el-table-column prop="flag"  label="状态" width="200" align="center"></el-table-column>
            <el-table-column align="center"  width=200 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
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
import Dialog from '../../components/AdminUserDialog.vue';
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
            formData:{},
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
            this.$axios.post('/api/adminuser/test',this.$store.getters.user)
            .then(res=>{
                this.allTableData=res.data
                //console.log(res.data)
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
        handleEdit(index,row){

            this.$axios.post('/api/adminuser/check',row)
            .then(res=>{
               // this.$message('删除成功')
               //console.log(res)
               this.formData=res.data
               console.log(this.formData)
               //console.log(this.allTableData)
                //this.getRepair()
                this.dialog={
                show:true,
                title:"同住人信息及房产证：",
                option:"edit",
                type:"complain"
            }
            }) 
            
        },
        handleDelete(index,row){
            this.$axios.post('/api/adminuser/delete',row)
            .then(res=>{
                this.$message('注销成功')
                this.getRepair()
            })
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
.userinfo{
    margin-top:30px ;
    margin-bottom: 30px;
    margin-left: 5px;
    font-size: 30px;
}
</style>

