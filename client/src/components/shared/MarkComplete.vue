<template>
  <div class="field is-pulled-right">
    <label for="markComplete" class="switch-label">Mark as Complete</label>
    <label class="switch is-pulled-right">
      <input id="markComplete" type="checkbox" />
      <span class="slider is-success"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MarkComplete',
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.switch-label {
  display: block;
  font-size: 0.8em;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

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
      box-shadow: 0 0 1px $lightBlue;
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
    background-color: $lightBlue;
    transition: .4s;
    border-radius: 4px;

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 26px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 4px;
    }
  }
}
</style>
