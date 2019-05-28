<template>
  <div class="tile">
    <input class="is-checkradio is-block is-info" :id="id" type="checkbox" :name="name" />
    <label :id="id" :for="id">{{ name }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxButton',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.tile {
  & > .is-checkradio[type='checkbox'].is-block:not([disabled]) + label {
    background-color: $darkBlue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: white;
    text-align: center;
  }

  & > .is-checkradio[type='checkbox'].is-block:not([disabled]) + label {
    background-color: $darkBlue;
    color: white;

    &:hover {
      background-color: darken($darkBlue, 5);
    }
  }

  & > .is-checkradio[type='checkbox'].is-info.is-block:checked + label {
    background-color: $green;

    &:hover {
      background-color: darken($green, 5);
    }
  }

  & > .is-checkradio[type='checkbox'] + label {
    margin: 0;
  }
}
</style>
