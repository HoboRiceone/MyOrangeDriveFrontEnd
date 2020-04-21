<template>
  <div class="systemsettings">
    <div style="height:5%;"></div>
    <div class="inputblock">
      New Admin Password: 
      <el-input v-model="totalstorageinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary">Save</el-button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'SystemSettings',
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

