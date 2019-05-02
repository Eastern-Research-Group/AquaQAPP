<template>
  <div class="switch-button-control">
    <div class="switch-button-label">
      <slot></slot>
    </div>
    <div
      class="switch-button is-pulled-right"
      :class="{ enabled: isEnabled }"
      @click="toggle"
      :style="{ '--color': color }"
    >
      <div class="button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarkComplete',
  props: {
    isEnabled: Boolean,
    color: {
      type: String,
      required: false,
      default: '#4D4D4D',
    },
    handleToggle: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.handleToggle();
    },
  },
};
</script>

<style scoped lang="scss">
.switch-button-control {
  display: block;
  flex-direction: row;
  align-items: center;

  .switch-button {
    $switch-button-height: 1.6em;
    $switch-button-color: var(--color);
    $switch-button-border-thickness: 1px;
    $switch-transition: all 0.3s ease-in-out;
    $switch-is-rounded: true;

    height: $switch-button-height;
    width: calc(#{$switch-button-height} * 2);
    border: $switch-button-border-thickness solid white;
    box-shadow: inset 0px 0px $switch-button-border-thickness 0px rgba(0, 0, 0, 0.33);
    border-radius: if($switch-is-rounded, 5px, 0);

    transition: $switch-transition;

    $button-side-length: calc(#{$switch-button-height} - (2 * #{$switch-button-border-thickness}));

    cursor: pointer;

    .button {
      height: $button-side-length;
      width: $button-side-length;
      border: $switch-button-border-thickness solid white;
      border-radius: if($switch-is-rounded, 5px, 0);
      background: $switch-button-color;

      transition: $switch-transition;
    }

    &.enabled {
      background-color: #182e51;
      box-shadow: none;

      .button {
        background: #3aa02b;
        transform: translateX(calc(#{$button-side-length} + (2 *#{$switch-button-border-thickness})));
      }
    }
  }
  .switch-button-label {
    font-size: 13px;
  }
}
</style>