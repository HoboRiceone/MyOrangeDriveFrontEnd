<template>
  <div class="login">
    <el-container class="loginput">
      <el-header style="height:10%;">
      </el-header>
      <el-main style="height:20%; overflow-x:hidden;">
        <img src="../assets/DriveIcon.png" style="height:90%;"/>
      </el-main>
      <el-main>
        <el-input v-model="username" placeholder="Username" style="position:relative;top:35%;"></el-input>
      </el-main>
      <el-main>
        <el-input v-model="password" placeholder="Password" show-password></el-input>
      </el-main>
      <el-main>
        <el-radio-group v-model="logtype" style="float:left">
          <el-radio-button label="User"></el-radio-button>
          <el-radio-button label="Admin"></el-radio-button>
        </el-radio-group>
        <el-button type="primary" style="float:right;width:25%;font-size:1.3em;" @click="Login">Next</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return{
    username:'johnwick123@gmail.com',
    password:'123123',
    logtype: 'User'
    }
  },
  methods:{
    Login () 
    {
      if (this.logtype=='User')
      {
        this.$api.post('/api/login', {},
        {
          username: this.username,                        //'johnwick123@gmail.com',
          password: this.password                       //'1231234'
        }, response => {
        if (response.status == 200) 
        {
          this.Common.xtoken=response.headers['x-auth-token'];

          this.$router.push({name:"MainFrame"})
        } 
        else if(response.status == 400)
        {
          alert(response.data.msg);
          
        }
        else
        {
          alert("Network Error");
        }
        });
      }
      else if (this.logtype=='Admin')
      {
        this.$api.post('/admin/login', {},
        {
          username: this.username,                        //'johnwick123@gmail.com',
          password: this.password                       //'1231234'
        }, response => {
        if (response.status == 200) 
        {
          this.Common.xtoken=response.headers['x-auth-token'];

          this.$router.push({name:"AdminMainFrame"});
        } 
        else if(response.status == 400)
        {
          alert(response.data.msg);
          
        }
        else
        {
          alert("Network Error");
        }
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .login{background:url(../assets/LoginWallpaper.jpeg)} */
.login{background-color:#EBEEF5}
.loginput{
  background-color:white; 
  height: 440px;
  width:450px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .el-switch__core
  {
    height:60px;
  }
</style>
