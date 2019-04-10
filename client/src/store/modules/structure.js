import axios from 'axios';

const state = {
  sections: [],
  questions: [],
  isFetching: false,
};

const mutations = {
  SET_SECTIONS(state, value) {
    state.sections = value;
  },
  SET_QUESTIONS(state, value) {
    state.questions = value;
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
