<template>
  <div class="filemanagement">
    <el-container>
      <el-header class="toolview">
        <el-button class="toolcompent" type="primary">Upload</el-button>
        <el-button class="toolcompent" type="primary" plain>Download</el-button>
      </el-header>
      <h5 style="text-align: left;height:2%; position:relative; left:1%;">File Name:</h5>
      <el-menu class="fileview">
        <div style="height:2%"></div>
        <el-menu-item  class="folderitem">
          <i class="el-icon-folder" style="font-size:100%"></i>
          .mvm/wrapper
        </el-menu-item>
        <el-menu-item  class="folderitem">
          <i class="el-icon-folder" style="font-size:100%"></i>
          log
        </el-menu-item>
        <el-menu-item  class="folderitem">
          <i class="el-icon-folder" style="font-size:100%"></i>
          src
        </el-menu-item>
        <el-menu-item  class="fileitem">
          <i class="el-icon-document" style="font-size:100%"></i>
          .gitignore
        </el-menu-item>
        <el-menu-item  class="fileitem">
          <i class="el-icon-document" style="font-size:100%"></i>
          README.md
        </el-menu-item>
        <el-menu-item  class="fileitem">
          <i class="el-icon-document" style="font-size:100%"></i>
          mvnw
        </el-menu-item>
        <el-menu-item  class="fileitem">
          <i class="el-icon-document" style="font-size:100%"></i>
          mvnw.cmd
        </el-menu-item>
        <el-menu-item  class="fileitem">
          <i class="el-icon-document" style="font-size:100%"></i>
          pom.xml
        </el-menu-item>
      </el-menu>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Filemanagement'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filemanagement
{
  background-color:white;
  height:100%;
}
.fileview
{
  text-align: left;
}
.toolview
{
  padding:0.5%;
}
.toolcompent
{
  float:left;
  width:7%;
}
.fileitem
{
  font-size:1em;
  border-top:1px solid #F2F6FD;
  border-bottom:1px solid #F2F6FD;
}
.folderitem
{
  font-size:1em;
  border-top:1px solid #F2F6FD;
  border-bottom:1px solid #F2F6FD;
}
</style>
