<template>
  <el-scrollbar>
    <el-menu
      class="menu"
      :default-active="activeMenu"
      router >

      <LayoutSidebarItem 
        v-for="route in permissionStore.routes" 
        :key="route.path" 
        :item="route" 
        :base-path="route.path" />
        
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang='ts'>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import LayoutSidebarItem from './components/LayoutSidebarItem/index.vue';
  import { usePermissionStore } from '@/stores/permission'
  
  const permissionStore = usePermissionStore()
  
  const activeMenu = computed(() => {
    const route = useRoute()
    return route.path
  })

  
</script>

<style lang='less' scoped>
  .menu {
    height: 100vh;
  }
</style>