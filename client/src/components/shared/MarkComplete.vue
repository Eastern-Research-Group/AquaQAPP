<template>
  <div class="field is-pulled-right switch-container">
    <label for="markComplete" class="switch-label">Mark as Complete</label>
    <label :class="`switch ${disabled ? 'disabled' : ''}`">
      <input
        id="markComplete"
        type="checkbox"
        @change="$emit('markComplete')"
        :checked="complete"
        :disabled="disabled"
      />
      <span
        class="slider is-success"
        :title="disabled ? 'You must complete all required fields before marking complete.' : ''"
      ></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MarkComplete',
  props: {
    markComplete: {
      type: Function,
      required: false,
    },
    complete: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.switch-container {
  margin-bottom: 0;
  margin-top: calc(1.125em - 12px);
}

.switch-label {
  font-size: 0.8em;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 0.5em;

  &.disabled .slider {
    cursor: not-allowed;
  }

  input {
    // hide default html checkbox
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: $darkBlue;

      &:before {
        background-color: $green;
      }
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #ccc;
    }

    &:checked + .slider:before {
      transform: translateX(20px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 4px;

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 26px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.4s;
      border-radius: 4px;
    }
  }
}
</style>
