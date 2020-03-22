import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../theme/index.css'
import ElementUI from 'element-ui'
import Api from './api/index.js';

Vue.prototype.$api = Api;

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
