<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-content">
      <span class="title is-size-4">{{ title }}</span>
      <button class="button is-text has-text-white is-pulled-right" @click="handleClose">
        <span class="fa fa-times"></span>
      </button>
      <hr />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
    handleShown: {
      type: Function,
      required: false,
      default: () => {},
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  mounted() {
    this.handleShown();
  },
};
</script>

<style scoped>
#modalPrevent {
  transition: none !important;
}
</style>

<style>
.modal {
  z-index: 60;
}

.modal-content {
  position: fixed;
  padding: 1em;
  width: 25em;
  right: 0;
  top: 0;
  border-radius: 0;
  max-height: 100%;
  height: 100%;
  background-color: #162a49;
  color: white !important;
}

.close {
  color: white !important;
}

.button.is-text:hover {
  background: none;
}
</style>
