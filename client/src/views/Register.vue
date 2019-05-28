<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-5">
        <h1 class="title has-text-centered">Register</h1>
        <form @submit.prevent="register">
          <div class="field">
            <label class="label is-size-5">Name</label>
            <input class="input" type="text" required placeholder="Enter name" v-model="name" />
          </div>
          <div class="field">
            <label class="label is-size-5">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="email" />
          </div>
          <div class="field">
            <label class="label is-size-5">
              Password
              <HoverText icon="true" hoverId="passwordInfo">
                Must be at least 8 characters in length and contain at least one lower-case and upper-case character and
                one number.
              </HoverText>
            </label>
            <input class="input" type="password" required placeholder="Enter password" v-model="password" />
          </div>
          <div class="field">
            <label class="label is-size-5">Confirm Password</label>
            <input class="input" type="password" required placeholder="Confirm password" v-model="confirmPassword" />
          </div>
          <Alert v-if="error" :message="error" type="error" />
          <div class="field">
            <div class="control">
              <Button class="is-fullwidth is-size-5" label="Register" type="primary" submit />
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
      password: '',
      error: null,
      confirmPassword: '',
    };
  },
  methods: {
    async register() {
      try {
        await this.$auth.register({
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          },
          success: () => {
            // auto-login after registration
            this.$auth.login({
              data: {
                email: this.email,
                password: this.password,
              },
            });
          },
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
