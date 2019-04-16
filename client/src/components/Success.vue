<template>
  <div class="column is-12 container notification is-success">
    <div class="columns">
      <div class="column is-2 icon-container">
        <span class="fas fa-check-circle is-size-4"></span>
      </div>
      <div class="column is-10">
        <span class="is-size-5" v-for="line in message.split('\n')"> {{ line }}<br /> </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.icon-container {
  background-color: #0b2e13;
  border-radius: 3px 0 0 3px;
  padding: 15px 0 0 22px;
}
</style>
