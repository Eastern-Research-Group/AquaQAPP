import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './registerServiceWorker';
import router from './router';
import store from './store/store';
import App from './App';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:3000';
Vue.router = router;

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    redirect: '/dashboard',
  },
  registerData: {
    redirect: '/dashboard',
  },
  refreshData: { enabled: false },
  notFoundRedirect: { path: '/dashboard' },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
