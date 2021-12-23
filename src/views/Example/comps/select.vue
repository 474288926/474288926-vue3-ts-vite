<template>
  <el-row>
    <el-col>
      <h1>select可配置远程搜索</h1>
      <edit-select
        v-bind="selectEdit"
        v-model="selectValue"
        @remoteMethod="remoteMethod"
      ></edit-select>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import EditSelect from '../../../components/EditSelect/EditSelect.vue'

/* ===============select============================= */
// 输入数据源
const selectValue = ref('')
// 配置项

const selectEdit = reactive({
  placeholder: '可配置远程搜索',
  filterable: true,
  remote: true,
  ReserveKeyword: true,
  options: [],
  loading: false
})
const list: any = reactive([])
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut'
]
onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})
const remoteMethod = (query: string) => {
  if (query !== '') {
    selectEdit.loading = true
    setTimeout(() => {
      selectEdit.loading = false
      selectEdit.options = list.value.filter((item: any) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    }, 200)
  } else {
    selectEdit.options = []
  }
}
</script>

<style scoped></style>
