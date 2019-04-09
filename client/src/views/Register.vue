<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <h1 class="title has-text-centered">Register</h1>
        <form @submit.prevent="register">
          <div class="field">
            <label class="label">Name</label>
            <input class="input" type="text" required placeholder="Enter name" v-model="name" />
          </div>
          <div class="field">
            <label class="label">Email</label>
            <input class="input" type="email" required placeholder="Enter email" v-model="email" />
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input class="input" type="password" required placeholder="Enter password" v-model="password" />
          </div>
          <Alert v-if="error" :message="error" />
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
    Alert
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
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
</style>
