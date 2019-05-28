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

label {
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 10px !important;
  background-color: $darkBlue !important;
  color: white !important;
}

.is-checkradio[type='checkbox'].is-block:hover:not([disabled]) + label {
  background-color: $lightBlue !important;
}

.is-checkradio[type='checkbox'].is-info.is-block:checked + label {
  background-color: $green !important;
}

.is-checkradio[type='checkbox'] + label {
  margin: 0 !important;
}
</style>
