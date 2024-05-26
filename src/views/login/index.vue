<script setup lang="ts">
import { loadFull } from "tsparticles";
import { loadFirePreset } from "tsparticles-preset-fire";
import { Lock,User } from '@element-plus/icons-vue'
import {useUserInfo} from '@/store/userInfo'

let form = reactive({
  username:'',
  password:''
})

let {login} = useUserInfo()
async function submit() {
  await login(form.username,form.password)
}

const particlesOptions = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      // value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
      value: ["#05219F", "#033CAE", "#004FB2", "#0076AF", "#00ACB3"],
    },
    opacity: {
      value: { min: 0.4, max: 0.8 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 8,
      random: false,
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  background: {
    // image: "radial-gradient(rgb(20,29,43),rgb(16 24 35))",
  },
}

// const particlesOptions = {
//   preset: "fire",
// };

async function particlesInit(engine:any) {
  await loadFull(engine);
}
</script>

<template>
  <div class="bg w-screen h-screen relative">
    <Particles id="tsparticles" class="w-screen h-screen fixed left-0 top-0" :particles-init="particlesInit" :options="particlesOptions" />
    <div class="flex flex-col items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="flex items-center">
        <img src="@/assets/logos/logo.png" alt="" class="w-11 h-11" />
        <span class="text-5xl ml-4">三一高机设备管理系统</span>
      </div>
      <img src="@/assets/bgs/login_title_bg.png" class="w-[551px] h-6 bg-cover" alt="" />
      <div class="box mt-36 flex flex-col items-center py-20 px-10">
        <div class="text-2xl font-bold pb-12 select-none">欢迎登录</div>
        <el-form class="el-form login-form w-full">
          <el-form-item class="mb-8" style="margin-left: 0px" prop="username">
            <el-input
              v-model="form.username"
              type="text"
              placeholder="用户名"
              :prefix-icon="User"
              clearable
              size="large"
              autocomplete="off"
              class="text-base"
            />
          </el-form-item>
          <el-form-item style="margin-left: 0px" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              :prefix-icon="Lock"
              autocomplete="off"
              size="large"
              :show-password="true"
              class="text-base"
            />
          </el-form-item>
          <el-form-item class="mt-10">
            <el-button
              type="primary"
              size="large"
              color="#0368E7"
              class="login-submit rounded w-full border-rad"
              :loading="false"
              @click="submit"
            >
              <span>登录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg{
  background: url(@/assets/bgs/login_bg.jpg);
  background-size: 100% 100%;
}
.box{
  background: url(@/assets/bgs/login_box_bg.png);
  background-size: 100% 100%;
  width:425px;
  height:435px;
}
html.dark{
  .el-input {
      --el-input-bg-color: transparent!important;
    }
}
</style>