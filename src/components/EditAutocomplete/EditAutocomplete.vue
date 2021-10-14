<template>
  <el-autocomplete
    :size="size"
    :value="value"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    class="inline-input"
    :maxlength="maxlength"
    :disabled="disabled"
    :clearable="clearable"
    :suffix-icon="suffixIcon"
    :prefix-icon="prefixIcon"
    :placeholder="placeholder"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
/* global defineProps,defineEmits  */
/* eslint no-undef: "error" */
const props = defineProps({
  value: String
})
const { value } = toRefs(props)
const emit = defineEmits(['querySearch'])
const querySearch = (queryString: string, cb) => {
  emit('querySearch', queryString, cb)
}
const handleSelect = (item) => {
  console.log(item)
}
</script>

<style scoped></style>
