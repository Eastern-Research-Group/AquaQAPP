<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-5">
        <h1 class="title has-text-centered">Register</h1>
        <form @submit.prevent="register">
          <div class="field">
            <label class="label is-size-5">Name</label>
            <input class="input" type="text" required placeholder="Enter name" v-model="name" maxlength="255" />
          </div>
          <div class="field">
            <label class="label is-size-5">Organization</label>
            <input
              class="input"
              type="text"
              required
              placeholder="Enter organization"
              v-model="organization"
              maxlength="255"
            />
          </div>
          <div class="field">
            <label class="label is-size-5">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="email" maxlength="255" />
          </div>
          <div class="field">
            <label class="label is-size-5">Confirm Email</label>
            <input
              class="input"
              type="email"
              required
              placeholder="Confirm email"
              v-model="confirmEmail"
              maxlength="255"
            />
          </div>
          <div class="field">
            <label class="label is-size-5">
              Password
              <HoverText :icon="true" hoverId="passwordInfo">
                Must be at least 8 characters in length and contain at least one lower-case and upper-case character and
                one number.
              </HoverText>
            </label>
            <input
              class="input"
              type="password"
              required
              placeholder="Enter password"
              v-model="password"
              maxlength="255"
            />
          </div>
          <div class="field">
            <label class="label is-size-5">Confirm Password</label>
            <input
              class="input"
              type="password"
              required
              placeholder="Confirm password"
              v-model="confirmPassword"
              maxlength="255"
            />
          </div>
          <Alert v-if="error" :message="error" type="error" />
          <div class="field">
            <div class="control">
              <Button class="is-fullwidth is-size-5" label="Register" type="dark" submit />
            </div>
          </div>
        </form>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/shared/Alert';
import HoverText from '@/components/shared/HoverText';
import Button from '@/components/shared/Button';

export default {
  components: {
    Alert,
    HoverText,
    Button,
  },
  data() {
    return {
      name: '',
      email: '',
      confirmEmail: '',
      password: '',
      error: null,
      confirmPassword: '',
      organization: '',
    };
  },
  methods: {
    async register() {
      try {
        await this.$auth.register({
          data: {
            name: this.name,
            email: this.email,
            confirmEmail: this.confirmEmail,
            password: this.password,
            confirmPassword: this.confirmPassword,
            organization: this.organization,
          },
          autoLogin: true,
          redirect: { name: 'dashboard' },
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
