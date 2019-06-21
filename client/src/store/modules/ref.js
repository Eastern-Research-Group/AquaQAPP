import axios from 'axios';
import reduceCrosswalk from '@/utils/reduceCrosswalk';

const state = {
  concerns: [],
  locationTypes: [],
  collectionMethods: [],
  coordRefSystems: [],
  waterTypes: [{ id: 'Fresh', name: 'Fresh' }, { id: 'Salt', name: 'Salt' }, { id: 'Brackish', name: 'Brackish' }],
  yesNo: [{ code: 'Y', label: 'Yes' }, { code: 'N', label: 'No' }],
  crosswalks: [],
  parameters: [],
  samplingMethodologies: [],
  // todo: make this an array of objects with keys for label and component name, then display custom component dynamically
  customSections: [
    { component: 'PersonnelTable', label: 'Project Organization/Personnel' },
    { component: 'Locations', label: 'Monitoring Locations' },
    { component: 'Parameters', label: 'Parameters' },
    { component: 'ProjectActivities', label: 'Project Activities' },
  ],
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

    const crosswalks = await axios.get('api/crosswalks');
    commit('SET_REF', { ref: 'crosswalks', data: crosswalks.data });

    const parameters = await axios.get('api/parameters');
    commit('SET_REF', { ref: 'parameters', data: parameters.data });

    commit('SET_REF', { ref: 'samplingMethodologies', data: reduceCrosswalk(crosswalks.data, 'samplingMethodology') });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
