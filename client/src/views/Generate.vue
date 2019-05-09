<template>
  <div>
    <Button label="Generate" type="success" @click.native="generateQapp" />
  </div>
</template>

<script>
import Button from '@/components/shared/Button';

export default {
  name: 'Generate',
  components: { Button },
  methods: {
    generateQapp() {
      this.$store.dispatch('qapp/generate');
    },
  },
};
</script>

<style scoped></style>
