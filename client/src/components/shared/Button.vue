<template>
  <button :class="'button ' + getClass()" @click="onClick">
    <span v-if="shouldShowIcon" :class="'fa is-size-3 ' + getIcon()"></span>
    {{label}}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'success',
    },
    shouldShowIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    onClick: {
      type: Function,
      required: false,
      default: () => {},
    }
  },
  methods: {
    getClass() {
      switch (this.type) {
        case 'danger':
          return 'is-danger';
        case 'success':
          return 'is-success';
        case 'primary':
          return 'is-primary';
      }
    },
    getIcon() {
      switch (this.icon) {
        case 'plus':
          return 'fa-plus';
        case 'edit':
          return 'fa-edit';
        case 'trash':
          return 'fa-trash-alt';
      }
    },
  }
};
</script>

<style scoped lang="scss">
.svg-inline--fa {
  height: 0.6em;
  margin-right: 0;
}
</style>