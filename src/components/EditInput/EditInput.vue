<template>
  <el-input
    :type="type"
    :autosize="autosize"
    @input="inputChange($event)"
    v-bind="value"
    :size="size"
    show-word-limit
    :maxlength="maxlength"
    :disabled="disabled"
    :clearable="clearable"
    :show-password="showPassword"
    :suffix-icon="suffixIcon"
    :prefix-icon="prefixIcon"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

/* global defineProps,defineEmits  */
/* eslint no-undef: "error" */
const props = defineProps({
  value: String,
  type: {
    type: String,
    default() {
      return 'text'
    }
  },
  size: {
    type: String,
    default() {
      return 'mini'
    }
  },
  autosize: {
    type: Boolean,
    default() {
      return false
    }
  },
  inputChange: {
    type: Function,
    default() {
      return () => {}
    }
  },
  placeholder: String,
  maxlength: Number,
  disabled: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  suffixIcon: String,
  prefixIcon: String
})
const {
  value,
  type,
  size,
  autosize,
  placeholder,
  maxlength,
  disabled,
  clearable,
  showPassword,
  suffixIcon,
  prefixIcon,
  inputChange
} = toRefs(props)
</script>

<style scoped></style>
