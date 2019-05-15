<template>
  <div>
    <Button label="Generate" type="success" @click.native="generateQapp" />
  </div>
</template>

<script>
import Button from '@/components/shared/Button';
import { mapActions } from 'vuex';

export default {
  name: 'Generate',
  components: { Button },
  methods: {
    ...mapActions('qapp', ['generate']),
    async generateQapp() {
      await this.generate();
      this.showFile(this.$store.state.qapp.doc);
    },
    showFile(blob) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'test.docx';
      link.click();
      setTimeout(function() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    },
  },
};
</script>

<style scoped></style>
