<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <LayoutSidebar />
    </el-aside>
    <el-container>
      <el-header class="layuout-header">
        <LayoutNavbar />
      </el-header>
      <el-main>
        <LayoutMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import LayoutSidebar from './components/LayoutSidebar/index.vue'
import LayoutNavbar from './components/LayoutNavbar/index.vue'
import LayoutMain from './components/LayoutMain/index.vue'
</script>

<style lang='less' scoped>
  .layout-container {
    height: 100vh;
    .layuout-header {
      border-bottom: solid 1px var(--el-menu-border-color);
      background-color: #fff;
    }
  }
</style>