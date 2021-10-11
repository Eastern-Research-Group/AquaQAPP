<template>
  <Button label="Save" type="link" :isBusy="isSaving" submit />
</template>

<script>
import { mapState } from 'vuex';
import Button from '@/components/shared/Button';

export default {
  components: { Button },
  computed: {
    ...mapState('qapp', ['isSaving']),
  },
};
</script>
