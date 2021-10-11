import { App } from 'vue'
import {
  ElIcon,
  ElLoading,
  ElCard,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElScrollbar
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
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElScrollbar
  ].forEach((v) => {
    app.use(v)
  })
  return app
}
