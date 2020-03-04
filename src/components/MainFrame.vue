<template>
  <div class="mainframe">
    <el-container style="height:100%">
      <el-header class="mainheader">
        <img src="../assets/MainIcon.png" style="height:100%;float:left;"/>
      </el-header>
      <el-main style="background-color:#DCDFE6;margin: 0px;padding: 0px;">
          <el-menu default-active="1" class="navmenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
               <i class="el-icon-menu"></i>
              File Management
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              Settings
            </el-menu-item>
          </el-menu>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainFrame'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mainframe{
  background-color:white;
  height:100%;
  width:100%;
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}
.mainheader{
  background-color:#D84300;
  height:20%;
  color:white;
  font-size:4em;
  box-shadow: 10 10px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.navmenu{
  width:15%;
  height:100%;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
