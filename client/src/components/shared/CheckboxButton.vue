<template>
  <div class="column is-one-third">
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

.column {
  min-height: 90px;
  display: flex;

  & > .is-checkradio[type='checkbox'].is-block + label {
    min-height: 90px;
    background-color: $darkBlue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    color: white;
    text-align: center;

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
