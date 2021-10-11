<template>
  <el-menu
    :default-active="DefaultActive"
    :background-color="BackgroundColor"
    :text-color="TextColor"
    :active-text-color="ActiveTextColor"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    unique-opened
    router
  >
    <NavMenuItem :drop-down-data="dropDownData" :is-collapse="isCollapse"></NavMenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import NavMenuItem from './comps/NavMenuItem.vue'

type NavMenuEdit = {
  BackgroundColor?: String
  TextColor?: String
  ActiveTextColor?: String
  dropDownData: Object
  isCollapse?: Boolean
  DefaultActive: String
}
const props: NavMenuEdit = defineProps({
  BackgroundColor: String,
  TextColor: String,
  ActiveTextColor: String,
  dropDownData: Object,
  isCollapse: Boolean,
  DefaultActive: String
})
const { BackgroundColor, TextColor, ActiveTextColor, dropDownData, isCollapse } =
  toRefs(props)

const handleOpen = (key: number, keyPath: string[]) => {
  console.log(key, keyPath, 'open')
}
const handleClose = (key: number, keyPath: string[]) => {
  console.log(key, keyPath, 'close')
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
