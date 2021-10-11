<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'name', order: 'descending' }"
    ref="editTable"
    border
    row-key="id"
    highlight-current-row
    :row-class-name="tableRowClassName"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    lazy
    :load="load"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column type="expand">
      <template #default="props">
        <p>State: {{ props.row.id }}</p>
        <p>City: {{ props.row.date }}</p>
        <p>Address: {{ props.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column type="index" width="55" label="序号" />
    <el-table-column
      prop="date"
      label="Date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' }
      ]"
      :filter-method="filterHandler"
    />
    <el-table-column prop="name" sortable label="Name" />
    <el-table-column fixed="right" label="Operations">
      <template #default>
        <el-button type="text" size="small" @click="handleClick">Detail</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

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
    name: 'wangxiaohu',
    hasChildren: true
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu'
  }
])
// 按钮点击
const handleClick = () => {
  console.log('click')
}
// 设置行的高亮
const tableRowClassName = ({ row, rowIndex }) => {
  if (row.name === 'Tom') {
    return 'warning-row'
  }
  if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
// 点击行执行
const handleCurrentChange = (val) => {
  console.log(val)
}
// 勾选行执行
const handleSelectionChange = (val) => {
  console.log(val)
}
// table标签过滤方法
const filterHandler = (value, row, column) => {
  const { property } = column
  return row[property] === value
}
// 懒加载
const load = (tree, treeNode, resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }
    ])
  }, 1000)
}
</script>

<style lang="stylus" scoped>
/deep/.warning-row {
  background: oldlace !important;
}

/deep/.success-row {
  background: #f0f9eb !important;
}
</style>
