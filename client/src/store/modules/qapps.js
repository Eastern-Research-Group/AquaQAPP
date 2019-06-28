import axios from 'axios';

const state = {
  data: [],
  isFetching: false,
};

const mutations = {
  SET_DATA(state, value) {
    state.data = value;
  },
  SET_IS_FETCHING(state, value) {
    state.isFetching = value;
  },
};

const actions = {
  async getQapps({ commit }) {
    commit('SET_DATA', []);
    commit('SET_IS_FETCHING', true);

    const qapps = await axios.get('api/qapps');
    commit('SET_DATA', qapps.data);
    commit('SET_IS_FETCHING', false);
  },
  async add({ commit }, payload) {
    const newQapp = await axios.post('api/qapps', payload);
    await commit('qapp/SET_CURRENT_QAPP', newQapp.data, { root: true });
  },
  async delete({ dispatch }, id) {
    await axios.delete('api/qapps', {
      data: { id },
    });
    await dispatch('getQapps', null);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
