<template>
  <b-modal id="modalPrevent" ref="modal" :title="title" @ok="handleOk" @shown="handleShown">
    <slot />
  </b-modal>
</template>

<script>
export default {
  name: 'SideNav',
  props: {
    handleOk: {
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
    }
  },
};
</script>

<style scoped>
#modalPrevent {
  transition: none !important;
}
</style>

<style>
.modal-dialog {
  position: fixed;
}

.modal-content {
  position: fixed;
  width: 25em;
  right: 0;
  top: 0;
  border-radius: 0;
  height: 100%;
  background-color: #162a49;
  color: white !important;
}

.close {
  color: white !important;
}
</style>
