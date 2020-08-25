import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';

import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';

Vue.use(Vant);

import utils from '@/utils';

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$toast = Toast;
Vue.prototype.utils = utils;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
