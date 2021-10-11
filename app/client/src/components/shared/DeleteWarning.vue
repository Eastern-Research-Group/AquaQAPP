<template>
  <Modal @close="$emit('close')">
    <Alert :message="alertLabel" type="warning" />
    <div class="field is-grouped">
      <div class="control">
        <Button
          :label="`Delete ${itemLabel}`"
          type="danger"
          icon="trash-alt"
          @click.native="$emit('onDelete')"
          :disabled="disabled"
        />
      </div>
    </div>
  </Modal>
</template>

<script>
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Delete Data',
    },
    itemLabel: {
      type: String,
      required: false,
      default: 'this item',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  components: { Alert, Button, Modal },
  computed: {
    alertLabel() {
      return this.message || `Are you sure you want to delete ${this.itemLabel}?`; /* eslint-disable-line */
    },
  },
};
</script>
