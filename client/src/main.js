import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '../static/app.scss';
// import './registerServiceWorker';
import router from './router';
import store from './store/index';
import App from './App';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:3000';
// Need to set these headers to no-cache to fix IE11 issue where new requests are not sent
Vue.axios.defaults.headers.common['Cache-Control'] = 'no-cache';
Vue.axios.defaults.headers.common.Pragma = 'no-cache';

Vue.router = router;

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
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
  render: (h) => h(App),
}).$mount('#app');
