<template>
  <button :type="getType()" v-if="!preventEvent" :class="'button ' + getClass()" @click="onClick">
    <span v-if="shouldShowIcon" :class="'fa is-size-3 ' + getIcon()"></span>
    {{ label }}
  </button>
  <button v-else-if="preventEvent" :class="'button ' + getClass()" @click.prevent="onClick">
    <span v-if="shouldShowIcon" :class="'fa is-size-3 ' + getIcon()"></span>
    {{ label }}
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
    preventEvent: {
      type: Boolean,
      required: false,
      default: false,
    },
    attr: {
      type: String,
      required: true,
      default: 'button',
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
    getType() {
      switch (this.attr) {
        case 'submit':
          return 'submit';
        case 'button':
          return 'button';
      }
    },
    getClass() {
      switch (this.type) {
        case 'danger':
          return 'is-danger';
        case 'success':
          return 'is-success';
        case 'primary':
          return 'is-primary';
        case 'cancel':
          return 'has-background-grey-light';
        case 'info':
          return 'is-info';
        case 'dark-blue':
          return 'dark-blue';
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
  },
};
</script>

<style scoped lang="scss">
.svg-inline--fa {
  height: 0.5em;
  margin: 0;
  width: 0.6em;
}

.dark-blue {
  background-color: #162a49;
  border-color: #162a49;
  color: white;
}
</style>
