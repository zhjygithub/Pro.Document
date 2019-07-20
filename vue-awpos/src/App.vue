<template>
  <div id="app">
    <leftNav />
    <div class="main">
        <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  name: 'App',
  components:{
    leftNav
  }
}
</script>

<style>
html,body,#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0;
  padding: 0;
}
.main{
  width: 95%;
  float: left;
  height: 100%;
  background-color: #2c3e50;
  overflow: hidden;
}
</style>
