<template>
  <div class="container">
    <RouterBreadcrumb />
    <el-dropdown class="dropdown" trigger="click">
      <div class="el-dropdown-link">
        {{ userStore.name }}
        <el-icon style="margin-left: 4px;">
          <ArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang='ts'>
  import { useUserStore } from '@/stores/user';
  import RouterBreadcrumb from './components/RouterBreadcrumb/index.vue';

  const userStore = useUserStore()

  const handleLogout = () => {
    userStore.logout()
  }
</script>

<style lang='less' scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
</style>