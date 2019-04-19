<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-5">
      <h1 class="title has-text-centered">Log In</h1>
      <form @submit.prevent="login">
        <div class="field">
          <label for="email" class="label is-size-5">Email</label>
          <input id="email" class="input" type="email" required placeholder="Enter email" v-model="email" />
        </div>
        <div class="field">
          <label for="password" class="label is-size-5">Password</label>
          <input id="password" class="input" type="password" required placeholder="Enter password" v-model="password" />
        </div>
        <Alert v-if="error" :message="error" type="error" />
        <div class="field">
          <div class="control">
            <button class="button is-primary is-fullwidth is-size-5">Log In</button>
          </div>
        </div>
        <div class="field">
          <button type="button" class="button is-link is-fullwidth" @click="shouldShowReset = true">
            Forgot Password?
          </button>
        </div>
      </form>
      <SideNav v-if="shouldShowReset" title="Forgot Password?" :handleClose="() => (this.shouldShowReset = false)">
        <form @submit.prevent="resetPassword">
          <div class="field">
            <p>Enter your email address to receive a link to reset your password.</p>
          </div>
          <div class="field">
            <label class="label sr-only">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="resetEmail" />
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary is-fullwidth">Send Email</button>
            </div>
          </div>
          <Alert v-if="showSuccessMessage" :message="successMessage" type="success" />
          <Alert v-if="resetError" :message="resetError" type="error" />
        </form>
      </SideNav>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from '@/components/shared/Alert';
import SideNav from '@/components/shared/SideNav';

export default {
  components: {
    Alert,
    SideNav,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      resetEmail: '',
      resetError: null,
      shouldShowReset: false,
      successMessage: 'Check your email!',
      showSuccessMessage: false,
    };
  },
  methods: {
    ...mapActions('user', ['forgotPassword']),
    async login() {
      try {
        await this.$auth.login({
          data: {
            email: this.email,
            password: this.password,
          },
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async resetPassword() {
      this.resetError = null;
      this.showSuccessMessage = false;
      try {
        await this.forgotPassword({
          data: {
            email: this.resetEmail,
          },
        });
        this.showSuccessMessage = true;
      } catch (error) {
        this.resetError = error.response.data.error;
      }
    },
  },
};
</script>
