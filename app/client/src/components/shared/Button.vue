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

<style lang="scss" scoped>
@import '../../../static/variables';

.button {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.is-dark-gray {
  border-color: transparent;
  background-color: #363636;
  color: #fff;

  &:hover {
    background-color: lighten(#363636, 10);
  }
}

.is-primary {
  color: #363636;
}

.is-success {
  background-color: $greenContrast;
}

.is-text {
  box-shadow: none;
  color: #fff;

  &:hover {
    color: #fff;
    text-decoration: underline !important;
  }

  &:focus {
    background: none;
    color: #fff;
  }
}

.button .fa {
  margin-right: 0.5rem;
}
</style>
