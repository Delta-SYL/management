<template>
    <div class="home">
        <div class="container">
            <h1 class="title">物业管理系统</h1>
        </div>
        <el-row>
            <el-col :span='14'>
              <p class="notice">公告</p>
                <el-card class="box-card">
                <span class="spantitle">{{noticetitle}}</span> 
                <hr style="width:70%;color:blue" >
                <span class="adminid">发布人员ID: {{noticeadId}} 发布日期：{{noticedate}}</span> 
                <div class="content"><pre>{{noticecontent}}</pre></div>
                </el-card>
            </el-col>
            <el-col :span='10'>
              <p class="notice">往期公告</p>
                  <div class="table">
        <el-table stripe :data="tableData" style="width: 100%"  max-height="450" border>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="num" label="公告号" width="80" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="350" align="center"></el-table-column>
            <el-table-column prop="date"  label="发布日期" width="140" align="center"></el-table-column>
            <el-table-column align="center"  width=100 label="详情">
            <template #default="scope">
                <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
        </el-row>
    </div>
</template>

<script>
//import Dialog from '../components/Dialog.vue';
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
            noticetitle:"",
            noticeadId:"",
            noticedate:"",
            noticecontent:"",
            allTableData:[],
            formData:{
              cid:"",
              title:"",
              content:"",
              flag:"",
              date:"",
              handleid:""
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
            this.$axios.post('/api/notice/info',this.$store.getters.user)
            .then(res=>{
                this.allTableData=res.data
                this.noticetitle=this.allTableData[0].title
                this.noticeadId=this.allTableData[0].adId
                this.noticedate=this.allTableData[0].date
                this.noticecontent=this.allTableData[0].content
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
                console.log(index)
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
            //console.log(index)
            //console.log(row)
            this.dialog={
                show:true,
                title:"修改报修单：",
                option:"edit",
                type:"complain"
            }
            this.formData={
              title:row.title,
              content:row.content,
              cid:row.cid
            }
        },
    },
    components:{
        //Dialog
    }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.adminid{
  display: block;
  text-align: center;
  font-size: 10px;
  color: gray;
}
.item {
  margin-bottom: 18px;
}
.spantitle{
  display: block;
  text-align: center;
  font-size: 30px;
}
.content{
  margin-top: 5%;
  margin-left: 100px;
  margin-right: 100px;
}
.box-card {
  width: 800px;
  height: 500px;
  margin-top: 3%;
  margin-left: 5%;
}
.home {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(245, 245, 245, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 40px;
  color: rgb(0, 0, 0);
}
.lead {
  margin-top: 50px;
  font-size: 22px;
  color: rgb(0, 0, 0);
}
.notice{
  margin-top: 5%;
  margin-left: 7%;
  font-size: 40px;
}
.table{
  margin-top: 5%;
}
</style>

