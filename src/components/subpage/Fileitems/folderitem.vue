<template>
  <div  class="folderitem">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div style="font-size:1.2em;float:left;">
        <i class="el-icon-folder"></i> 
      </div>
      <div class="intofolder" style="font-size:1.2em;float:left;margin-left:0.6%;" @click="getinto">
        {{foldername}}
      </div>
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      -
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{createddate}}
    </div>
    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button icon="el-icon-delete" circle @click="deletefolder"></el-button>
      <!-- <el-button icon="el-icon-link" circle></el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'folderitem',
  props:['foldername','folderid','folderpreid','createddate'],
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
    },
    deletefolder()
    {
      this.$confirm('This operation will delete this folder:'+this.foldername, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/api/dirs/'+this.folderid, 
          {
            'x-auth-token': this.Common.xtoken
          }, 
          {
          }, response => {
          if (response.status == 200) 
          {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.folderpreid});
          } 
          else if(response.status == 400)
          {
            alert(response.data.msg);
            
          }
          else
          {
            alert("Network Error");
            console.log(response);
          }
          });
        }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled'
        });          
      });
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
