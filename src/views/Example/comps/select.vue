<template>
  <el-row>
    <el-col>
      <h1>select可配置远程搜索</h1>
      <edit-select
        :loading="loading"
        v-model="selectValue"
        :options="options"
        :filterable="filterable"
        :remote="remote"
        :placeholder="placeholder"
        :reserve-keyword="ReserveKeyword"
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
const placeholder = ref('可配置远程搜索')
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
  'Connecticut'
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

<style scoped></style>
