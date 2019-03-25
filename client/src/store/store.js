import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    qapps: [],
    isFetchingQapps: false,
    qapp: {
      title: null,
    },
    dialog: false,
  },
  getters: {
    allQapps: state => state.qapps,
    singleQapp: state => state.qapp,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    getQapps(state, value) {
      state.qapps = value;
    },
    getFetchingQapps(state, value) {
      state.isFetchingQapps = value;
    },
    addQapp(state, value) {
      state.qapp.title = value;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    async getQapps({ commit }, qapps) {
      commit('getQapps', []);
      commit('getFetchingQapps', false);

      qapps = await axios.get('api/qapps');
      console.log(qapps);
      commit('getQapps', qapps.data);
      commit('getFetchingQapps', false);
    },
    async addQapp({ commit }, state) {
      console.log(state.qapp);
      if (!state.qapp) {
        return;
      }
      const newQapp = {
        userId: '2',
        title: state.qapp.title,
        description: state.qapp.description,
      };
      await axios.post('api/qapps', newQapp);
      commit('addQapp', newQapp.data);
    },
  },
});
