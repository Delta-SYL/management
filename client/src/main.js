import { createApp} from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//Vue.use(ElementUI);
//const app = createApp(App)
//app.use(ElementPlus)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ArrowDownBold } from '@element-plus/icons-vue'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('ArrowDownBold', ArrowDownBold)
app.config.globalProperties.$axios=axios
app.mount('#app')

//app.config.globalProperties.$axios=axios
//createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

