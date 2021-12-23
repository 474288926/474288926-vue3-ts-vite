<template>
  <el-date-picker
    v-bind="value"
    :type="type"
    :placeholder="placeholder"
    :disabled-date="disabledDate"
    unlink-panels
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :shortcuts="shortcuts"
    :format="format"
    :value-format="valueFormat"
    :default-value="defaultValue"
    :default-time="defaultTime"
  >
  </el-date-picker>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
/* global defineProps,defineEmits  */
/* eslint no-undef: "error" */
const props = defineProps({
  value: Date || Array,
  type: {
    type: String,
    default() {
      return 'date'
    }
  },
  placeholder: {
    type: String,
    default() {
      return '日期选择器'
    }
  },
  rangeSeparator: {
    type: String,
    default() {
      return '至'
    }
  },
  startPlaceholder: {
    type: String,
    default() {
      return '开始日期'
    }
  },
  endPlaceholder: {
    type: String,
    default() {
      return '结束日期'
    }
  },
  shortcuts: Array,
  format: {
    type: String,
    default() {
      return 'YYYY/MM/DD'
    }
  },
  valueFormat: {
    type: String,
    default() {
      return 'YYYY-MM-DD'
    }
  },
  defaultValue: Array,
  defaultTime: Array,
  isDisabledDate: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const {
  value,
  type,
  shortcuts,
  placeholder,
  rangeSeparator,
  startPlaceholder,
  endPlaceholder,
  valueFormat,
  format,
  defaultValue,
  defaultTime
} = toRefs(props)
// const isDisDate = computed(() => {})
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>

<style scoped></style>
