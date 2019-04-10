<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column">
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
            <label class="label is-size-5">Password</label>
            <input class="input" type="password" required placeholder="Enter password" v-model="password" />
            <p class="is-size-7">It must be at least 8 characters in length.</p>
            <p class="is-size-7">It must contain one of the following characters: lower case, upper case, numerics.</p>
          </div>
          <div class="field">
            <label class="label is-size-5">Confirm Password</label>
            <input class="input" type="password" required placeholder="Confirm password" v-model="confirmPassword" />
          </div>
          <Alert v-if="error" :message="error" class="error" />
          <div class="field">
            <div class="control">
              <button class="button is-primary is-fullwidth">Register</button>
            </div>
          </div>
        </form>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert';

export default {
  components: {
    Alert,
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
          redirect: '/dashboard',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  font-size: 15px;
}
</style>
