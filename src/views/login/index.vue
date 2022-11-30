<template>
  <div class="container">
    <div class="login-box">
      <!-- 左边图片 -->
      <div class="login-left">
				<img src="@/assets/images/login_left.png" alt="login" />
			</div>
      
      <div class="login-form">
        <!-- 吉祥物 模仿掘金 -->
        <div class="mascot" >
          <img v-show="isUsernameFocus" src="@/assets/images/mascot_input.svg" alt="">
          <img v-show="isPasswordFocus" src="@/assets/images/mascot_secret.svg" alt="">
          <img v-show="(!isUsernameFocus && !isPasswordFocus)" src="@/assets/images/mascot_welcome.svg" alt="">
        </div>

        <!-- 登录logo -->
        <div class="login-logo">
					<h2 class="logo-text">Vite-Admin-Web</h2>
				</div>

        <!-- 登录表单 -->
        <el-form 
          ref="loginFormRef"
          :model="loginForm" 
          :rules="loginRules" 
          size="large" >

          <el-form-item
            prop="username" >
            <el-input 
              prefix-icon="User"
              placeholder="用户名：" 
              v-model="loginForm.username" 
              @focus="() => {
                isUsernameFocus = true; 
                isPasswordFocus = false;
              }" 
              @blur="() => {
                isUsernameFocus = false; 
              }" />
          </el-form-item>

          <el-form-item
            prop="password">
            <el-input 
              prefix-icon="Lock"
              placeholder="密码：" 
              v-model="loginForm.password" 
              show-password  
              @focus="() => {
                isUsernameFocus = false; 
                isPasswordFocus = true;
              }" 
              @blur="() => {
                isPasswordFocus = false; 
              }"  />
          </el-form-item>

          <div class="login-btn">
            <el-button 
              round
              size="large"
              icon="Delete"
              @click="onReset(loginFormRef)" >重置</el-button>

            <el-button 
              round
              size="large"
              type="primary" 
              icon="UserFilled"
              :loading="loading"
              @keyup.enter="onSubmit(loginFormRef)"
              @click="onSubmit(loginFormRef)" >登录</el-button>
          </div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, toRefs } from 'vue';
  import { useUserStore } from '@/stores/user'
  import type { FormInstance, FormRules } from 'element-plus';

  interface IState {
    loading: boolean, 
    isUsernameFocus: boolean, 
    isPasswordFocus: boolean, 
  }

  const { login } = useUserStore()

  const loginFormRef = ref<FormInstance>()

  const loginForm = reactive({
    username: '',
    password: '',
  })

  const loginRules = reactive<FormRules>({
    username:  { required: true, message: '请输入用户名', trigger: 'blur' },
    password:  { required: true, message: '请输入密码', trigger: 'blur' },
  })

  const states = reactive<IState>({
    loading: false, // 登录loading
    isUsernameFocus: false, // 吉祥物输入状态
    isPasswordFocus: false, // 吉祥物秘密状态
  })

  const { loading, isUsernameFocus, isPasswordFocus } = toRefs(states)

  onMounted(() => {
    // 监听enter事件（调用登录）
    document.onkeydown = (e: any) => {
      e = window.event || e;
      if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
        if (loading.value) return;
        onSubmit(loginFormRef.value);
      }
    };
  });


  const onSubmit = (formEl: FormInstance | undefined) => {
    formEl?.validate(async (valid) => {
      if (valid) {
        loading.value = true
        await login({...loginForm})
        loading.value = false
      } else {
        return false
      }
    })
  }

  const onReset = (formEl: FormInstance | undefined) => {
    formEl?.resetFields()
  }


</script>

<style lang="less" scoped>
  @import "./index.less";
</style>