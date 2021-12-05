<template>
  <el-row>
    <el-col>
      <h1>按钮</h1>
      <edit-button icon="el-icon-search" :round="true" :click="updateLocation"
        >按钮</edit-button
      >
    </el-col>
    <el-col>
      <h1>group按钮</h1>
      <edit-button :button-group="buttonGroup"></edit-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
import EditButton from '../../../components/EditButton/EditButton.vue'

type buttonState = ['primary', 'success', 'info', 'warning', 'danger', 'text']

const buttonGroup = ref([
  { type: 'text', name: 'button1' },
  { type: 'primary', name: 'button2' },
  { type: 'success', name: 'button3' },
  { type: 'info', name: 'button4' },
  { type: 'warning', name: 'button5' },
  { type: 'danger', name: 'button6' }
])
// 父级组件 provide
const location = ref(10)
const geolocation = reactive({
  longitude: 90,
  latitude: 135
})
const updateLocation = () => {
  location.value = Math.round(Math.random() * 100)
  geolocation.latitude = Math.round(Math.random() * 1000)
  geolocation.longitude = Math.round(Math.random() * 10000)
}
provide('location', location)
provide('geolocation', geolocation)
provide('updateLocation', updateLocation)
</script>

<style scoped></style>
