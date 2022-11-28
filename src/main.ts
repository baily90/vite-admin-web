import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './stores'


import 'normalize.css'
import 'nprogress/nprogress.css'
import './assets/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
