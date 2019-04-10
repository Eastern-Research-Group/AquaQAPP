<template>
  <div class="column is-12 container">
    <div class="columns">
      <div class="column is-2 icon-container">
        <span class="fa fa-exclamation-circle is-size-4"></span>
      </div>
      <div class="column is-10 message">
        <span class="has-text-danger is-size-7" v-for="line in message.split('\n')"> {{ line }}<br /> </span>
      </div>
    </div>
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
.svg-inline--fa {
  color: hsl(0, 0%, 4%);
}

.container {
  margin-bottom: 0.75em;
}

section {
  border-radius: 40px !important;
}

.icon-container {
  background-color: red;
  padding: 15px 20px 20px 20px;
}

.message {
  background-color: #f5f5f5;
  border-radius: initial;
}
</style>
