import axios from 'axios';

const state = {
  id: null,
  title: '',
  description: '',
  isFetching: false,
  data: [],
  doc: null,
  completedSections: [],
};

const getters = {
  qappData(state) {
    // make sure multiple-entry fields are sorted properly before placing in arrays
    const sortedData = state.data.sort((a, b) => {
      if (a.valueId < b.valueId) {
        return -1;
      }
      if (a.valueId > b.valueId) {
        return 1;
      }
      return 0;
    });
    const data = {};
    // use questionId: value for single-entry fields, and questionId: [array of values] for multiple-entry
    sortedData.forEach((datum) => {
      if (Array.isArray(data[datum.questionId])) {
        data[datum.questionId].push(datum.value);
      } else if (datum.valueId) {
        data[datum.questionId] = [datum.value];
      } else {
        data[datum.questionId] = datum.value;
      }
    });
    return data;
  },
  progress(state) {
    // 10 possible sections to complete, so get number of completed sections and multiply by 10 for percentage
    return state.completedSections.length * 10;
  },
};

const mutations = {
  SET_FIELD(state, payload) {
    state[payload.prop] = payload.value;
  },
  SET_CURRENT_QAPP(state, payload) {
    /* The current QAPP represents this entire module's state,
       so we loop through all QAPP fields to set state. */
    Object.keys(payload).forEach((prop) => {
      state[prop] = payload[prop];
    });
  },
  CLEAR_CURRENT_QAPP(state) {
    Object.keys(state).forEach((prop) => {
      state[prop] = null;
    });
    // set special fields to empty arrays to avoid logic errors
    state.data = [];
    state.completedSections = [];
  },
  SET_IS_FETCHING(state, value) {
    state.isFetching = value;
  },
  SET_DOC(state, value) {
    state.doc = value;
  },
};

const actions = {
  async get({ commit }, id) {
    commit('CLEAR_CURRENT_QAPP', []);
    commit('SET_IS_FETCHING', true);

    const qappRes = await axios.get(`api/qapps/${id}`);
    commit('SET_CURRENT_QAPP', qappRes.data);
    commit('SET_IS_FETCHING', false);
  },
  async addCompletedSection({ commit, state }, sectionId) {
    const response = await axios.post(`api/completed-sections`, {
      qappId: state.id,
      sectionId,
    });
    commit('SET_FIELD', { prop: 'completedSections', value: response.data.map((d) => d.sectionId) });
  },
  async deleteCompletedSection({ commit, state }, sectionId) {
    const response = await axios.delete(`api/completed-sections`, {
      data: {
        qappId: state.id,
        sectionId,
      },
    });
    commit('SET_FIELD', { prop: 'completedSections', value: response.data.map((d) => d.sectionId) });
  },
  async save({ commit }, payload) {
    // TODO: implement error handling on each save
    const qappRes = await axios.post('api/qapps/data', payload);
    commit('SET_CURRENT_QAPP', qappRes.data);
  },
  async generate({ commit, state }) {
    const qappRes = await axios.get(`api/qapps/${state.id}`);
    const doc = await axios({
      method: 'post',
      url: 'api/generate',
      responseType: 'arraybuffer',
      data: {
        qapp: qappRes.data,
      },
    });
    commit('SET_DOC', doc.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
