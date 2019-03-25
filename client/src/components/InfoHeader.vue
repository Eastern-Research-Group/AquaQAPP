<template>
  <section class="info-header">
    <b-container>
      <b-navbar toggleable="lg" type="light">
        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse" class="font-weight-bold">
          <b-navbar-nav class="ml-auto" v-if="$auth.check()">
            <b-nav-item-dropdown right>
              <template slot="button-content">
                {{ $auth.user().name }}
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">
                Log Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
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
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.info-header {
  background-color: #E6E6E6;
  font-size: 0.8em;

  .navbar {
    padding: 0;
  }
}
</style>
