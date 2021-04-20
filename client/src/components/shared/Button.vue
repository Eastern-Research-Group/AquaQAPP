<template>
  <button :type="submit ? 'submit' : 'button'" :class="'button ' + getClass()" :disabled="isBusy">
    <span v-if="icon" :class="'fa fa-' + icon"></span>
    {{ label }}
    <slot />
    <LoadingIndicator v-if="isBusy" class="light" />
  </button>
</template>

<script>
import LoadingIndicator from './LoadingIndicator';

export default {
  components: { LoadingIndicator },
  name: 'Button',
  props: {
    label: {
      type: String,
    },
    type: {
      type: String,
      required: false,
    },
    shouldShowIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    submit: {
      type: Boolean,
      required: false,
      default: false,
    },
    isBusy: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClass() {
      if (this.type === 'cancel') {
        return 'has-background-grey-light';
      }
      return `is-${this.type}`;
    },
  },
};
</script>
