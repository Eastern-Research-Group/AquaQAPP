import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import Navigate from '@/views/Navigate';
import Reset from '@/views/Reset';
import Generate from '@/views/Generate';
import PageNotFound from '@/views/PageNotFound';

Vue.use(Router);

function guard(to, from, next) {
  if (Vue.auth.check()) {
    next();
  } else {
    next({ path: '/', query: { redirected: true } });
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: Reset,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: guard,
    },
    {
      path: '/navigate/:id',
      name: 'navigate',
      component: Navigate,
      beforeEnter: guard,
    },
    {
      path: '/generate/:id',
      name: 'generate',
      component: Generate,
      beforeEnter: guard,
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound,
    },
  ],
  mode: 'history',
});
