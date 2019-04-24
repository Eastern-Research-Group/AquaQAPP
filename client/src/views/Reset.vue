<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-5">
      <h1 class="title has-text-centered">Reset Password</h1>
      <form @submit.prevent="submitPasswordReset">
        <div class="field">
          <label class="label">
            New Password
            <HoverText icon="true" hoverId="passwordInfo">
              Must be at least 8 characters in length and contain at least one lower-case and upper-case character and
              one number.
            </HoverText>
          </label>
          <input class="input" type="password" required placeholder="Enter New password" v-model="newPassword" />
        </div>
        <div class="field">
          <label class="label">Confirm New Password</label>
          <input
            class="input"
            type="password"
            required
            placeholder="Confirm New password"
            v-model="confirmNewPassword"
          />
        </div>
        <Alert v-if="error" :message="error" type="error" />
        <div class="field">
          <div class="control">
            <button class="button is-primary is-fullwidth">Reset</button>
          </div>
        </div>
        <Alert v-if="showSuccessMessage" v-bind:isMessageHTML="true" v-bind:message="successMessage" type="success" />
      </form>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from '@/components/shared/Alert';
import HoverText from '@/components/shared/HoverText';

export default {
  components: {
    Alert,
    HoverText,
  },
  data() {
    return {
      error: null,
      successMessage: 'Your password was successfully reset. Please <router-link to="/">log in</router-link> with your new password to continue.',
      showSuccessMessage: false,
    };
  },
  mounted() {
    this.resetPasswordToken = this.$route.query.token;
  },
  computed: {
    newPassword: {
      get() {
        return this.$store.state.user.newPassword;
      },
      set(value) {
        this.$store.commit('user/SET_NEW_PASSWORD', value);
      },
    },
    confirmNewPassword: {
      get() {
        return this.$store.state.user.confirmNewPassword;
      },
      set(value) {
        this.$store.commit('user/SET_PASSWORD_CONFIRMATION', value);
      },
    },
    resetPasswordToken: {
      get() {
        return this.$store.state.user.resetPasswordToken;
      },
      set(value) {
        this.$store.commit('user/SET_TOKEN', value);
      },
    },
  },
  methods: {
    ...mapActions('user', ['resetPassword']),
    async submitPasswordReset() {
      try {
        await this.resetPassword({
          data: {
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmNewPassword,
            resetPasswordToken: this.resetPasswordToken,
          },
        });
        this.showSuccessMessage = true;
        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
