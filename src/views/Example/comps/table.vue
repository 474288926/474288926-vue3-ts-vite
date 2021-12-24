<template>
  <el-row>
    <el-col>
      <h1>可配置table</h1>
      <edit-table
        ref="editable"
        :table-data="tableData"
        :columns="columns"
        :table-handle="tableHandle"
        :default-sort="defaultSort"
      ></edit-table>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import EditTable from '../../../components/EditTable/EditTable.vue'
/* ===============table============================= */
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
    name: 'Tom'
  }
])
// table标签过滤方法
const filterHandler = (value: string, row: any, column: any) => {
  console.log(column)
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

const editable = ref()
onMounted(() => {
  let c = editable.value.sum(5, 9)
  console.log(c)
})
</script>

<style scoped></style>
