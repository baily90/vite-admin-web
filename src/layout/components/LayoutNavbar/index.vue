<template>
  <div class="container">
    <div class="left">
      <RouterBreadcrumb />
    </div>
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
    ElMessageBox.confirm(
      '您是否确认退出登录?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      userStore.logout()
      ElMessage({
        type: "success",
        message: "退出登录成功！"
      });
    }).catch(() => {

    })
    
  }
</script>

<style lang='less' scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .left {
      display: flex;
      align-items: center;
      .collapse-icon {
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
</style>