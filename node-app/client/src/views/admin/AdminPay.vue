<template>
<div class="fillContainer">
    <el-row>
    <el-col :span='12'>
    <div class="pay">未支付
        <div class="buttontype">
        <el-button type="primary"   @click="handleAdd()">添加</el-button>
        </div>
    </div>      
    <div class="table_container">
        <el-table stripe :data="tableDataw" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="pid" label="缴费单号" width="120" align="center"></el-table-column>
            <el-table-column prop="date"  label="创建日期" width="230" align="center"></el-table-column>
            <el-table-column prop="payment" label="金额" width="120" align="center"></el-table-column>
            <el-table-column align="center"  fixed="right"  width="auto" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEditw(scope.$index, scope.row)">查看</el-button>
                <el-button type="warning" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    </el-col>
    <el-col :span='12'>
    <p class="finish">已完成</p>
    <div class="table_container">
        <el-table stripe :data="tableDatac" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="pid" label="缴费单号" width="120" align="center"></el-table-column>
            <el-table-column prop="date"  label="创建日期" width="230" align="center"></el-table-column>
            <el-table-column prop="payment" label="金额" width="120" align="center"></el-table-column>
            <el-table-column align="center"  fixed="right"  width="auto" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEditc(scope.$index, scope.row)">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row>
        <el-col :span='24'>
        <div class="pagination">
        <el-pagination
            :currentPage.sync="paginationsc.page_index"
            :page-size="paginationsc.page_size"
            :layout="paginationsc.layout"
            :total="paginationsc.total"
            @current-change="handleCurrentChangec"
        />
        </div>
        </el-col>
        </el-row>
    </div>
    </el-col>
    </el-row>
    <Dialog :dialog="dialog" :formData="formData" @update="getRepair"></Dialog>
    </div>
</template>


<script>
import Dialog from '../../components/AdminPayDialog.vue';
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
            paginationsc:{
                page_index:1,
                total:0,
                page_size:5,
                layout:'total, prev, pager, next, jumper'
            },
            tableDataw:[],
            tableDatac:[],
            allTableDataw:[],
            allTableDatac:[],
            formData:{
              id:"",
              title:"",
              content:"",
              flag:"",
              date:"",
              handleid:"",
              money:"",
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
            //console.log(this.$store.getters.user)
            this.$axios.post('/api/adminpay/selw',this.$store.getters.user)
            .then(res=>{
                this.allTableDataw=res.data
                this.setPaginations()
                //console.log(res)
            })
            .catch(err=>console.log(err))
            this.$axios.post('/api/adminpay/selc',this.$store.getters.user)
            .then(res=>{
                this.allTableDatac=res.data
                this.setPaginationsc()
                //console.log(res)
            })
            .catch(err=>console.log(err))
        },
        handleCurrentChange(page){
            let index=this.paginations.page_size*(page-1)
            let nums=this.paginations.page_size*page
            let tables=[]
            for(let i=index;i<nums;i++){
                if(this.allTableDataw[i]){
                    tables.push(this.allTableDataw[i])
                }
                this.tableDataw=tables
                this.paginations.page_index=page
            }
        },
        handleCurrentChangec(page){
            let index=this.paginationsc.page_size*(page-1)
            let nums=this.paginationsc.page_size*page
            let tables=[]
            for(let i=index;i<nums;i++){
                if(this.allTableDatac[i]){
                    tables.push(this.allTableDatac[i])
                }
                this.tableDatac=tables
                this.paginationsc.page_index=page
            }
        },
        setPaginations(){
            this.paginations.total=this.allTableDataw.length
            this.paginations.page_index=1
            this.paginations.page_size=5
            this.tableDataw=this.allTableDataw.filter((item,index)=>{
                return index<this.paginations.page_size
            })
        },
        setPaginationsc(){
            this.paginationsc.total=this.allTableDatac.length
            this.paginationsc.page_index=1
            this.paginationsc.page_size=5
            this.tableDatac=this.allTableDatac.filter((item,index)=>{
                return index<this.paginationsc.page_size
            })
        },
        handleAdd(){
            this.$axios.post('/api/adminpay/add')
            .then(res=>{
                this.$message('已生成')
                this.getRepair()
            })
            .catch(err=>console.log(err))
        },
        handleDel(index,row){
            this.$axios.post('/api/adminpay/delete',row)
            .then(res=>{
                this.$message('已删除')
                this.getRepair()
            })
            .catch(err=>console.log(err))
        },
        handleEditw(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"修改缴费单：",
                option:"edit",
            }
            this.formData={
              pid:row.pid,
              uid:row.uid,
              payment:row.payment,
              date:row.date,
              content:row.content,
            }
        },
        handleEditc(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"已缴费：",
                option:"processing",
            }
            this.formData={
              pid:row.pid,
              uid:row.uid,
              payment:row.payment,
              date:row.date,
              content:row.content,
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
    width: 300px;
    text-align: right;
    margin-top: 10px;
     float:right;
}
.pay{
    margin-top:20px ;
    margin-bottom: 30px;
    margin-left: 20px;
    font-size: 30px;
}
.table_container{
    width: 90%;
    margin: auto;
}
.buttontype{
    float: right;
    margin-right: 70px;
}
.finish{
    margin-top:20px ;
    margin-bottom: 30px;
    margin-left: 20px;
    font-size: 30px;
}
</style>

