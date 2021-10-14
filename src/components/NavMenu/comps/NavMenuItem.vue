<template>
  <div class="menu-container">
    <template v-for="item in dropDownData">
      <el-sub-menu
        menu-trigger="hover"
        :key="item.path"
        v-if="item.hasOwnProperty('children') && item.children.length > 0"
        :index="item.path"
      >
        <template #title style="padding-left: 10px">
          <i :class="item.icon || null"></i>
          <span v-show="!isCollapse">{{ item.name }}</span>
        </template>
        <nav-menu-item :dropDownData="item.children"></nav-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :key="item.path" :index="item.path">
        <i :class="item.icon || null"></i>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
/* global defineProps  */
/* eslint no-undef: "error" */
const props: any = defineProps({
  dropDownData: Object,
  isCollapse: Boolean
})
const { dropDownData, isCollapse } = toRefs(props)
</script>

<style scoped></style>
