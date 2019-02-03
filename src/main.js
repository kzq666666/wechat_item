import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import './plugins/element.js'
Vue.config.productionTip = false
Vue.prototype.$http = axios;
axios.url = 'http://139.199.66.15:8087'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
