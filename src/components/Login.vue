<template>
  <div class="login">
    <el-container class="loginput">
      <el-header style="height:10%;">
      </el-header>
      <el-main style="height:20%; overflow-x:hidden;">
        <img src="../assets/DriveIcon.png" style="height:50px;"/>
      </el-main>
      <el-main>
        <el-input v-model="username" placeholder="Username"></el-input>
      </el-main>
      <el-main>
        <el-input v-model="password" placeholder="Password"></el-input>
      </el-main>
      <el-main>
        <el-button type="primary" style="float:right" @click="UserLogin">Next</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return{
    username:'',
    password:''
    }
  },
  methods:{
    UserLogin () {
      if(this.username == "cse687" && this.password == "687687")
      {
        this.$router.push({name:"MainFrame"})
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
</style>
