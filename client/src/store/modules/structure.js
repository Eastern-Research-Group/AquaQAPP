import axios from 'axios';

const getQuestionIdByLabel = (questions, label) => {
  if (questions.length) {
    return questions.find((q) => q.questionLabel === label).id;
  }
  return null;
};

const state = {
  sections: [],
  questions: [],
  concerns: [],
  isFetching: false,
};

const getters = {
  concernsQuestionId(state) {
    return getQuestionIdByLabel(state.questions, 'What are your water quality concerns? Select all that apply.');
  },
  concernsDifferByLocQuestionId(state) {
    return getQuestionIdByLabel(state.questions, 'Do your water quality concerns differ by sampling location?');
  },
  locationQuestionId(state) {
    return getQuestionIdByLabel(state.questions, 'Location ID');
  },
  locationWaterTypeQuestionId(state) {
    return getQuestionIdByLabel(state.questions, 'Water Type');
  },
};

const mutations = {
  SET_SECTIONS(state, value) {
    state.sections = value;
  },
  SET_QUESTIONS(state, value) {
    state.questions = value;
  },
  SET_CONCERNS(state, value) {
    state.concerns = value;
  },
  SET_IS_FETCHING(state, value) {
    state.isFetching = value;
  },
};

const actions = {
  async getSections({ commit }) {
    commit('SET_SECTIONS', []);
    commit('SET_IS_FETCHING', true);

    const sections = await axios.get('api/sections');
    commit('SET_SECTIONS', sections.data);
    commit('SET_IS_FETCHING', false);
  },
  async getQuestions({ commit }) {
    commit('SET_QUESTIONS', []);
    commit('SET_IS_FETCHING', true);

    const questions = await axios.get('api/questions');
    commit('SET_QUESTIONS', questions.data);
    commit('SET_IS_FETCHING', false);
  },
  async getConcerns({ commit }) {
    commit('SET_CONCERNS', []);
    commit('SET_IS_FETCHING', true);

    const concerns = await axios.get('api/concerns');
    commit('SET_CONCERNS', concerns.data);
    commit('SET_IS_FETCHING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
