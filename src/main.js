import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store'
import interceptor from './interceptors'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faUpload, faCog, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faUpload, faCog, faHeart, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

interceptor()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
