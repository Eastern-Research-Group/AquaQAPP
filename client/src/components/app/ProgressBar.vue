<template>
  <section class="progress-bar">
    <div class="container has-text-white">
      <progress class="progress is-success is-pulled-right" :value="progress" max="100">{{ progress }}%</progress>
      <span class="is-pulled-right">Project Progress: {{ progress }}%</span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('qapp', ['progress']),
  },
};
</script>

<style>
.progress-bar {
  background-color: #182e51;
  padding: 0.5em;
  font-size: 0.9em;
}
.progress {
  margin: 0.2em 0 0 0.5em !important;
  width: 10em;
}
</style>
