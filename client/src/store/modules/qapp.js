import axios from 'axios';

const state = {
  title: '',
  description: '',
  currentQapp: null,
};

const mutations = {
  SET_TITLE(state, value) {
    state.title = value;
  },
  SET_DESCRIPTION(state, value) {
    state.description = value;
  },
  SET_FIELD(state, payload) {
    state[payload.prop] = payload.value;
  },
  SET_CURRENT_QAPP(state, value) {
    state.currentQapp = value;
  },
};

const actions = {
  async add({ commit, state }, userId) {
    if (!state.title || !state.description) {
      return;
    }
    const postData = {
      userId: userId,
      title: state.title,
      description: state.description,
    };
    const newQapp = await axios.post('api/qapps', postData);
    await commit('SET_CURRENT_QAPP', newQapp.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
