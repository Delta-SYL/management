<template>
<div class="fillContainer">
    <el-row>
    <el-col :span='8'>
    <p>待处理</p>
    <div class="table_container">
        <el-table stripe :data="tableDataw" style="width: 100%"  max-height="450" border>
            <el-table-column prop="oid" label="其他事务工单号" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="260" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="130" align="center"></el-table-column>
            <el-table-column align="center"  width=100 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEditw(scope.$index, scope.row)">查看</el-button>
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
    </el-col>
    <el-col :span='8'>
    <p>处理中</p>
    <div class="table_container">
        <el-table stripe :data="tableDatai" style="width: 100%"  max-height="450" border>
            <el-table-column prop="oid" label="其他事务工单号" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="260" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="130" align="center"></el-table-column>
            <el-table-column align="center"  width=100 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEditi(scope.$index, scope.row)">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row>
        <el-col :span='24'>
        <div class="pagination">
        <el-pagination
            :currentPage.sync="paginationsi.page_index"
            :page-size="paginationsi.page_size"
            :small="small"
            :disabled="disabled"
            :background="background"
            :layout="paginationsi.layout"
            :total="paginationsi.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangei"
        />
        </div>
        </el-col>
        </el-row>
    </div>
    </el-col>
    <el-col :span='8'>
    <p>已完成</p>
    <div class="table_container">
        <el-table stripe :data="tableDatac" style="width: 100%"  max-height="450" border>
            <el-table-column prop="oid" label="其他事务工单号" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="260" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="130" align="center"></el-table-column>
            <el-table-column align="center"  width=100 label="操作">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEditc(scope.$index, scope.row)">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row>
        <el-col :span='24'>
        <div class="pagination">
        <el-pagination
            :currentPage.sync="paginationsc.page_index"
            :page-size="paginationsc.page_size"
            :small="small"
            :disabled="disabled"
            :background="background"
            :layout="paginationsc.layout"
            :total="paginationsc.total"
            @size-change="handleSizeChange"
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
import Dialog from '../../components/AdminDialog.vue';
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
            paginationsi:{
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
            tableDatai:[],
            tableDatac:[],
            allTableDataw:[],
            allTableDatai:[],
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
            this.$axios.post('/api/adminother/selw',this.$store.getters.user)
            .then(res=>{
                this.allTableDataw=res.data
                this.setPaginations()
                //console.log(res)
            })
            .catch(err=>console.log(err))
            this.$axios.post('/api/adminother/seli',this.$store.getters.user)
            .then(res=>{
                this.allTableDatai=res.data
                this.setPaginationsi()
                //console.log(res)
            })
            .catch(err=>console.log(err))
            this.$axios.post('/api/adminother/selc',this.$store.getters.user)
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
        handleCurrentChangei(page){
            let index=this.paginationsi.page_size*(page-1)
            let nums=this.paginationsi.page_size*page
            let tables=[]
            for(let i=index;i<nums;i++){
                if(this.allTableDatai[i]){
                    tables.push(this.allTableDatai[i])
                }
                this.tableDatai=tables
                this.paginationsi.page_index=page
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
                console.log(index)
                return index<this.paginations.page_size
            })
        },
        setPaginationsi(){
            this.paginationsi.total=this.allTableDatai.length
            this.paginationsi.page_index=1
            this.paginationsi.page_size=5
            this.tableDatai=this.allTableDatai.filter((item,index)=>{
                console.log(index)
                return index<this.paginationsi.page_size
            })
        },
        setPaginationsc(){
            this.paginationsc.total=this.allTableDatac.length
            this.paginationsc.page_index=1
            this.paginationsc.page_size=5
            this.tableDatac=this.allTableDatac.filter((item,index)=>{
                console.log(index)
                return index<this.paginationsc.page_size
            })
        },
        handleEditw(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"待处理其他事务：",
                option:"wait",
                type:"adminother"
            }
            this.formData={
              title:row.title,
              content:row.content,
              id:row.oid,
              date:row.date,
              uid:row.uid,
              money:row.money
            }
        },
        handleEditi(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"处理中报修事务：",
                option:"processing",
                type:"adminother"
            }
            this.formData={
              title:row.title,
              content:row.content,
              id:row.oid,
              date:row.date,
              uid:row.uid,
              money:row.money
            }
        },
        handleEditc(index,row){
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"已完成其他事务：",
                option:"complete",
                type:"adminother"
            }
            this.formData={
              title:row.title,
              content:row.content,
              id:row.oid,
              date:row.date,
              uid:row.uid,
              money:row.money
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
</style>

