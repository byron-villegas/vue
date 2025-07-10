import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { vHover } from './directives/hover'

const app = createApp(App)

app.directive('hover', vHover)

app.use(router)
app.use(createPinia())

app.mount('#app')
