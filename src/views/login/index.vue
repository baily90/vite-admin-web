<template>
  <div class="container">
    <el-form 
      ref="formRef"
      :model="form" 
      :rules="rules" >

      <el-form-item
        prop="username" >
        <el-input 
          placeholder="username" 
          v-model="form.username" />
      </el-form-item>

      <el-form-item
        prop="password">
        <el-input 
          placeholder="password" 
          v-model="form.password" 
          show-password />
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="onSubmit(formRef)" >login</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
const { login } = useUserStore()

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username:  { required: true, message: 'usename is required', trigger: 'blur' },
  password:  { required: true, message: 'password is required', trigger: 'blur' },
})

const onSubmit = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      login({...form})
    } else {
      return false
    }
  })
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    width: 360px;
  }
</style>