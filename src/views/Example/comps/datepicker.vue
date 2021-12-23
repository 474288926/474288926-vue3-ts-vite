<template>
  <el-row>
    <el-col>
      <h1>配置单日期选择器</h1>
      <edit-date-picker
        v-model="state.value"
        :shortcuts="state.shortcuts"
        :type="type"
      ></edit-date-picker>
    </el-col>
    <el-col>
      <h1>配置范围日期选择器</h1>
      <edit-date-picker
        v-model="state.value1"
        :shortcuts="state.shortcuts1"
        :type="typeRange"
        :default-time="defaultTime"
        :default-value="defaultValue"
      ></edit-date-picker>
    </el-col>
    <el-col>
      <h1>配置范围月份选择器</h1>
      <edit-date-picker
        v-model="state.value2"
        :shortcuts="state.shortcuts2"
        :type="typeMonth"
      ></edit-date-picker>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import EditDatePicker from '../../../components/EditDatePicker/EditDatePicker.vue'

type dateType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
const type: Ref<dateType> = ref('date')
const typeRange: Ref<dateType> = ref('daterange')
const typeMonth: Ref<dateType> = ref('monthrange')
const defaultValue = ref([new Date(2010, 9, 2), new Date(2010, 12, 1)])
const defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
])
const state = reactive({
  shortcuts: [
    {
      text: '今天',
      value: new Date()
    },
    {
      text: '昨天',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      }
    },
    {
      text: '一周以前',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      }
    }
  ],
  shortcuts1: [
    {
      text: 'Last week',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      }
    },
    {
      text: 'Last month',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      }
    },
    {
      text: 'Last 3 months',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      }
    }
  ],
  shortcuts2: [
    {
      text: 'This month',
      value: [new Date(), new Date()]
    },
    {
      text: 'This year',
      value: () => {
        const end = new Date()
        const start = new Date(new Date().getFullYear(), 0)
        return [start, end]
      }
    },
    {
      text: 'Last 6 months',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 6)
        return [start, end]
      }
    }
  ],
  value: '',
  value1: '',
  value2: ''
})
</script>

<style scoped></style>
