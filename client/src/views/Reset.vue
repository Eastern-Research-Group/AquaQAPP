<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column">
      <h1 class="title has-text-centered">Reset</h1>
      <form @submit.prevent="resetPassword">
        <div class="field">
          <label class="label">New Password</label>
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
        <Alert v-if="error" :message="error" />
        <div class="field">
          <div class="control">
            <button class="button is-primary is-fullwidth">Reset</button>
          </div>
        </div>
        <Success v-if="showSuccessMessage" :message="successMessage" />
      </form>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from '@/components/Alert';
import Success from '@/components/Success';

export default {
  components: {
    Alert,
    Success,
  },
  data() {
    return {
      error: null,
      successMessage: 'Confirmation email sent!',
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
    ...mapActions('user', ['reset_Password']),
    async resetPassword() {
      try {
        await this.reset_Password({
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
