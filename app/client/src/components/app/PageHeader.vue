<template>
  <section class="page-header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-5" to="/">
            <img class="logo" alt="AquaQAPP Logo" src="../../assets/aquaqapp-logo.png" />
            <h1 class="sr-only">AquaQAPP</h1>
          </router-link>

          <a
            role="button"
            :class="'navbar-burger burger' + (isActive ? ' is-active' : '')"
            aria-label="menu"
            aria-expanded="false"
            data-target="mainNav"
            @click="isActive = !isActive"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="mainNav" :class="'navbar-menu burger' + (isActive ? ' is-active' : '')">
          <div class="navbar-end">
            <div class="navbar-item" v-if="!$auth.check()">
              <router-link class="navbar-item" to="/">
                <strong>Log In</strong>
              </router-link>
              <router-link class="navbar-item" to="/register">
                <strong>Register</strong>
              </router-link>
              <a href="mailto:pamela.dibona@mass.gov;jill.carr@mass.gov;aquaqapp@erg.com" class="navbar-item">
                <strong>Contact Us</strong>
              </a>
            </div>
            <div class="navbar-item" v-if="$auth.check()">
              <a class="navbar-item" href="/AquaQAPP_User_Guide.pdf#page=13" target="_blank">Quick Start Guide</a>
              <a class="navbar-item" href="/AquaQAPP_User_Guide.pdf" target="_blank">User Guide</a>
              <router-link class="navbar-item" to="/dashboard">
                <strong>Dashboard</strong>
              </router-link>
              <user-header class="user-header" v-if="$auth.check()" />
              <a href="mailto:pamela.dibona@mass.gov;jill.carr@mass.gov;aquaqapp@erg.com" class="navbar-item">
                <strong>Contact Us</strong>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserHeader from './UserHeader';

export default {
  props: ['userName'],
  components: {
    UserHeader,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections', 'isGenerating']),
    ...mapState('structure', ['sections']),
  },
  methods: {
    ...mapActions('qapp', ['generate']),
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
}
.navbar-item .logo {
  max-height: 2.75rem;
  padding: 0.25rem 0;
}
.page-header {
  background-color: #fff;
  font-weight: bold;
}

.navbar-burger {
  height: 3.75rem;

  span {
    height: 3px;
    width: 20px;

    &:nth-child(1) {
      top: calc(50% - 7px);
    }

    &:nth-child(3) {
      top: calc(50% + 5px);
    }
  }

  &.is-active span {
    &:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }
    &:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  }
}
</style>
