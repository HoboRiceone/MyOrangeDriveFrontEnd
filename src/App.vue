<template>
  <div id="app">
    <router-view class="loginview"/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color:red;
  margin:0;
  padding:0;
  height:100%;
  width:100%;
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}
.loginview{
  text-align: center;
  background-color:yellow;  
  height:100%;
  width:100%;
  }
</style>
