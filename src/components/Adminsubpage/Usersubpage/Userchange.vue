<template>
  <div class="userchange">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Total Storage: 
    </div>
    <div class="inputblock">
      <el-input v-model="totalstorageinput" style="width:85%;">
      </el-input>
      <el-select v-model="unitselect" style="width:15%;">
        <el-option label="KB" value="1024"></el-option>
        <el-option label="MB" value="1048576"></el-option>
        <el-option label="GB" value="1073741824"></el-option>
      </el-select>
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
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userchange',
  data ()
  {
    return{
      userid: 0,
      totalstorageinput: "",
      blockedstatusinput: "false",
      uploadacessinput: "false",
      downloadacessinput: "false",
      unitselect: "1048576"
    };
  },
  created: function () 
  {
    var changeitem=this.$route.params.changeitem;
    var storageinit=parseInt(changeitem.totalstorage);
    if(storageinit >= 1073741824)
    {
      this.totalstorageinput=(storageinit/1073741824).toString();
      this.unitselect="1073741824";
    }
    else if(storageinit >= 1048576)
    {
      this.totalstorageinput=(storageinit/1048576).toString();
      this.unitselect="1048576";
    }
    else if(storageinit >= 1024)
    {
      this.totalstorageinput=(storageinit/1024).toString();
      this.unitselect="1024";
    }
    else
    {
      this.totalstorageinput="0";
    }
    this.blockedstatusinput=changeitem.blockedstatus;
    this.uploadacessinput=changeitem.uploadaccess;
    this.downloadacessinput=changeitem.downloadaccess;
    this.userid=changeitem.id;
  },
  methods:{
    save()
    {
      var finalstorage=parseInt(this.totalstorageinput) * parseInt(this.unitselect);
      this.$http2.post(this.Common.baseurl+"/admin/users/"+this.userid, 
      {
        "total_storage": finalstorage.toString(),
        "blocked_status": this.stringtobool(this.blockedstatusinput),
        "upload_access": this.stringtobool(this.uploadacessinput),
        "download_access": this.stringtobool(this.downloadacessinput)
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Change user information success!',duration: 3000});
            this.$router.push({name:"Usermanagement"});
          }
      })
      .catch(function (error) {
        console.log(error.response);
        this.$router.push({name:"Usermanagement"});
      });
    },
    stringtobool(st)
    {
      if(st == "true")
      {
        return true;
      }
      else
      {
        return false;
      }
    }
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
