<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-5">
      <h1 class="title has-text-centered">Log In</h1>
      <form @submit.prevent="login">
        <div class="field">
          <label for="email" class="label is-size-5">Email</label>
          <input
            id="email"
            class="input"
            type="email"
            required
            placeholder="Enter email"
            v-model="email"
            maxlength="255"
          />
        </div>
        <div class="field">
          <label for="password" class="label is-size-5">Password</label>
          <input
            id="password"
            class="input"
            type="password"
            required
            placeholder="Enter password"
            v-model="password"
            maxlength="255"
          />
        </div>
        <Alert v-if="error" :message="error" type="error" />
        <div class="field">
          <div class="control">
            <Button class="is-fullwidth is-size-5" label="Log In" type="primary" submit />
          </div>
        </div>
      </form>
      <br />
      <Button
        class="is-fullwidth"
        label="Forgot Password?"
        @click.native="() => (shouldShowReset = true)"
        type="link"
      />
      <SideNav v-if="shouldShowReset" title="Forgot Password?" :handleClose="() => (shouldShowReset = false)">
        <form @submit.prevent="resetPassword">
          <div class="field">
            <p>Enter your email address to receive a link to reset your password.</p>
          </div>
          <div class="field">
            <label class="label sr-only">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="resetEmail" maxlength="255" />
          </div>
          <div class="field">
            <div class="control">
              <Button class="is-fullwidth" label="Send Email" type="primary" submit />
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
import Button from '@/components/shared/Button';

export default {
  components: {
    Alert,
    SideNav,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      resetEmail: '',
      resetError: null,
      shouldShowReset: false,
      successMessage:
        'If there is an account associated with this email, instructions for resetting your password have been sent.',
      showSuccessMessage: false,
    };
  },
  mounted() {
    if (this.$route.query.redirected) {
      this.error = 'User must be logged into the application first.';
    }
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
        if (error.response.status === 422) {
          // ticket 214 - show same message when user not found as when they are found
          this.showSuccessMessage = true;
        } else {
          // general error
          this.resetError = error.response.data.error;
        }
      }
    },
  },
};
</script>
