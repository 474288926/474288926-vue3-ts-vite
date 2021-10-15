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
      :size="autocompleteEdit.size"
      v-model="autoValue"
      :placeholder="autocompleteEdit.placeholder"
      :maxlength="autocompleteEdit.maxlength"
      :disabled="autocompleteEdit.disabled"
      :clearable="autocompleteEdit.clearable"
      :showPassword="autocompleteEdit.showPassword"
      :suffixIcon="autocompleteEdit.suffixIcon"
      :prefixIcon="autocompleteEdit.prefixIcon"
      @querySearch="querySearch"
    ></edit-autocomplete>
    <edit-select
      calss="mt"
      :loading="loading"
      v-model="selectValue"
      :options="options"
      :filterable="filterable"
      :remote="remote"
      :reserve-keyword="ReserveKeyword"
      @remoteMethod="remoteMethod"
    ></edit-select>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import EditTable from '../components/EditTable/EditTable.vue'
import EditInput from '../components/EditInput/EditInput.vue'
import EditAutocomplete from '../components/EditAutocomplete/EditAutocomplete.vue'
import EditSelect from '../components/EditSelect/EditSelect.vue'

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

/* ===============input============================= */
// 数据源
const input = ref('')
// 配置项
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
// input方法
const inputChange = (val: string) => {
  console.log(val, input.value)
}
/* ===============autocomplete============================= */
// 配置项
const autocompleteEdit = reactive({
  size: 'mini',
  maxlength: 10,
  disabled: false,
  clearable: true,
  suffixIcon: 'el-icon-date',
  prefixIcon: 'el-icon-date',
  placeholder: 'autocomplete'
})
// 数据源
const autoValue = ref('')
// 远程数据模拟
type linkType = {
  value: String
  link: String
}
const links: any = reactive([])
const loadAll = (): linkType[] => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
onMounted(() => {
  links.value = loadAll()
})
// 设置时间
let timeout: number
// 数据筛选方法
const createFilter = (queryString: string) => {
  return (restaurant: any) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
  }
}
// 远程搜索方法
const querySearch = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
/* ===============select============================= */
// 输入数据源
const selectValue = ref('')
// 配置项
const filterable = ref(true)
const remote = ref(true)
const ReserveKeyword = ref(true)
const list: any = reactive([])
const options: any = ref([])
const loading = ref(false)
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]
onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})
const remoteMethod = (query: string) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item: any) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    }, 200)
  } else {
    options.value = []
  }
}
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>
