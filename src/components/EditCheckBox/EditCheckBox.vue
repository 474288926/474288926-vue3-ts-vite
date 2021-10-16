<template>
  <!-- 设置全选功能 -->
  <template v-if="isCheckAll">
    <el-checkbox-group
      :size="size"
      :value="checkList"
      :min="0"
      :max="10"
      @change="handleCheckedCitiesChange"
    >
      <template v-if="isCheckButton">
        <el-checkbox-button v-for="(v, index) in options" :key="index" :label="v" />
      </template>
      <template v-else>
        <el-checkbox v-for="(v, index) in options" :key="index" :label="v" />
      </template>
    </el-checkbox-group>
  </template>
  <template v-else>
    <el-checkbox-group
      :size="size"
      :value="checkList"
      :min="0"
      :max="10"
      @change="handleCheckedCitiesChange"
    >
      <template v-if="isCheckButton">
        <el-checkbox-button
          v-for="(v, index) in options"
          :key="index"
          :label="v.label"
          :disabled="v.disabled"
        />
      </template>
      <template v-else>
        <el-checkbox
          v-for="(v, index) in options"
          :border="v.border"
          :key="index"
          :label="v.label"
          :disabled="v.disabled"
        />
      </template>
    </el-checkbox-group>
  </template>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

/* global defineProps,defineEmits  */
/* eslint no-undef: "error" */
const props = defineProps({
  isCheckAll: {
    type: Boolean,
    default() {
      return false
    }
  },
  isCheckButton: {
    type: Boolean,
    default() {
      return false
    }
  },
  size: {
    type: String,
    default() {
      return 'mini'
    }
  },
  options: Array,
  checkList: Array
})
const { size, options, isCheckAll, isCheckButton, checkList } = toRefs(props)
const emit = defineEmits(['handleCheckedCitiesChange'])
const handleCheckedCitiesChange = (val: string[]) => {
  emit('handleCheckedCitiesChange', val)
}
</script>

<style scoped></style>
