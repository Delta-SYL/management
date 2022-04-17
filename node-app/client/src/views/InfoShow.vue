<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span='12'>
                <p class="title">住户信息</p>

              <div class="userinfo" >
                <div class="userinfoinside">
                <ul>
                  <li>
                    <p class="pinfo">姓名：</p><p class="pinform">{{formData.userName}}</p>
                  </li><hr style="width:70%;color:blue" >
                  <li>
                    <p class="pinfo">手机号：</p><p class="pinform">{{formData.phone}}</p>
                  </li><hr style="width:70%;color:blue" >

                  <li>
                    <p class="pinfo">邮箱：</p><p class="pinform">{{formData.email}}</p>
                  </li><br><hr style="width:70%;color:blue" >
                  <li>
                    <p class="pinfo">身份证号：</p><p class="pinform">{{formData.idNum}}</p>
                  </li><br><hr style="width:70%;color:blue" >
                  <li>
                    <p class="pinfo">门牌号：</p><p class="pinform">{{formData.address}}</p>
                  </li><br><hr style="width:70%;color:blue" >
                  <li>
                    <p class="pinfo">房屋面积：</p><p class="pinform">{{formData.area}}</p>
                  </li><br><hr style="width:70%;color:blue" >
                  <li>
                    <p class="pinfo">车位类型：</p><p class="pinform">{{formData.carpark}}</p>
                  </li><br><hr style="width:70%;color:blue" >
                </ul>
                </div>
              </div>

            </el-col>
            <el-col :span='12'>
              <p class="picinfo">房产证</p>
              <div class="pictype">
                <el-image  v-if="this.path" style="width: 80%"  :src="require('C:/Users/Delta/Desktop/论文/已传图片/'+this.path)" fit="fill">
                  <div class="image-slot">Loading<span class="dot">...</span></div>
                </el-image>
                </div>
            </el-col>
        </el-row>
    </div>
    
</template>

<script>
export default{
    name:'infoshow',
    data(){
      return{
        formData:[],
        path:''
      }
    },
    created(){
        this.getInfo();
    },
    methods:{
      getInfo(){
        this.$axios.post('/api/users/allinfo',this.$store.getters.user)
            .then(res=>{
                this.formData=res.data
                //console.log(this.formData.pic)
                this.path=res.data.pic
                console.log(this.path)
            })
            .catch(err=>console.log(err))
      },
      	getpath(path){
		      return require('C:/Users/Delta/Desktop/论文/已传图片/'+path)
	      }
    }
}
</script>


<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.title{
  margin-top: 5%;
  margin-left: 7%;
  font-size: 30px;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.pinfo{
  width: 80px;
  float: left;
  margin-top: 5%;
  margin-left: 20%;
  margin-bottom: 2%;
}
.pinform{
  width: 150px;
  float: left;
  margin-top: 5%;
  margin-left: 15%;
  margin-bottom: 2%;
}

.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  border-radius:30px;
  height: 65%;
  width:60%;
  margin: 10%;
  border:1px solid rgb(193, 138, 245);
}
.userinfoinside{
  padding-top: 10%;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
.test{
  width: 100px;
}
.pictype{
  margin-top: 100px;
}
.picinfo{
  margin-top: 5%;
  font-size: 30px; 
}
</style>

