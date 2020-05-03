import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../theme/index.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en';
import Api from './api/index.js';
import VueBus from 'vue-bus'
import Common from './Common'
import axios from 'axios';

Vue.prototype.Common = Common;
Vue.prototype.$http2 =axios;
Vue.prototype.$api = Api;

Vue.use(ElementUI,{locale});
Vue.use(VueBus);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
