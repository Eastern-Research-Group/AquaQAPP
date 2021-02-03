import axios from 'axios';
import format from 'date-fns/format';

const state = {
  id: null,
  title: '',
  description: '',
  isFetching: false,
  data: [],
  doc: null,
  completedSections: [],
  isSaving: false,
  isGenerating: false,
  generateError: false,
};

const getters = {
  data(state, getters, rootState) {
    return state.data.map((datum) => {
      const question = rootState.structure.questions.find((q) => q.id === datum.questionId);
      return {
        ...datum,
        questionName: question ? question.questionName : '',
      };
    });
  },
  qappData(state, getters) {
    // make sure multiple-entry fields are sorted properly before placing in arrays
    const sortedData = getters.data.sort((a, b) => {
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
      if (Array.isArray(data[datum.questionName])) {
        data[datum.questionName].push({ valueId: datum.valueId, value: datum.value });
      } else if (datum.valueId) {
        data[datum.questionName] = [{ valueId: datum.valueId, value: datum.value }];
      } else {
        data[datum.questionName] = datum.value;
      }
    });
    return data;
  },
  wordDocData(state, getters, rootState) {
    const sortedData = state.data.sort((a, b) => {
      if (a.valueId < b.valueId) {
        return -1;
      }
      if (a.valueId > b.valueId) {
        return 1;
      }
      return 0;
    });
    const dataObj = {};
    sortedData.forEach((datum) => {
      const question = rootState.structure.questions.find((q) => q.id === datum.questionId);
      const sectionName = question ? question.section.sectionName : null;
      const key = question ? question.questionName : null;

      if (key && key === 'details' && datum.valueId) {
        if (!dataObj[sectionName]) {
          dataObj[sectionName] = [];
        }
        if (!dataObj[sectionName][datum.valueId]) {
          dataObj[sectionName][datum.valueId] = {};
        }
        rootState.ref.procedures.forEach((procedure) => {
          if (datum.valueId === procedure.id) {
            dataObj[sectionName][datum.valueId][key] = datum.value;
            dataObj[sectionName][datum.valueId].activity = procedure.activity;
          }
        });
      } else if (datum.valueId && key && key !== 'details') {
        // if valueId exists, further format data into an array of objects split out by each valueId
        if (!dataObj[sectionName]) {
          dataObj[sectionName] = [];
        }
        if (!dataObj[sectionName][datum.valueId]) {
          dataObj[sectionName][datum.valueId] = {};
        }
        dataObj[sectionName][datum.valueId][key] = datum.value;
      } else if (key && key === 'waterConcerns') {
        const concernCodes = datum.value.split(',');
        dataObj[key] = rootState.ref.concerns.filter((c) => concernCodes.indexOf(c.code) > -1);
      } else if (key && key === 'parameters') {
        const paramIds = datum.value.split(',');
        paramIds.forEach((id) => {
          // find the full parameter data object and store in "parameters" array
          if (!dataObj[key]) dataObj[key] = [];
          dataObj[key].push(rootState.ref.parameters.find((p) => p.id === parseInt(id, 10)));
        });
      } else if (key && key === 'otherParameters') {
        dataObj[key] = datum.value ? JSON.parse(datum.value) : [];
      } else if (key) {
        dataObj[key] = datum.value;
      }
    });

    Object.keys(dataObj).forEach((key) => {
      if (Array.isArray(dataObj[key])) {
        /* If property value is an array, filter out all empty/null array items
         * Since valueIds are not 0-based, there will be empty items from our logic in the loop above
         */
        dataObj[key] = dataObj[key].filter((arrItem) => arrItem);
      }

      if (dataObj.sampleDesign) {
        dataObj.sampleDesign.forEach((s) => {
          const parameter = rootState.ref.parameters.find((p) => p.id === parseInt(s.sampleParameter, 10));
          if (parameter) {
            s.sampleParameter = parameter.label;
            s.monitoringCategory = parameter.monitoringCategory;
          }
        });
      }

      if (dataObj.projectOrganization) {
        dataObj.projectOrganization.forEach((p) => {
          let roleCodes = [];
          if (p.roles.indexOf(',') > -1) {
            roleCodes = p.roles.split(',');
          } else {
            roleCodes = [p.roles];
          }

          const formattedRoles = [];

          roleCodes.forEach((code) => {
            if (code.includes(' - ')) {
              p.responsibilities.split(',').forEach((resp) => {
                if (code.slice(0, 1) === resp.slice(0, 1)) {
                  formattedRoles.push({
                    label: code.slice(4),
                    responsibilities: resp.slice(1),
                  });
                }
              });
            }
            if (!code.includes(' - ')) {
              rootState.ref.roles.forEach((role) => {
                if (role.code === code) {
                  formattedRoles.push(role);
                }
              });
            }
          });
          if (formattedRoles.length) p.roles = formattedRoles;
        });
      }
    });
    dataObj.otherParameters = dataObj.otherParameters || [];

    dataObj.dateGenerated = format(new Date(), 'MMMM do, yyyy');

    return dataObj;
  },
  progress(state, getters, rootState) {
    return Math.round((state.completedSections.length / rootState.structure.sections.length) * 100);
  },
  title(state) {
    const titleDatum = state.data.find((d) => d.questionId === 1);
    if (state.data.length && titleDatum) {
      return titleDatum.value;
    }
    return '';
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
  SET_IS_SAVING(state, value) {
    state.isSaving = value;
  },
  SET_IS_GENERATING(state, value) {
    state.isGenerating = value;
  },
  SET_GENERATE_ERROR(state, value) {
    state.generateError = value;
  },
};

const actions = {
  async updateGenerateError({ commit }, boolean) {
    commit('SET_GENERATE_ERROR', boolean);
  },
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
  // Payload consists of array of objects with qappId, questionId, value, and valueId (valueId is optional)
  async save({ commit }, payload) {
    // TODO: implement error handling on each save
    commit('SET_IS_SAVING', true);

    const qappRes = await axios.post('api/qapps/data', payload);
    commit('SET_CURRENT_QAPP', qappRes.data);
    commit('SET_IS_SAVING', false);
  },
  async updateData({ commit, rootGetters }, payload) {
    const updatedValues = {};
    let qappRes = {};
    if (!Array.isArray(payload.values) && typeof payload.values === 'object') {
      Object.keys(payload.values).forEach((questionName) => {
        updatedValues[rootGetters['structure/getQuestionId'](questionName)] = payload.values[questionName];
      });
      qappRes = await axios.put('api/qapps/data', {
        ...payload,
        values: updatedValues,
      });
    } else {
      qappRes = await axios.put('api/qapps/data', payload);
    }
    commit('SET_CURRENT_QAPP', qappRes.data);
  },
  async deleteData({ commit }, payload) {
    const qappRes = await axios.delete('api/qapps/data', { data: payload });
    commit('SET_CURRENT_QAPP', qappRes.data);
  },
  async generate({ commit, getters }) {
    console.log(getters.wordDocData);
    commit('SET_IS_GENERATING', true);
    commit('SET_GENERATE_ERROR', false);
    try {
      const doc = await axios({
        method: 'post',
        url: 'api/generate',
        responseType: 'arraybuffer',
        data: getters.wordDocData,
      });
      commit('SET_GENERATE_ERROR', false);
      commit('SET_IS_GENERATING', false);
      commit('SET_DOC', doc.data);
    } catch (error) {
      commit('SET_GENERATE_ERROR', true);
      commit('SET_IS_GENERATING', false);
      console.log(Object.keys(error), error.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
