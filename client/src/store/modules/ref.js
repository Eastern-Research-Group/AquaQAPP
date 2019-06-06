import axios from 'axios';

const state = {
  concerns: [],
  locationTypes: [],
  collectionMethods: [],
  coordRefSystems: [],
  waterTypes: [{ id: 'Fresh', name: 'Fresh' }, { id: 'Salt', name: 'Salt' }, { id: 'Brackish', name: 'Brackish' }],
  yesNo: [{ code: 'Y', label: 'Yes' }, { code: 'N', label: 'No' }],
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

    const locationTypes = await axios.get('api/location-types');
    commit('SET_REF', { ref: 'locationTypes', data: locationTypes.data });

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
