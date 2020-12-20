

<template>
  <div id="app">
    <Navbar
      @pageChange="updatePage"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
