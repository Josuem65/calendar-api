import { createApp } from 'vue' 
import { plugin, defaultConfig } from '@formkit/vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'

createApp(App).use(plugin, defaultConfig, store).use(router).mount('#app')
