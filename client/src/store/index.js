import Vue from 'vue';
import Vuex from 'vuex';
import structure from './modules/structure';
import qapps from './modules/qapps';
import qapp from './modules/qapp';
import ref from './modules/ref';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    structure,
    qapps,
    qapp,
    ref,
    user,
  },
});
