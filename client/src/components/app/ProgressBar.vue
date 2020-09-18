<template>
  <section class="progress-bar">
    <div class="container has-text-white progress-flex" style="justify-content: space-between;">
      <div class="i-block" v-if="title">QAPP Title: {{ title }}</div>
      <div class="progress-flex">
        <div class="i-block">Project Progress: {{ progress }}%</div>
        <progress class="progress is-success i-block padding-x-1" :value="progress" max="100">{{ progress }}%</progress>
        <div class="i-block padding-x-1">
          <Button
            label="Generate QAPP"
            type="success"
            v-if="$route.name === 'navigate'"
            @click.native="generateQapp"
            :disabled="completedSections.length !== sections.length"
            :title="getGenerateBtnHoverTxt()"
          >
            <LoadingIndicator v-if="isGenerating" class="light i-block"
          /></Button>
        </div>
        <Alert v-if="generateError" type="error">
          Generation of QAPP failed, please try again
          <button @click="$store.dispatch('qapp/updateGenerateError', false)" class="close-alert">
            x
          </button>
        </Alert>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Button from '@/components/shared/Button';
import LoadingIndicator from '@/components/shared/LoadingIndicator';
import Alert from '@/components/shared/Alert';

export default {
  components: { Button, LoadingIndicator, Alert },
  computed: {
    ...mapGetters('qapp', ['progress', 'title']),
    ...mapState('qapp', ['completedSections', 'isGenerating', 'generateError']),
    ...mapState('structure', ['sections']),
  },
  methods: {
    ...mapActions('qapp', ['generate']),
    getGenerateBtnHoverTxt() {
      if (this.completedSections.length !== this.sections.length)
        return 'All sections must be marked complete before generating document.';
      return null;
    },
    async generateQapp() {
      await this.generate();
      if (!this.generateError) {
        this.showFile(this.$store.state.qapp.doc);
      }
    },
    showFile(blob) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (
        window.navigator.userAgent.indexOf('Firefox') === -1 &&
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
      ) {
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

<style scoped lang="scss">
.progress-flex:nth-of-type(2) > div {
  margin: 0 0.5rem;
}
.progress-flex {
  display: flex;
  align-items: center;
}

.i-block {
  display: inline-block;
}
.progress-bar {
  position: absolute;
  top: 0;
  width: 100%;
  margin-left: -1.5rem;
  background-color: #182e51;
  padding: 0.5em;
  font-size: 0.9em;
}
.progress {
  margin: 0 0 0 0 !important;
  width: 10em;
}

.message.is-danger {
  background-color: #f9dede;
  position: absolute;
  top: 100%;
  z-index: 1;
  right: 0;
}

.close-alert {
  outline: none;
  border: none;
  background: none;
  font-size: 1em;
  font-weight: bold;
  opacity: 0.5;
  color: rgb(205, 9, 48);
  padding-left: 3em;
  cursor: pointer;
}

.close-alert:hover {
  opacity: 1;
}
</style>
