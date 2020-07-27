<template>
  <section class="progress-bar">
    <div class="container has-text-white progress-flex" style="justify-content: space-between;">
      <div class="i-block" v-if="title">
        {{ title }}
      </div>
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
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Button from '@/components/shared/Button';
import LoadingIndicator from '@/components/shared/LoadingIndicator';

export default {
  components: { Button, LoadingIndicator },
  computed: {
    ...mapGetters('qapp', ['progress', 'title']),
    ...mapState('qapp', ['completedSections', 'isGenerating']),
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
      this.showFile(this.$store.state.qapp.doc);
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
</style>
