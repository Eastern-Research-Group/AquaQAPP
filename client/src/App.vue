<template>
  <div id="app">
    <div v-if="$auth.ready()" class="app-container">
      <info-header class="info-header" v-if="$auth.check()" />
      <page-header class="page-header" />
      <main class="main-section section has-text-white">
        <progress-bar v-if="$route.name === 'navigate'" />
        <div class="container">
          <router-view />
        </div>
      </main>
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
};
</script>
