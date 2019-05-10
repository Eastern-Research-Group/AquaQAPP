import axios from 'axios';

const state = {
  id: null,
  title: '',
  description: '',
  isFetching: false,
  data: [],
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
    state.data = [];
  },
  SET_IS_FETCHING(state, value) {
    state.isFetching = value;
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
  async save({ commit }, payload) {
    // TODO: implement error handling on each save
    const qappRes = await axios.post('api/qapps/data', payload);
    commit('SET_CURRENT_QAPP', qappRes.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
