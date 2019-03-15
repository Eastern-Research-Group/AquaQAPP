<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Log In</v-toolbar-title>
        </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
                   v-model="email"
                   label="Email"
            ></v-text-field>
            <br>
            <v-text-field
                    type="password"
                    v-model="password"
                    label="Password"
            ></v-text-field>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
              dark
              class="cyan"
              @click='login'>
              Log In
            </v-btn>
          </div>
        </div>
    </v-flex>
  </v-layout>
</template>

<script>

import authenticationService from "../services/authenticationService";

export default {
  data () {
    return {
        email: '',
        password: '',
        error: null
    }
  },
  methods: {
      async login () {
          try {
              const response = await authenticationService.login({
                  email: this.email,
                  password: this.password
              });
              this.$store.dispatch('setToken', response.data.token);
              this.$store.dispatch('setUser', response.data.user);
              this.$router.push({name: 'dashboard'});
          } catch (err) {
              this.error = err.response.data.error
          }
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
