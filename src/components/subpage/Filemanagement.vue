<template>
  <div class="filemanagement">
    <el-container>
      <el-header class="toolview">
        <el-button class="toolcompent" type="primary" @click="add">Upload</el-button>
        <el-button class="toolcompent" type="primary" plain>Download</el-button>
      </el-header>
      <h5 style="text-align: left;height:2%; position:relative; left:1%;">File Name:</h5>
      <div style="height:2%"></div>
      <div v-for="(item,index) in items" :key="index">
          <folderitem></folderitem>
      </div>
    </el-container>
  </div>
</template>

<script>
import folderitem from "./Fileitems/folderitem";
export default {
  name: 'Filemanagement',
  data ()
  {
    return{
      items: []
    };
  },
  components:
  {
    folderitem
  },
  methods:
  {
    add: function () {
      this.items.push({});
    }
  }
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
</style>
