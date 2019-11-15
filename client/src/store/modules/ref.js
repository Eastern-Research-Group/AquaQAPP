import axios from 'axios';

const state = {
  procedures: [],
  concerns: [],
  roles: [],
  locationTypes: [],
  collectionMethods: [],
  coordRefSystems: [],
  waterTypes: [{ id: 'Fresh', name: 'Fresh' }, { id: 'Salt', name: 'Marine' }, { id: 'Estuarine', name: 'Estuarine' }],
  yesNo: [{ code: 'Y', label: 'Yes' }, { code: 'N', label: 'No' }],
  parameters: [],
  samplingMethodologies: [],
  locationRationales: [
    'Accessibility considerations',
    'Capacity (funding or staffing)',
    'Feature of interest',
    'Proximity to impact or suspected pollution source',
    'Regulatory requirement',
    ' Replication of previous sampling efforts (e.g. by DEP or EPA)',
    'Spatial coverage of waterbody',
  ],
  sampleNumRationales: [
    'Capacity (funding or staffing)',
    'Proximity to potential pollutant source',
    'Random or probabilistic spatial coverage',
    'Replication of previous sampling efforts (e.g. by DEP or EPA)',
  ],
  customSections: [
    { component: 'PersonnelTable', label: 'Project Organization/Personnel' },
    { component: 'Locations', label: 'Monitoring Locations' },
    { component: 'Parameters', label: 'Parameters' },
    { component: 'ProjectActivities', label: 'Project Activities' },
    { component: 'SampleDesign', label: 'Sampling Design' },
    { component: 'RecordHandlingProcedures', label: 'Record Handling Procedures' },
    { component: 'ParametersByLocation', label: 'Parameters By Location' },
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
    commit('SET_REF', { ref: 'roles', data: roles.data });

    const locationTypes = await axios.get('api/location-types');
    commit('SET_REF', { ref: 'locationTypes', data: locationTypes.data.map((location) => location.label) });

    const collectionMethods = await axios.get('api/collection-methods');
    commit('SET_REF', { ref: 'collectionMethods', data: collectionMethods.data });

    const coordRefSystems = await axios.get('api/coord-ref-systems');
    commit('SET_REF', { ref: 'coordRefSystems', data: coordRefSystems.data.map((c) => c.label) });

    const parameters = await axios.get('api/parameters');
    commit('SET_REF', { ref: 'parameters', data: parameters.data });

    const procedures = await axios.get('api/procedures');
    commit('SET_REF', { ref: 'procedures', data: procedures.data });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
