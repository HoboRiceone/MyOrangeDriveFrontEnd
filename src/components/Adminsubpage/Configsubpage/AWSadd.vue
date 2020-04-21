<template>
  <div class="awsadd">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Name: 
      <el-input v-model="nameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Type: 
      <el-input v-model="typeinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      AWS Access Key ID: 
      <el-input v-model="awsaccesskeyidinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      AWS Secret Access Key: 
      <el-input v-model="awssecretaccesskeyinput" class="inputbox" show-password></el-input>
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
      <el-button type="primary" @click="add">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AWSadd',
  data ()
  {
    return{
      nameinput: '',
      typeinput: '',
      awsaccesskeyidinput: '',
      awssecretaccesskeyinput: '',
      awsregioninput: '',
      awsbucketnameinput: '',
    };
  },
  methods:
  {
    add ()
    {
      this.$api.post('/admin/config/storage', 
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
        'name': this.nameinput,
        'type': this.typeinput,
        'aws_access_key_id': this.awsaccesskeyidinput,
        'aws_secret_access_key': this.awssecretaccesskeyinput,
        'aws_region': this.awsregioninput,
        'aws_bucket_name': this.awsbucketnameinput
      },
      response => {
      if (response.status == 200) 
      {
        
        alert("Add Success!");
        
      } 
      else if(response.status == 400)
      {
        alert(response.data.msg);
        
      }
      else if(response.status == 500)
      {
        alert(response.data.msg);
        console.log(response.data.msg);
        
      }
      else
      {
        alert("Network Error");
      }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.awsadd
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
