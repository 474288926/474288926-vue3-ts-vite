<template>
  <el-row>
    <el-col>
      <h1>input{{ input }}</h1>
      <edit-input
        v-bind="inputEdit"
        v-model="input"
        :input-change="inputChange"
      ></edit-input>
    </el-col>
    <el-col class="mt">
      <h1>自动补全AND远程搜索input{{ autoValue }}</h1>
      <edit-autocomplete
        v-bind="autocompleteEdit"
        v-model="autoValue"
        @querySearch="querySearch"
      ></edit-autocomplete>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import EditInput from '../../../components/EditInput/EditInput.vue'
import EditAutocomplete from '../../../components/EditAutocomplete/EditAutocomplete.vue'

/* ===============input============================= */
// 数据源
const input = ref('')
// 配置项

const inputEdit = reactive({
  type: 'text',
  size: 'mini',
  autosize: false,
  placeholder: '输入框',
  maxlength: 30,
  disabled: false,
  clearable: true,
  showPassword: false,
  suffixIcon: 'el-icon-date',
  prefixIcon: 'el-icon-date'
})
// input方法
const inputChange = (val: string) => {
  console.log(val, input.value)
}

/* ===============autocomplete============================= */
const autoValue = ref('')
// 配置项
const autocompleteEdit = reactive({
  size: 'mini',
  maxlength: 10,
  disabled: false,
  clearable: true,
  showPassword: false,
  suffixIcon: 'el-icon-date',
  prefixIcon: 'el-icon-date',
  placeholder: 'autocomplete'
})
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
// eslint-disable-next-line no-undef
let timeout: NodeJS.Timeout
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
</script>

<style scoped></style>
