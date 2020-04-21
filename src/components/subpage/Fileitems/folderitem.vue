<template>
  <div  class="folderitem">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div style="font-size:1.2em;float:left;">
        <i class="el-icon-folder"></i> 
      </div>
      <div class="intofolder" style="font-size:1.2em;float:left;" @click="getinto">
        {{foldername}}
      </div>
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      -
    </div>
    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button icon="el-icon-download" circle></el-button>
      <el-button icon="el-icon-link" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'folderitem',
  props:['foldername','folderid'],
  data () {
    return {};
  },
  mounted: function () 
  {
  },
  methods:
  {
    getinto()
    {
      this.$bus.emit('updateDirID',{dirID: this.folderid});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.folderitem
{
  padding:0.5%;
  width:100%;
  display:inline-block;
  margin: 0;

}
.folderitem:hover
{
  background-color:#F5F7FA;
}
.intofolder:hover
{
  color:#409EFF;
}
</style>
