import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import router from "@/router"
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
Vue.use(VueSession)
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true
if(process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8902'
} else {
    axios.defaults.baseURL = 'http://114.116.194.209:8902'
}
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    axios,
    store,
    render: h => h(App),
}).$mount('#app')