<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="defaultSort"
    ref="editTable"
    class="one two"
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
          @click.prevent="v.method"
          >{{ v.label }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

/* global defineProps,defineExpose */
/* eslint no-undef: "error" */
const props = defineProps({
  tableData: Array,
  columns: Array as any,
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
const tableRowClassName = (obj: { row: any; rowIndex: number }) => {
  if (obj.row.name === 'Tom') {
    return 'warning-row'
  }
  if (obj.rowIndex === 1) {
    return 'success-row'
  }
  return ''
}
// 点击行执行
const handleCurrentChange = (val: any) => {
  console.log(val)
}
// 勾选行执行
const handleSelectionChange = (val: any) => {
  console.log(val)
}
// 计算
const sum = (a: number, b: number) => {
  return a + b
}
// 懒加载
const load = (tree: any, treeNode: any, resolve: any) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'Tom'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu'
      }
    ])
  }, 1000)
}
defineExpose({
  sum
})
</script>

<style lang="stylus" scoped>
:deep().warning-row {
  background: oldlace !important;
}

:deep().success-row {
  background: #f0f9eb !important;
}
</style>
