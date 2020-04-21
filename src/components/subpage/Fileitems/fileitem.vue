<template>
  <div  class="fileitem">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div class="fileiteminside">
        <i class="el-icon-document"></i>
        {{filename}}
      </div>
    </div>

    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      1024
    </div>

    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button icon="el-icon-download" circle></el-button>
      <el-button icon="el-icon-link" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fileitem',
  props:['filename'],
  data () {
    return {
      operationshow: 'none'
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileitem
{
  padding:0.5%;
  width:100%;
  display:inline-block;
  margin: 0px;

}
.fileitem:hover
{
  background-color:#F5F7FA;
}
.fileiteminside
{
  font-size:1.2em;
  display:inline-block;
  float:left;
}
</style>
