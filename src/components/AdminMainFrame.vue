<template>
  <div class="adminmainframe">
    <el-container style="height:100%">
      <el-header class="mainheader">
        <div style="height:10%;"></div>
        <img src="../assets/MainIcon.png" style="height:80%;float:left;"/>
      </el-header>
      <el-container>
        <el-aside style="background-color:#DCDFE6;margin: 0px;padding: 0px;">
            <el-menu default-active="$route.path" class="navmenu" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <div style="height:2%"></div>
              <el-menu-item index="/Usermanagement" style="font-size:35%;">
                <i class="el-icon-user" style="font-size:100%"></i>
                User Management
              </el-menu-item>
              <el-menu-item index="/Storageconfigure" style="font-size:35%;">
                <i class="el-icon-coin" style="font-size:100%"></i>
                Storage Configure
              </el-menu-item>
              <el-menu-item index="/SystemSettings" style="font-size:35%;">
                <i class="el-icon-setting" style="font-size:100%"></i>
                System Settings
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="background-color:#DCDFE6;margin: 0px;padding: 0px;">
          <router-view class="subview"/>
        </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'AdminMainFrame',
  data ()
  {
    return{
    };
  },
  created: function () 
  {
  },
  methods:
  {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.adminmainframe{
  background-color:white;
  height:100%;
  width:100%;
}

.mainheader{
  background-color:#D84300;
  height:20%;
  color:white;
  font-size:4em;

}

.navmenu{
  font-size: 60px;
  text-align: left;
  width:100%;
  height:100%;
  /* box-shadow: 10px 10px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  float:left;
  
}

.subview{
  margin: 0px;
  padding: 0px;
  width:100%;
  border:0px;
}
</style>
