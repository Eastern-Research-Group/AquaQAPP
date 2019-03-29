<template>
  <b-row class="main-view">
    <b-col></b-col>
    <b-col>
      <h2 class="text-center">Log In</h2>
      <b-form>
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
        <b-button @click="login" variant="primary" class="btn-block">Log In</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
