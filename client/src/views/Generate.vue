<template>
  <div class="content">
    <Alert v-if="completedSections.length !== sections.length" type="warning">
      <p>All QAPP sections must be marked complete before generating.</p>
      <p>Please complete the following sections to continue:</p>
      <ul>
        <li v-for="section in incompleteSections" :key="section.id">
          {{ section.sectionLabel }}
        </li>
      </ul>
    </Alert>
    <Button
      label="Generate QAPP"
      type="success"
      @click.native="generateQapp"
      :disabled="completedSections.length !== sections.length"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';

export default {
  name: 'Generate',
  components: { Alert, Button },
  mounted() {
    // Fetch latest qapp data
    this.$store.dispatch('qapp/get', this.$route.params.id);
  },
  computed: {
    ...mapState('qapp', ['completedSections']),
    ...mapState('structure', ['sections']),
    incompleteSections() {
      return this.sections.filter((v) => this.completedSections.indexOf(v.id) === -1);
    },
  },
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
      setTimeout(function firefoxDelay() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: inline-block;

  ul {
    margin-top: 0.3em;
  }
}
</style>
