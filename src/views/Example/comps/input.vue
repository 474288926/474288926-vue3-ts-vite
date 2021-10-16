<template>
  <el-row>
    <el-col>
      <h1>input</h1>
      <edit-input
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
    </el-col>
    <el-col class="mt">
      <h1>自动补全AND远程搜索input</h1>
      <edit-autocomplete
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
</script>

<style scoped></style>
