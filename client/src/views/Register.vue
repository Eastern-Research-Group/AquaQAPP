<template>
  <b-row class="main-view">
    <b-col></b-col>
    <b-col>
      <h2 class="text-center">Register</h2>
      <b-form>
        <b-form-group
            label="Name"
            label-for="name"
        >
          <b-form-input
              id="name"
              type="text"
              v-model="name"
              required
              placeholder="Enter name" />
        </b-form-group>

        <b-form-group
            label="Email"
            label-for="email"
        >
          <b-form-input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="Enter email" />
        </b-form-group>

        <b-form-group
            label="Password"
            label-for="password"
        >
          <b-form-input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="Enter password" />
        </b-form-group>
        <b-alert show variant="danger" class="text-center" v-if="error" v-html="error"/>

        <b-button @click="register" variant="primary" class="btn-block">Register</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
export default {
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
.error {
  color: red;
}
</style>
