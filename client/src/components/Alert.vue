<template>
  <div class="notification has-text-centered">
    <span class="fa fa-exclamation-circle is-size-5"></span>
    <span class="has-text-danger" v-for="line in message.split('\n')">
      {{ line }}<br>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.notification {
  margin-bottom: 0.75em;
}
.svg-inline--fa {
  color: hsl(0, 0%, 4%);
}
</style>
