<template>
  <div id="app">
    <div v-if="$auth.ready()" class="app-container">
      <info-header class="info-header" v-if="$auth.check()" />
      <page-header class="page-header" />
      <progress-bar v-if="$route.name === 'navigate'" />
      <section class="main-section section has-text-white">
        <div class="container">
          <router-view />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import InfoHeader from './components/app/InfoHeader';
import PageHeader from './components/app/PageHeader';
import ProgressBar from './components/app/ProgressBar';

export default {
  name: 'App',
  components: {
    PageHeader,
    InfoHeader,
    ProgressBar,
  },
  created() {
    // Fetch structure data from DB to generate sections and questions on the fly
    this.$store.dispatch('structure/getSections');
    this.$store.dispatch('structure/getQuestions');
    // Fetch lookup reference data
    this.$store.dispatch('ref/getData');
  },
};
</script>
