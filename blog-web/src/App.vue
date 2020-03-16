<template>
  <div id="app">
    <el-container>
      <el-header>
        <Headers> </Headers>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Headers from 'comp/Header.vue'

export default {
  name: 'app',
  components: {
    Headers
  }
}
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
</style>
