<template>
  <div id="app">
    <div v-if="$auth.ready()">
      <info-header class="info-header" v-if="$auth.check()"/>
      <page-header class="page-header"/>
      <progress-bar v-if="$route.name === 'generate'"/>
      <main class="main-section">
        <b-container>
          <router-view/>
        </b-container>
      </main>
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
  "primary": #1650AC,
  "secondary": #182E51,
  "success": #40A132
);

body {
  background-color: #1650AC;
}
.main-section {
  color: #FFF;
}
.main-view {
  margin-top: 1em;
}
</style>
