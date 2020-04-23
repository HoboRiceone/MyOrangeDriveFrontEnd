<template>
  <div  class="fileitem">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div class="fileiteminside">
        <i class="el-icon-document"></i>
        {{filename}}
      </div>
    </div>

    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{filesize}}
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{createddate}}
    </div>
    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button icon="el-icon-download" circle @click="download"></el-button>
      <el-button icon="el-icon-link" circle></el-button>
      <el-button icon="el-icon-delete" circle @click="deletefile"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fileitem',
  props:['filename','filesize','fileid','dirpreid','createddate'],
  data () {
    return {
      operationshow: 'none'
    };
  },
  methods:{
    download()
    {
      console.log(this.fileid);
      this.$api.get('/api/d/'+this.fileid,
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
      }, response => {
      if (response.status == 200) 
      {
        var link = document.createElement('a');
        link.download="";
        link.href = response.data.result_data.download_url;
        link.click();
      } 
      else
      {
        alert("Error:"+response.data.msg);
        console.log(response);
      }
      });
    },
    deletefile()
    {
      this.$confirm('This operation will delete this file:'+this.filename, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/api/files/'+this.fileid, 
          {
            'x-auth-token': this.Common.xtoken
          }, 
          {
          }, response => {
          if (response.status == 200) 
          {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.dirpreid});
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
