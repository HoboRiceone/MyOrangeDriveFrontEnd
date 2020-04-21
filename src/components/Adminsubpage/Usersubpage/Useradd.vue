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
      Gender: 
      <el-input v-model="genderinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      E-mail: 
      <el-input v-model="emailinput" class="inputbox" show-password></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Total Storage: 
      <el-input v-model="totalstorageinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Source ID: 
      <el-input v-model="souridinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Useradd',
  data ()
  {
    return{
      birthdayinput: '',
      firstnameinput: '',
      lastnameinput: '',
      genderinput: '',
      emailinput: '',
      totalstorageinput: '',
      souridinput: ''
    };
  },
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
.inputbox
{
  width:100%;
}
</style>
