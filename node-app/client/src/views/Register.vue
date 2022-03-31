<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">物业管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerUser.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNum">
            <el-input  v-model="registerUser.idNum" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="具体位置" prop="address">
            <el-select v-model="registerUser.building" placeholder="栋">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>                
            </el-select>
            <el-select v-model="registerUser.build" placeholder="楼">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
            </el-select>
            <el-select v-model="registerUser.room" placeholder="室">
                <el-option label="101" value="101"></el-option>
                <el-option label="102" value="102"></el-option>
                <el-option label="103" value="103"></el-option>
                <el-option label="201" value="201"></el-option>
                <el-option label="202" value="202"></el-option>
                <el-option label="203" value="203"></el-option>
                <el-option label="301" value="301"></el-option>
                <el-option label="302" value="302"></el-option>
                <el-option label="303" value="303"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="车位类型" prop="carpark">
            <el-select v-model="registerUser.carpark" placeholder="请选择类型">
                <el-option label="购买" value="1"></el-option>
                <el-option label="租借" value="2"></el-option>
                <el-option label="没有" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button  type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data(){
    var validatePass2=(rule,value,callback)=>{
      if(value!==this.registerUser.password){
        callback(new Error('两次输入密码不一致！'));
      }else{
        callback();
      }
    };
      return{
          registerUser:{
              name:"",
              phone:"",
              email:"",
              password:"",
              password2:"",
              idNum:"",
              address:"",
              carpark:""
          },
          rules:{
              name:[{
                  required:true,message:"用户名不能为空",trigger:"blur"
              }],
              phone:[{
                required:true,message:"手机号不能为空",trigger:"blur"
              }],
              email:[{
                  type:"email",required:true,message:"邮箱格式不正确",trigger:"blur"
              }],
              password:[{
                required:true,
                message:"密码不能为空",
                trigger:"blur"
              },{
                min:6,
                max:30,
                message:"长度在6到30之间",
                trigger:"blur"
              }],
              password2:[{
                required:true,
                message:"确认密码不能为空",
                trigger:"blur"
              },{
                min:6,
                max:30,
                message:"长度在6到30之间",
                trigger:"blur"
              },{
                validator:validatePass2,
                trigger:'blur'
              }],
              idNum:[{
                required:true,
                message:"身份证号不能为空",
                trigger:"blur"
              }],
              /*address:[{
                required:true
              }],
              carpark:[{
                required:true
              }]*/
          }
      }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.$axios.post("/api/users/register",this.registerUser)
          .then(res=>{
            this.$message({
              message:"账号注册成功",
              type:"success"
            })
          })
          this.$router.push('/login')
        }
        else{
          console.log("error submit");
          return false;
        }
      })
    }
  }
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
