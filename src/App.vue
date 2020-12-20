

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
  },
  methods: {
    updatePage(data) {
      console.log('updating page...');
      console.log(data);
      switch (data.keyPath[0]) {
        case '1':
          console.log('每日')
          break;
        case '2':
          console.log('每周')
          break;
        case '3':
          console.log('每月')
          break;
        case '4':
          console.log('随机')
          break;
        case '5':
          if (data.keyPath[1] == '5-1') {
            console.log('已读')
          } else if (data.keyPath[1] == '5-2') {
            console.log('已赞')
          } else if (data.keyPath[1] == '5-3') {
            console.log('分享')
          } else {
            console.log('未知标签')
          }
          break;
      }
    }
  }, 
  data() {
    return {
      checked: true
    };
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
