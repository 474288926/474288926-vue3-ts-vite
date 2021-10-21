<template>
  <el-row>
    <el-col>
      <h1>按钮</h1>
      <edit-button icon="el-icon-search" :round="true">按钮</edit-button>
    </el-col>
    <el-col>
      <h1>group按钮</h1>
      <edit-button :button-group="buttonGroup"></edit-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
</script>

<style scoped></style>
