<template>
  <el-row>
    <el-col>
      <h1>配置多选框</h1>
      <edit-check-box
        v-model="checkList"
        :options="options"
        :check-list="checkList"
      ></edit-check-box>
    </el-col>
    <el-col>
      <h1>带全选多选框</h1>
      <el-checkbox
        v-model="checked"
        label="isAll"
        size="mini"
        :disabled="false"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      ></el-checkbox>
      <edit-check-box
        v-model="checkList"
        :is-check-all="isCheckAll"
        :options="cityOptions"
        :check-list="checkList"
      ></edit-check-box>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditCheckBox from '../../../components/EditCheckBox/EditCheckBox.vue'

/* ===================================checked=============================== */
// 配置项
const isCheckAll = ref(true)
const isCheckButton = ref(false)
// 全选
const checked = ref(false)
// 初始数据
const checkList = ref(['selected and disabled', 'Option A'])
const isIndeterminate = ref(true)
const cityOptions: string[] = [
  'Option A',
  'Option B',
  'Option C',
  'disabled',
  'selected and disabled'
]
type checkOptions = {
  label: String
  disabled?: Boolean
  border?: Boolean
}
const options: checkOptions[] = [
  { label: 'options a', disabled: false, border: true },
  { label: 'options b', disabled: false },
  { label: 'options c', disabled: true }
]
const handleCheckAllChange = (val: string[]) => {
  checkList.value = val ? cityOptions : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (val: string[]) => {
  const checkedCount = val.length
  checked.value = checkedCount === cityOptions.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cityOptions.length
}
</script>

<style scoped></style>
