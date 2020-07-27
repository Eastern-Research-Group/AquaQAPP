<template>
  <div id="app">
    <div v-if="$auth.ready()" class="app-container">
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
import PageHeader from './components/app/PageHeader';
import ProgressBar from './components/app/ProgressBar';

export default {
  name: 'App',
  components: {
    PageHeader,
    ProgressBar,
  },
};
</script>
