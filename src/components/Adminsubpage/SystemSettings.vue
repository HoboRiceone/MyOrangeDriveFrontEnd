<template>
  <div class="systemsettings">
    <div style="height:5%;"></div>
    <div class="inputblock">
      New Admin Password: 
      <el-input v-model="systempassword" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'SystemSettings',
  data ()
  {
    return{
      systempassword: "",
    };
  },
  methods:
  {
    save ()
    {
      this.$http2.post(this.Common.baseurl+"/admin/password", 
      {
        "password": this.systempassword,
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
        console.log(error.response)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.systemsettings
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

