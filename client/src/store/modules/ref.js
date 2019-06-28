import axios from 'axios';

const state = {
  concerns: [],
  roles: [],
  locationTypes: [],
  collectionMethods: [],
  coordRefSystems: [],
  waterTypes: [{ id: 'Fresh', name: 'Fresh' }, { id: 'Salt', name: 'Salt' }, { id: 'Brackish', name: 'Brackish' }],
  yesNo: [{ code: 'Y', label: 'Yes' }, { code: 'N', label: 'No' }],
  parameters: [],
  samplingMethodologies: [],
  locationRationales: [
    'Spatial coverage of waterbody',
    'Feature of interest',
    'Regulatory requirement',
    'Proximity to impact or suspected pollution source',
    'Capacity (funding or staffing) Replication of previous sampling efforts (e.g. by DEP or EPA)',
  ],
  sampleNumRationales: [
    'Random or probabilistic',
    'Accessibility considerations',
    'Proximity to potential pollutant source',
    'Replication of previous sampling efforts (e.g. by DEP or EPA)',
  ],
  customSections: [
    { component: 'PersonnelTable', label: 'Project Organization/Personnel' },
    { component: 'Locations', label: 'Monitoring Locations' },
    { component: 'Parameters', label: 'Parameters' },
    { component: 'ProjectActivities', label: 'Project Activities' },
    { component: 'SampleDesign', label: 'Sample Design' },
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

    const roles = await axios.get('api/roles');
    commit('SET_REF', { ref: 'roles', data: roles.data.map((role) => role.label) });

    const locationTypes = await axios.get('api/location-types');
    commit('SET_REF', { ref: 'locationTypes', data: locationTypes.data });

    const collectionMethods = await axios.get('api/collection-methods');
    commit('SET_REF', { ref: 'collectionMethods', data: collectionMethods.data });

    const coordRefSystems = await axios.get('api/coord-ref-systems');
    commit('SET_REF', { ref: 'coordRefSystems', data: coordRefSystems.data });

    const parameters = await axios.get('api/parameters');
    commit('SET_REF', { ref: 'parameters', data: parameters.data });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
