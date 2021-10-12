<template>
  <div class="home-container page-container">
    <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="page-title">Vite2.x + Vue3.x + TypeScript + Element Plus</div>
    <edit-table
      :table-data="tableData"
      :columns="columns"
      :table-handle="tableHandle"
      :default-sort="defaultSort"
    ></edit-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import EditTable from '../components/EditTable/EditTable.vue'

const defaultSort = reactive({ prop: 'name', order: 'descending' })
const tableData = reactive([
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu'
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu'
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu'
  }
])
// table标签过滤方法
const filterHandler = (value, row, column) => {
  const { property } = column
  return row[property] === value
}
const columns = reactive([
  {
    text: '日期',
    value: 'date',
    editRender: {
      filters: [
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' }
      ],
      filterMethod: filterHandler
    }
  },
  {
    text: '姓名',
    value: 'name',
    editRender: {}
  }
])
// 按钮点击
const handleClick = () => {
  console.log('click')
}
const tableHandle = reactive({
  label: '操作',
  width: '160',
  options: [
    {
      label: '添加',
      type: 'success',
      size: 'mini',
      method: handleClick
    },
    {
      label: '删除',
      type: 'success',
      size: 'mini',
      method: handleClick
    }
  ]
})
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>
