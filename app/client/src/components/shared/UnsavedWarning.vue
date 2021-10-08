<template>
  <Modal @close="$emit('onClose')">
    <Alert message="You have unsaved changes. Please save or discard before continuing." type="warning" />
    <div class="btn-container">
      <Button label="Save Changes" type="success" @click.native="$emit('onSave')" />
      <Button label="Discard Changes" type="danger" @click.native="$emit('onDiscard')" />
    </div>
  </Modal>
</template>

<script>
import Alert from './Alert';
import Button from './Button';
import Modal from './Modal';

export default {
  components: { Alert, Button, Modal },
};
</script>

<style scoped>
.btn-container .button {
  margin-right: 1em;
}
</style>
