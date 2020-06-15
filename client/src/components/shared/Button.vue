<template>
  <button :type="submit ? 'submit' : 'button'" :class="'button ' + getClass()">
    <span v-if="icon" :class="'fa fa-' + icon"></span>
    {{ label }}
    <slot />
  </button>
</template>

<script>
export default {
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
