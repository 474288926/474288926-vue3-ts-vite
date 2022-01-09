<template>
  <el-container>
    <el-header
      >Header
      <el-button size="mini" @click="cs">接口请求测试</el-button>
      <el-button @click="addRoles">添加一个权限</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <nav-menu
          :default-active="route.path"
          :drop-Down-data="dropDownData"
        ></nav-menu>
      </el-aside>
      <el-main>
        <el-row>
          <el-page-header
            icon="el-icon-arrow-left"
            :content="route.name"
            @back="goBack"
          />
          <router-view></router-view>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '@/store'
import NavMenu from '../../components/NavMenu/NavMenu.vue'
import { apiCs } from '../../utils/api'
// 输出当前环境
console.log(process.env.VITE_MODE_NAME)
console.log(process.env.VITE_RES_URL)
const cs = () => {
  apiCs().then((res) => {
    console.log(res)
  })
}
const router = useRouter()
const route = useRoute()
// const isCollapse = ref(true)
const addRoles = () => {
  store.commit('userModule/SET_ROLES', 'admin')
  console.log(route.path, store.state.userModule.roles)
  // router.go(0)
}

console.log(store.state.permissionModule.routes)
const dropDownData = computed(() => {
  return store.state.permissionModule.routes
})
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
</style>
