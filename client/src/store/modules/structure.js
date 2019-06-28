import axios from 'axios';
import getQuestionIdByName from '@/utils/getQuestionIdByName';

const state = {
  sections: [],
  questions: [],
  concerns: [],
  roles: [],
  isFetching: false,
};

const getters = {
  concernsQuestionId(state) {
    return getQuestionIdByName(state.questions, 'waterConcerns');
  },
  rolesQuestionId(state) {
    return getQuestionIdByName(state.questions, 'roles');
  },
  locConcernsQuestionId(state) {
    return getQuestionIdByName(state.questions, 'mapWaterConcerns');
  },
  concernsDifferByLocQuestionId(state) {
    return getQuestionIdByName(state.questions, 'differByLocation');
  },
  locationQuestionId(state) {
    return getQuestionIdByName(state.questions, 'locationId');
  },
  locationWaterTypeQuestionId(state) {
    return getQuestionIdByName(state.questions, 'waterType');
  },
  parametersQuestionId(state) {
    return getQuestionIdByName(state.questions, 'parameters');
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
  SET_ROLES(state, value) {
    state.roles = value;
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
  async getRoles({ commit }) {
    commit('SET_ROLES', []);
    commit('SET_IS_FETCHING', true);

    const roles = await axios.get('api/roles');
    commit('SET_ROLES', roles.data);
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
