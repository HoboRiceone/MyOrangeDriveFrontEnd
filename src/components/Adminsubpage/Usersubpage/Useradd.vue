<template>
  <div class="useradd">
    <div style="height:5%;"></div>
    <div class="inputblock">
      First name: 
      <el-input v-model="firstnameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Last name: 
      <el-input v-model="lastnameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Gender: <br/>
      <el-select v-model="genderinput">
        <el-option label="gentleman" value="F"></el-option>
        <el-option label="lady" value="M"></el-option>
      </el-select>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      E-mail: 
      <el-input v-model="emailinput" class="inputbox"></el-input>
    </div>
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
      Storage Source: <br/>
      <el-select v-model="souridinput">
        <el-option label="AWS" value="1"></el-option>
        <el-option label="Azure" value="2"></el-option>
        <el-option label="Local" value="3"></el-option>
      </el-select>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary" @click="add">Save</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Useradd',
  data ()
  {
    return{
      firstnameinput: "",
      lastnameinput: "",
      genderinput: "",
      emailinput: "",
      totalstorageinput: "",
      souridinput: "",
      unitselect: "1048576"
    };
  },
  methods:
  {
    add ()
    {
      var finalstorage=parseInt(this.totalstorageinput) * parseInt(this.unitselect);
      this.$http2.put(this.Common.baseurl+"/admin/users", 
      {
        "first_name": this.firstnameinput,
        "last_name": this.lastnameinput,
        "gender": this.genderinput,
        "email": this.emailinput,
        "total_storage": finalstorage.toString(),
        "source_id": this.souridinput
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Add user success!',duration: 3000});
            this.$router.push({name:"Usermanagement"});
          }
      })
      .catch(function (error) {
        console.log(error.response);
        this.$router.push({name:"Usermanagement"});
      });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.useradd
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
.inputblock1
{
  margin-left:3%;
  text-align:left;
}
.inputbox
{
  width:100%;
}
</style>
