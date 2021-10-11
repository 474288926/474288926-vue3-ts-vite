<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px"
        ><NavMenu :default-active="route.path" :drop-Down-data="dropDownData"></NavMenu
      ></el-aside>
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
import NavMenu from '../../components/NavMenu/NavMenu.vue'

// const isCollapse = ref(true)

const router = useRouter()
const route = useRoute()
// console.log(route.path)
const dropDownData = computed(() => {
  return router.options.routes[1].children
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
