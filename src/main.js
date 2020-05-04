import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store'
import interceptor from './interceptors'

Vue.config.productionTip = false

interceptor()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
