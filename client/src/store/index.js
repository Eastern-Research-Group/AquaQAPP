import Vue from 'vue';
import Vuex from 'vuex';
import qapps from './modules/qapps';
import qapp from './modules/qapp';

Vue.use(Vuex);

Vue.prototype.$projectId = 1;

export default new Vuex.Store({
  modules: {
    qapps,
    qapp,
  },
});
