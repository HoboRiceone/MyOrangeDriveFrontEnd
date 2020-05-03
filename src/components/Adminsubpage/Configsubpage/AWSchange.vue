<template>
  <div class="awschange">
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
      AWS Access Key ID: 
      <el-input v-model="awsaccesskeyidinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      AWS Secret Access Key: 
      <el-input v-model="awssecretaccesskeyinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      AWS Region: 
      <el-input v-model="awsregioninput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      AWS Bucket Name: 
      <el-input v-model="awsbucketnameinput" class="inputbox"></el-input>
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
      nameinput: "",
      typeinput: "",
      awsaccesskeyidinput: "",
      awssecretaccesskeyinput: "",
      awsregioninput: "",
      awsbucketnameinput: "",
    };
  },
  created: function () 
  {
    var changeitem=this.$route.params.changeitem;
    this.nameinput=changeitem.name;
    this.typeinput=changeitem.type;
    this.awsaccesskeyidinput=changeitem.aws_configuration.aws_access_key_id;
    this.awssecretaccesskeyinput=changeitem.aws_configuration.aws_secret_access_key;
    this.awsregioninput=changeitem.aws_configuration.aws_region;
    this.awsbucketnameinput=changeitem.aws_configuration.aws_bucket_name;
  },
  methods:
  {
    save ()
    {
      this.$http2.put(this.Common.baseurl+"/admin/config/storage", 
      {
        "name": this.nameinput,
        "type": this.typeinput,
        "aws_configuration" :{
          "aws_access_key_id": this.awsaccesskeyidinput,
          "aws_secret_access_key": this.awssecretaccesskeyinput,
          "aws_region": this.awsregioninput,
          "aws_bucket_name": this.awsbucketnameinput
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
.awschange
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
