<template>
  <section class="page-header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-5" to="/">
            <h1>AquaQAPP</h1>
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
              <a href="mailto:pamela.dibona@state.ma.us;jillian.carr@mass.gov;Aquaqapp@erg.com" class="navbar-item">
                <strong>Contact Us</strong>
              </a>
              <router-link class="navbar-item" to="/">
                <strong>Log In</strong>
              </router-link>
              <router-link class="navbar-item" to="/register">
                <strong>Register</strong>
              </router-link>
            </div>
            <div class="navbar-item" v-if="$auth.check()">
              <a href="mailto:pamela.dibona@state.ma.us;jillian.carr@mass.gov;Aquaqapp@erg.com" class="navbar-item">
                <strong>Contact Us</strong>
              </a>
              <a class="navbar-item" href="/users_guide.pdf" target="_blank">User Guide</a>
              <router-link class="navbar-item" to="/dashboard">
                <strong>Dashboard</strong>
              </router-link>
              <info-header class="info-header" v-if="$auth.check()" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import InfoHeader from './InfoHeader';

export default {
  props: ['userName'],
  components: {
    InfoHeader,
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
    showFile(blob) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (
        window.navigator.userAgent.indexOf('Firefox') === -1 &&
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
      ) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'test.docx';
      link.click();
      setTimeout(function firefoxDelay() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    },
  },
};
</script>

<style>
h1 {
  font-weight: bold;
}
.page-header {
  background-color: #fff;
  font-weight: bold;
}
.generate-btn {
  padding: 0 0.5em;
}
</style>
