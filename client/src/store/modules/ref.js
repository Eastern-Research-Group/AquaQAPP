import axios from 'axios';

const state = {
  concerns: [],
  waterTypes: [],
  collectionMethods: [],
  coordRefSystems: [],
};

const mutations = {
  SET_REF(state, payload) {
    state[payload.ref] = payload.data;
  },
};

const actions = {
  async getData({ commit }) {
    const concerns = await axios.get('api/concerns');
    commit('SET_REF', { ref: 'concerns', data: concerns.data });

    const waterTypes = await axios.get('api/water-types');
    commit('SET_REF', { ref: 'waterTypes', data: waterTypes.data });

    const collectionMethods = await axios.get('api/collection-methods');
    commit('SET_REF', { ref: 'collectionMethods', data: collectionMethods.data });

    const coordRefSystems = await axios.get('api/coord-ref-systems');
    commit('SET_REF', { ref: 'coordRefSystems', data: coordRefSystems.data });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
