import { usePermissionStore } from '@/stores/permission'

/**
 * 判断传入的角色列表中是否有该用户拥有的角色
 */
export default function checkPermission(value: string[]) {
  const permissionStore = usePermissionStore()
  if (value.length > 0) {
    const roles = permissionStore.roles
    return roles.some(role => value.includes(role))
  } else {
    return false
  }
}