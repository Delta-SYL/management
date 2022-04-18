<template>
  <el-row class="admin_menu_page">
    <el-col>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
       <router-link to='/adminhome'>
            <el-menu-item index='0'>
                <el-icon class="fa fa-matgin fa-server"></el-icon>
                <span slot="title">首页</span>
            </el-menu-item>
            <template v-for='item in items'>
                <el-sub-menu v-if='item.children' :index='item.path' :key="item.path">
                    <template #title>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <router-link v-for='(citem,cindex) in item.children' :to='citem.path' :key='cindex'>
                        <el-menu-item :index='citem.path'>
                            <span slot="title">{{citem.name}}</span>
                        </el-menu-item>
                    </router-link>
                </el-sub-menu>
            </template>
       </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name:'admin-left-menu',
    data(){
        return {
            items:[
            {
                name:'事务', 
                path:'fund',
                children:[
                    {path:'adminnotice',name:'公告'},
                    {path:'adminrepair',name:'保修'},
                    {path:'admincomplain',name:'投诉'},
                    {path:'adminother',name:'其他'},
                ]
            },
            {
                name:'信息管理',
                path:'info',
                children:[
                    {path:'adminuserinfo',name:'住户信息'},
                    {path:'adminhouse',name:'住房信息'},
                    {path:'admincar',name:'车位信息'}
                ]
            },
            ]
        }
    }
}
</script>


<style scoped>
.admin_menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 800px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-sub-menu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>