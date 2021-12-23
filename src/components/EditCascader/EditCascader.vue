<template>
  <el-cascader
    v-if="!panel"
    :size="size"
    v-bind="value"
    clearable
    :options="options"
    :show-all-levels="true"
    :collapse-tags="false"
    filterable
    :props="editRender"
    @change="handleChange"
  >
  </el-cascader>
  <el-cascader-panel
    v-else
    :options="options"
    :props="editRender"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

/* global defineProps,defineEmits  */
/* eslint no-undef: "error" */
const props = defineProps({
  value: String || Number,
  size: {
    type: String,
    default() {
      return 'mini'
    }
  },
  options: Array,
  editRender: Object,
  panel: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const { value, options, editRender, panel, size } = toRefs(props)
const emit = defineEmits(['handleChange'])
const handleChange = (v: string | number) => {
  emit('handleChange', v)
}
</script>

<style scoped></style>
