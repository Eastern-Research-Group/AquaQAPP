<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeExample"></div>
    <button class="button close-btn is-text has-text-grey is-pulled-right" @click="closeExample">
      <span class="fa fa-times"></span>
    </button>
    <div class="modal-content">
      <slot :close="closeExample" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleModal',
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
  },
  methods: {
    closeExample() {
      this.handleClose();
    },
  },
};
</script>

<style scoped lang="scss">
.svg-inline--fa {
  font-size: 22px;
}

.close-btn {
  position: absolute;
  right: 2%;
  top: 4%;
}

.close {
  color: white !important;
}

.modal {
  width: 750px;
  height: 350px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 999;
  position: absolute;
  color: black;
}

.modal-background {
  background-color: white;
}

.modal-content {
  max-height: 80%;
  height: 100%;
  width: 90%;
}

.modal-close {
  background-color: white !important;
  max-height: 80px !important;
  max-width: 80px !important;
}

.modal-close::before,
.delete::before,
.modal-close::after,
.delete::after {
  background-color: gray !important;
}

.modal-close::before,
.delete::before {
  height: 4px;
}

.modal-close::after,
.delete::after {
  width: 4px;
}
</style>
