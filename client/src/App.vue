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
import InfoHeader from './components/InfoHeader';
import PageHeader from './components/PageHeader';
import ProgressBar from './components/ProgressBar';

export default {
  name: 'App',
  components: {
    PageHeader,
    InfoHeader,
    ProgressBar,
  },
};
</script>

<style lang="scss">
$theme-colors: (
  'primary': #1650ac,
  'secondary': #182e51,
  'success': #40a132,
);
</style>
