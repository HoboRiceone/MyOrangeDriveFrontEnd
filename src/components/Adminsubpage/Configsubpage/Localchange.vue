<template>
  <div class="localchange">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Name: 
      <el-input v-model="nameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Type: 
      <el-input v-model="typeinput" class="inputbox" :disabled="true"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Local Path: 
      <el-input v-model="localpath" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Localchange',
  data ()
  {
    return{
      nameinput: '',
      typeinput: '',
      localpath: '',
    };
  },
  created: function () 
  {
    var changeitem=this.$route.params.changeitem;
    this.nameinput=changeitem.name;
    this.typeinput=changeitem.type;
    this.localpath=changeitem.local_configuration.local_path;
  },
  methods:
  {
    save ()
    {
      this.$http2.put(this.Common.baseurl+"/admin/config/storage", 
      {
        "name": this.nameinput,
        "type": this.typeinput,
        "local_configuration" :{
          "local_path": this.localpath,
        }
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Success!',duration: 3000});
            this.$router.push({name:"Storageconfigure"});
          }
      })
      .catch(function (error) {
        console.log(error.response);
        this.$router.push({name:"Storageconfigure"});
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.localchange
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
