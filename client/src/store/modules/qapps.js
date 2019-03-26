import axios from 'axios';

const state = {
  data: [],
  isFetching: true,
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
    console.log(qapps);
    commit('SET_DATA', qapps.data);
    commit('SET_IS_FETCHING', false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
