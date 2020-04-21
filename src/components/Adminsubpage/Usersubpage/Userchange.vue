<template>
  <div class="userchange">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Total Storage: 
      <el-input v-model="totalstorageinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Blocked Status: <br />
      <el-radio-group v-model="blockedstatusinput">
        <el-radio-button label="true"></el-radio-button>
        <el-radio-button label="false"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Upload Access: <br />
      <el-radio-group v-model="uploadacessinput">
        <el-radio-button label="true"></el-radio-button>
        <el-radio-button label="false"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Download Access: <br />
      <el-radio-group v-model="downloadacessinput">
        <el-radio-button label="true"></el-radio-button>
        <el-radio-button label="false"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userchange',
  data ()
  {
    return{
      totalstorageinput: '',
      blockedstatusinput: '',
      uploadacessinput: '',
      downloadacessinput: '',
    };
  },
  created: function () 
  {
    var changeitem=this.$route.params.changeitem;
    this.totalstorageinput=changeitem.totalstorage;
    this.blockedstatusinput=changeitem.blockedstatus;
    this.uploadacessinput=changeitem.uploadaccess;
    this.downloadacessinput=changeitem.downloadaccess;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userchange
{
  background-color:white;
  height:100%;
}
.inputblock
{
  margin-left:3%;
  text-align:left;
  width:30%;
}
.inputbox
{
  width:100%;
}
</style>
