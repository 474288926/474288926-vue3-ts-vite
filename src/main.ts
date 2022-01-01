import { createApp } from 'vue'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import styleImport from '@/utils/style-import'
import '@/style/basic.styl'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const app = createApp(App)
app.config.globalProperties.$NProgress = NProgress
styleImport(app).use(router).use(store, key).mount('#app')
