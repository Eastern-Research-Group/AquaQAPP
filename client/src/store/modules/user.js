import axios from 'axios';

const state = {
  email: null,
  resetPasswordToken: null,
  newPassword: null,
  confirmNewPassword: null,
};

const mutations = {
  SET_EMAIL(state, value) {
    state.email = value;
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
