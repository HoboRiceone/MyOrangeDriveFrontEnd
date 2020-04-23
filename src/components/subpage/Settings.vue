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
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data ()
  {
    return{
      id: 0,
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
        'x-auth-token': this.Common.xtoken
      },
      {}, response => {
      if (response.status == 200) 
      {
        this.id=response.data.result_data.id;
        this.birthdayinput=response.data.result_data.birthday;
        this.firstnameinput=response.data.result_data.first_name;
        this.lastnameinput=response.data.result_data.last_name;
        this.genderinput=response.data.result_data.gender;

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
  },
  methods:
  {
    save()
    {
      this.$http2.post(this.Common.baseurl+"/api/profile/", 
      {
        "birthday": this.birthdayinput,
        "first_name": this.firstnameinput,
        "last_name": this.lastnameinput,
        "gender": this.genderinput,
        "password": this.passwordinput
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Success!',duration: 3000});
          }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    }
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
