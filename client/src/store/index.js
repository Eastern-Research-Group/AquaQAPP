import Vue from 'vue';
import Vuex from 'vuex';
import qapps from './modules/qapps';
import qapp from './modules/qapp';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    qapps,
    qapp,
  },
});
