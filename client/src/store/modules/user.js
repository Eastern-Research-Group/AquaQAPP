import axios from 'axios';

const state = {
  newName: null,
  email: null,
  newEmail: null,
  resetPasswordToken: null,
  currentPassword: null,
  newPassword: null,
  confirmNewPassword: null,
  newOrganization: null,
  isSavingProfile: false,
  isChangingPassword: false,
};

const mutations = {
  SET_NEW_NAME(state, value) {
    state.newName = value;
  },
  SET_EMAIL(state, value) {
    state.email = value;
  },
  SET_NEW_EMAIL(state, value) {
    state.newEmail = value;
  },
  SET_CURRENT_PASSWORD(state, value) {
    state.currentPassword = value;
  },
  SET_NEW_PASSWORD(state, value) {
    state.newPassword = value;
  },
  SET_PASSWORD_CONFIRMATION(state, value) {
    state.confirmNewPassword = value;
  },
  SET_TOKEN(state, value) {
    state.resetPasswordToken = value;
  },
  SET_ORGANIZATION(state, value) {
    state.newOrganization = value;
  },
  SET_IS_SAVING_PROFILE(state, value) {
    state.isSavingProfile = value;
  },
  SET_IS_CHANGING_PASSWORD(state, value) {
    state.isChangingPassword = value;
  },
};

const actions = {
  async forgotPassword(context, payload) {
    const postData = {
      email: payload.data.email,
    };
    await axios.post('auth/forgotPassword', postData);
  },
  async resetPassword({ state }) {
    if (!state.newPassword || !state.confirmNewPassword || !state.resetPasswordToken) {
      return;
    }
    const postData = {
      newPassword: state.newPassword,
      confirmNewPassword: state.confirmNewPassword,
      resetPasswordToken: state.resetPasswordToken,
    };
    await axios.post('auth/resetPassword', postData);
  },
  async saveProfile({ commit }, data) {
    commit('SET_IS_SAVING_PROFILE', true);
    await axios.post('auth/user', data);
    commit('SET_IS_SAVING_PROFILE', false);
  },
  async changePassword({ commit, state }) {
    if (!state.newPassword || !state.confirmNewPassword || !state.currentPassword) {
      return;
    }
    commit('SET_IS_CHANGING_PASSWORD', true);
    const postData = {
      currentPassword: state.currentPassword,
      newPassword: state.newPassword,
      confirmNewPassword: state.confirmNewPassword,
    };
    await axios.post('auth/changePassword', postData);
    commit('SET_IS_CHANGING_PASSWORD', false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
