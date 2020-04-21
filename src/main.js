import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../theme/index.css'
import ElementUI from 'element-ui'
import Api from './api/index.js';
import VueBus from 'vue-bus'
import Common from './Common'
Vue.prototype.Common = Common;

Vue.prototype.$api = Api;

Vue.use(ElementUI);
Vue.use(VueBus);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
