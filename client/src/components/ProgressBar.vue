<template>
  <section class="progress-bar">
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col class="text-right">
          Project Progress: 0%
        </b-col>
      </b-row>
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
.progress-bar {
  background-color: #182E51;
  padding: 0.5em;
  font-size: 0.9em;
}
</style>
