<template>
  <el-scrollbar class="main-scroll-container">
    <Transition name="el-fade-in">
      <RouterView />
    </Transition>
  </el-scrollbar>
</template>

<script setup lang='ts'>

  
</script>

<style lang='less' scoped>
  .main-scroll-container {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
  }
</style>