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
    <edit-input
      class="mt"
      :type="type"
      :size="size"
      v-model="input"
      :autosize="autosize"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :clearable="clearable"
      :showPassword="showPassword"
      :suffixIcon="suffixIcon"
      :prefixIcon="prefixIcon"
      @inputChange="inputChange"
    ></edit-input>
    <edit-autocomplete
      class="mt"
      v-model="autoc"
      @querySearch="querySearch"
    ></edit-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import EditTable from '../components/EditTable/EditTable.vue'
import EditInput from '../components/EditInput/EditInput.vue'
import EditAutocomplete from '../components/EditAutocomplete/EditAutocomplete.vue'

// table
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

// input
const input = ref('')
const type = ref('text')
const size = ref('mini')
const autosize = ref(false)
const placeholder = ref('输入框')
const maxlength = ref(30)
const disabled = ref(false)
const clearable = ref(true)
const showPassword = ref(false)
const suffixIcon = ref('el-icon-date')
const prefixIcon = ref('el-icon-date')
const inputChange = (val) => {
  console.log(val, input.value)
}
// autocomplete
const autoc = ref('')
const querySearch = (queryString, cb) => {
  console.log(queryString, cb)
}
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>
