<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="12" class="logo-container">
              <div style="margin-left:20px;margin-top:10px">
                <img src="../assets/management.webp" class="logo" alt="">
                <span class="title">物业管理系统</span>
              </div>
            </el-col>
            <el-col :span="12" class="user">
                <div class="userinfo">
                    <img src="../assets/320.png" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span style="el-dropdown-link">
                                <el-icon style="el-icon-caret-bottom el-icon--right">
                                  <arrow-down-bold class="arrowDown"/>
                                </el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    name:'head-nav',
    computed: {
        user() {
          console.log(this.$store.getters.user)
      return this.$store.getters.user
    }
  },
  methods:{
      setDialogInfo(cmdItem){
          //console.log(this.$store.getters.user)
          //console.log(cmdItem)
          switch(cmdItem){
            case 'info':
                this.showInfoList()
                break
            case 'logout':
                this.logout()
                break
          }
      },
      showInfoList(){
          this.$router.push('/infoshow')
      },
      logout(){
        localStorage.removeItem('eleToken')
        this.$store.dispatch('clearCurrentState')
        this.$router.push('/login')
      }
  }
}
</script>


<style scoped>
.head-nav {
  width: 100%;
  height: 80px;
  min-width: 600px;
  padding: 5px;
  background: #154599;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
.arrowDown{
  margin-top: 60px;
}
</style>