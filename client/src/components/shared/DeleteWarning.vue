<template>
  <SideNav :handleClose="() => $emit('close')" :title="title">
    <template #default="props">
      <Alert :message="`Are you sure you want to delete ${itemLabel}?`" type="warning" />
      <hr />
      <div class="field is-grouped">
        <div class="control">
          <Button label="Delete" type="info" :preventEvent="true" @click.native="$emit('onDelete')" />
        </div>
        <div class="control">
          <Button label="Cancel" type="cancel" @click.native="props.close" />
        </div>
      </div>
    </template>
  </SideNav>
</template>

<script>
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';

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
  },
  components: { Alert, Button, SideNav },
};
</script>
