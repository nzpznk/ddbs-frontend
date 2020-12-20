<template>
  <el-row class='navbar' type="flex" align="middle">
    <el-col :span="12">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1"><router-link to="/daily">每日热门文章</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/weekly">每周热门文章</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/monthly">每月热门文章</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/randomly">随机推荐</router-link></el-menu-item>
        <!-- <el-submenu index="5">
          <template slot="title">我的</template>
          <el-menu-item index="5-1"><router-link to="readed">已读</router-link></el-menu-item>
          <el-menu-item index="5-2"><router-link to="agreed">赞过</router-link></el-menu-item>
          <el-menu-item index="5-3"><router-link to="shared">分享</router-link></el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-col>
    <el-col class="searchbox" span="6">
      <el-input
        style="display: block"
        placeholder="想要查找的userid"
        clearable>
      </el-input>
    </el-col>
    <el-col span="6">
      <el-input
        style="display: block"
        placeholder="想要查找的aid"
        clearable>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log('navbar: handleSelect')
        this.$emit('pageChange', {
          key: key, 
          keyPath: keyPath
        })
      }
    }
  }
</script>

<style scoped>
.searchbox {
  padding: 3px;
  margin: auto;
  background-color: #545C64;
}
.navbar {
  background-color: #545C64;
}
</style>