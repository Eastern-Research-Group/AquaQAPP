<template>
  <section class="page-header">
    <b-container>
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="/">AquaQAPP</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto" v-if="$auth.check()">
            <b-nav-item to="/dashboard" :active="$route.name === 'dashboard'">Dashboard</b-nav-item>
            <b-nav-item to="">Generate</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-if="!$auth.check()">
            <b-nav-item to="/login">Log In</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </section>

</template>

<script>
export default {
  props: [
    'userName',
  ],
  data() {
    return {};
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style>
.page-header {
  background-color: #FFF;
  font-weight: bold;
}
</style>
