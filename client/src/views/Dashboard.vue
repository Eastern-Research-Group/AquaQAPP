<template>
    <div class="main-view">
        <h2>Dashboard</h2>
        <b-table striped hover :items="qapps" />
    </div>
</template>

<script>
export default {
  async mounted() {
    // todo: update the table headers and do not display all columns
    const response = await this.$http.get('api/qapps');
    this.qapps = response.data;
  },
  data() {
    return {
      qapps: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  background-color: #FFF;
}
</style>
