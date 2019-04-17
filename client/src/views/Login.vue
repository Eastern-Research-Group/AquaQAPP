<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-5">
      <h1 class="title has-text-centered">Log In</h1>
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">Email</label>
          <input class="input" type="email" required placeholder="Enter email" v-model="email" />
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input class="input" type="password" required placeholder="Enter password" v-model="password" />
        </div>
        <Alert v-if="error" :message="error" type="error" />
        <div class="field">
          <div class="control">
            <button class="button is-primary is-fullwidth">Log In</button>
          </div>
        </div>
      </form>
      <br />
      <button v-if="error === 'Incorrect password'" class="button is-primary is-fullwidth" @click="onResetPassword">
        Reset Password?
      </button>
      <SideNav v-if="shouldShowReset" title="Reset Password?" :handleClose="() => (this.shouldShowReset = false)">
        <form @submit.prevent="forgotPassword">
          <div class="field">
            <h2>An email will be sent to this address to reset your password.</h2>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="email" />
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
import Alert from '@/components/Alert';
import SideNav from '@/components/SideNav';

export default {
  components: {
    Alert,
    SideNav,
  },
  data() {
    return {
      password: '',
      error: null,
      shouldShowReset: false,
      successMessage: 'Check your email!',
      showSuccessMessage: false,
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.user.email;
      },
      set(value) {
        this.$store.commit('user/SET_EMAIL', value);
      },
    },
  },
  methods: {
    ...mapActions('user', ['forgot_Password']),
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
    async onResetPassword() {
      this.shouldShowReset = true;
    },
    async forgotPassword() {
      try {
        await this.forgot_Password({
          data: {
            email: this.email,
          },
        });
        this.showSuccessMessage = true;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inline-icon {
  color: hsl(0, 0%, 4%);
}
</style>
