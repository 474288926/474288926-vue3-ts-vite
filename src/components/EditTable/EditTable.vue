<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="defaultSort"
    ref="editTable"
    border
    row-key="id"
    highlight-current-row
    :row-class-name="tableRowClassName"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    lazy
    :load="load"
    :tree-props="treeProps"
  >
    <el-table-column v-if="selection" type="selection" width="55" />
    <el-table-column v-if="expand" type="expand">
      <template #default="props">
        <p>State: {{ props.row.id }}</p>
        <p>City: {{ props.row.date }}</p>
        <p>Address: {{ props.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column type="index" width="55" label="序号" />
    <el-table-column
      sortable
      v-for="v in columns"
      :key="v.id"
      :prop="v.value"
      :label="v.text"
      :filters="v.editRender.filters"
      :filter-method="v.editRender.filterMethod"
    ></el-table-column>
    <el-table-column
      fixed="right"
      v-if="tableHandle"
      :label="tableHandle.label"
      :width="tableHandle.width"
    >
      <template #default>
        <el-button
          v-for="(v, index) in tableHandle.options"
          :key="index"
          :type="v.type"
          :size="v.size"
          @click.native.prevent="v.method"
          >{{ v.label }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import type { tableEdit } from './type'

const props: tableEdit = defineProps({
  tableData: Array,
  columns: Array,
  tableHandle: Object,
  treeProps: {
    type: Object,
    default() {
      return { children: 'children', hasChildren: 'hasChildren' }
    }
  },
  selection: {
    type: Boolean,
    default() {
      return false
    }
  },
  expand: {
    type: Boolean,
    default() {
      return false
    }
  },
  defaultSort: Object
})
const { tableData, columns, tableHandle, treeProps, selection, expand, defaultSort } =
  toRefs(props)

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
:deep().warning-row {
  background: oldlace !important;
}

:deep().success-row {
  background: #f0f9eb !important;
}
</style>
