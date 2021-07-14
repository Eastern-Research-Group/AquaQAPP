<template>
  <div class="column is-one-third">
    <input
      class="is-checkradio is-block is-info"
      :id="id"
      :type="isSingleSelect ? 'radio' : 'checkbox'"
      :name="isSingleSelect ? singleSelectId : name"
      @change="$emit('check', $event)"
      :value="value"
      :checked="checked"
      :disabled="disabled"
    />
    <label :for="id" :title="title">{{ name }}<slot></slot></label>
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
      required: false,
    },
    isSingleSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    singleSelectId: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.column {
  min-height: 90px;
  display: flex;

  & > .is-checkradio.is-block + label {
    font-size: 18px;
    min-height: 90px;
    background-color: $darkBlue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: white;
    text-align: center;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: darken($darkBlue, 5);
    }
  }

  & > .is-checkradio.is-block[type='radio'] + label {
    &::before,
    &::after {
      top: 0.2em;
      left: 0.2em;
    }
  }

  & > .is-checkradio.is-info.is-block:checked + label {
    background-color: $greenContrast;

    &:hover {
      background-color: darken($green, 5);
    }
  }

  & > .is-checkradio + label {
    margin: 0;
  }
}
</style>
