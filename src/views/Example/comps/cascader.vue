<template>
  <el-row>
    <el-col>
      <h1>级联选择器可配置懒加载切换级联面板</h1>
      <edit-cascader
        v-model="cascaderValue"
        :options="state.options"
        :edit-render="state.editRender"
        @handleChange="handleChange"
      ></edit-cascader>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import EditCascader from '../../../components/EditCascader/EditCascader.vue'

/* =========================cascader======================================== */
// 配置项
let id = 0 // 设置懒加载id
const cascaderValue = ref('disciplines') // 设置初始值
type optionsType = {
  value: String | Number
  label: String
  disabled?: Boolean
  children?: Array<optionsType>
}
const state = reactive({
  panel: true,
  editRender: {
    expandTrigger: 'hover',
    multiple: true,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node: any, resolve: any) {
      const { level } = node
      setTimeout(() => {
        // eslint-disable-next-line no-return-assign
        const nodes = Array.from({ length: level + 1 }).map((item) => ({
          value: (id += 1),
          label: `lab${id}`,
          leaf: level >= 2
        }))
        resolve(nodes)
      }, 1000)
    }
  },
  options: [
    {
      value: 'guide',
      label: 'Guide',
      disabled: true,
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency'
            },
            {
              value: 'feedback',
              label: 'Feedback'
            },
            {
              value: 'efficiency',
              label: 'Efficiency'
            },
            {
              value: 'controllability',
              label: 'Controllability'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation'
            },
            {
              value: 'top nav',
              label: 'Top Navigation'
            }
          ]
        }
      ]
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'basic',
          label: 'Basic',
          children: [
            {
              value: 'layout',
              label: 'Layout'
            },
            {
              value: 'color',
              label: 'Color'
            },
            {
              value: 'typography',
              label: 'Typography',
              disabled: true
            }
          ]
        },
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'radio',
              label: 'Radio'
            },
            {
              value: 'checkbox',
              label: 'Checkbox'
            },
            {
              value: 'input',
              label: 'Input'
            },
            {
              value: 'input-number',
              label: 'InputNumber'
            },
            {
              value: 'select',
              label: 'Select'
            }
          ]
        },
        {
          value: 'data',
          label: 'Data',
          children: [
            {
              value: 'table',
              label: 'Table'
            },
            {
              value: 'tag',
              label: 'Tag'
            }
          ]
        },
        {
          value: 'notice',
          label: 'Notice',
          children: [
            {
              value: 'alert',
              label: 'Alert'
            },
            {
              value: 'loading',
              label: 'Loading'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'menu',
              label: 'Menu'
            },
            {
              value: 'tabs',
              label: 'Tabs'
            }
          ]
        },
        {
          value: 'others',
          label: 'Others',
          children: [
            {
              value: 'dialog',
              label: 'Dialog'
            },
            {
              value: 'tooltip',
              label: 'Tooltip'
            }
          ]
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource',
      children: [
        {
          value: 'axure',
          label: 'Axure Components'
        },
        {
          value: 'sketch',
          label: 'Sketch Templates'
        },
        {
          value: 'docs',
          label: 'Design Documentation'
        }
      ]
    }
  ] as Array<optionsType>
})
// cascader组件change方法
const handleChange = (v: string | number) => {
  console.log(v)
}
</script>

<style scoped></style>
