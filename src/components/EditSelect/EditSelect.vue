<template>
  <el-select
    :size="size"
    v-bind="value"
    :disabled="disabled"
    :filterable="filterable"
    :clearable="clearable"
    :multiple="multiple"
    :remote="remote"
    :reserve-keyword="ReserveKeyword"
    :collapse-tags="CollapseTags"
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <template v-if="!OptionGroup">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <!-- 可定制区域 -->
        <!-- <span style="float: left">{{ item.label }}</span>
      <span
        style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
      >
        {{ item.value }}
      </span> -->
      </el-option>
    </template>
    <template v-else>
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
          <!-- 可定制区域 -->
          <!-- <span style="float: left">{{ item.label }}</span>
      <span
        style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
      >
        {{ item.value }}
      </span> -->
        </el-option>
      </el-option-group>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

/* global defineProps,defineEmits */
/* eslint no-undef: "error" */
const props = defineProps({
  OptionGroup: {
    type: Boolean,
    default() {
      return false
    }
  },
  placeholder: String,
  options: {
    type: Array,
    default() {
      return [
        { label: 'vue', value: 'vue' },
        { label: 'ts', value: 'ts' }
      ]
    }
  },
  size: {
    type: String,
    default() {
      return 'mini'
    }
  },
  value: String || Array,
  disabled: {
    type: Boolean,
    default() {
      return false
    }
  },
  filterable: {
    type: Boolean,
    default() {
      return true
    }
  },
  clearable: {
    type: Boolean,
    default() {
      return true
    }
  },
  multiple: {
    type: Boolean,
    default() {
      return false
    }
  },
  remote: {
    type: Boolean,
    default() {
      return false
    }
  },
  ReserveKeyword: {
    type: Boolean,
    default() {
      return false
    }
  },
  CollapseTags: {
    type: Boolean,
    default() {
      return false
    }
  },
  loading: Boolean
})
const {
  size,
  value,
  disabled,
  filterable,
  clearable,
  multiple,
  remote,
  ReserveKeyword,
  CollapseTags,
  loading,
  OptionGroup,
  options,
  placeholder
} = toRefs(props)
const emit = defineEmits(['remoteMethod'])
const remoteMethod = (query: string) => {
  emit('remoteMethod', query)
}
</script>

<style scoped></style>
