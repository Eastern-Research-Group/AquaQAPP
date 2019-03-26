import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/Welcome';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import Navigate from '@/views/Navigate';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Welcome,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { auth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: '/navigate',
      name: 'navigate',
      component: Navigate,
      meta: { auth: true },
    },
  ],
});
