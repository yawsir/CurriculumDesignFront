import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './stores/store'
import './config/elementui.js'
import axios from 'axios'
import filters from './filters/filters.js'
// import './mocks/'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.filter('imgUrlFilter', filters.imgUrlFilter)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
