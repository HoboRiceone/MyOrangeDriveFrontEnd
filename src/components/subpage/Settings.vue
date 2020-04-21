<template>
  <div class="settings">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Birthday: 
      <el-input v-model="birthdayinput" class="inputbox"></el-input>
    </div>
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
      Gender: 
      <el-input v-model="genderinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Password: 
      <el-input v-model="passwordinput" class="inputbox" show-password></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data ()
  {
    return{
      birthdayinput: '',
      firstnameinput: '',
      lastnameinput: '',
      genderinput: '',
      passwordinput: ''
    };
  },
  created: function () 
  {
    this.$api.get('/api/profile', 
      {
      }, response => {
      if (response.status == 200) 
      {
        this.birthdayinput=response.data.result_data.profile.birthday;
        this.firstnameinput=response.data.result_data.profile.first_name;
        this.lastnameinput=response.data.result_data.profile.last_name;
        this.genderinput=response.data.result_data.profile.gender;

      } 
      else if(response.status == 400)
      {
        alert(response.data.msg);
        
      }
      else
      {
        alert("Network Error");
      }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.settings
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
