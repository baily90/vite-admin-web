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
  import { usePermissionStore } from '@/stores/permission'
  import LayoutSidebarItem from './components/LayoutSidebarItem/index.vue';
  
  const permissionStore = usePermissionStore()
  
  const activeMenu = computed(() => {
    const route = useRoute()
    return route.path
  })

  
</script>

<style lang='less' scoped>
  .menu {
    min-height: 100vh;
  }
</style>