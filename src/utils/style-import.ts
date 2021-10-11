import { App } from 'vue'
import {
  ElIcon,
  ElLoading,
  ElCard,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup
} from 'element-plus'

/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/element-plus/vite-plugin-element-plus
 * @param app {App}
 */
export default function styleImport(app: App) {
  ;[
    ElButton,
    ElCard,
    ElLoading,
    ElIcon,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup
  ].forEach((v) => {
    app.use(v)
  })
  return app
}
