<template>
  <div class="loading">
    <div class="spinner"></div>
    <div v-if="message">{{ message }}</div>
    <div v-else class="is-sr-only">Loading...</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../static/variables';

.loading {
  text-align: center !important;
  line-height: 1;

  .spinner {
    display: inline-block;
    margin-left: 10px;
    border: 13px solid $gray;
    border-top: 13px solid $lightBlue;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
  }

  &.dark .spinner {
    border: 4px solid $darkBlue;
    border-top: 4px solid $lightBlue;
  }

  &.light .spinner {
    border: 4px solid #fff;
    border-top: 4px solid $lightBlue;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
