<template>
  <v-layout
    v-if="!$store.state.isUserLoggedIn">
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <form
              name="register-form"
              autocomplete="off">
              <v-text-field
                      v-model="name"
                      label="Name"
              ></v-text-field>
              <br>
              <v-text-field
                      v-model="email"
                      label="Email"
              ></v-text-field>
              <br>
              <v-text-field
                      type="password"
                      v-model="password"
                      label="Password"
                      autocomplete="new-password"
              ></v-text-field>
            </form>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
              dark
              class="cyan"
              @click='register'>
              Register
            </v-btn>
          </div>
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
        name: '',
        email: '',
        password: '',
        error: null
    }
  },
  methods: {
      register () {
        this.$auth.register({
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          success: (response) => {
            // globally set the user and token
            this.$auth.user = response.data.user;
            this.$auth.token(null, response.data.token);
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
