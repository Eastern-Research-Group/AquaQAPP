<template>
  <div class="columns">
    <aside class="menu column is-one-quarter">
      <ul class="menu-list">
        <li v-for="section in sections" :key="section.id">
          <button
            :class="
              `button is-text has-text-white ${
                currentOutlineNum === section.outlineNumber ? 'has-text-weight-bold' : ''
              }`
            "
            @click="changeSection(section.outlineNumber)"
          >
            <span class="step-number">{{ section.outlineNumber }}</span>
            {{ section.outlineLabel }}
          </button>
        </li>
        <li>
          <button
            :class="`button is-text has-text-white ${shouldDisplayMap ? 'has-text-weight-bold' : ''}`"
            @click="shouldDisplayMap = true"
          >
            <span class="step-number">3</span>
            Locations
          </button>
        </li>
      </ul>
    </aside>
    <section class="right column is-three-quarters">
      <form>
        <div class="field" v-for="question in currentQuestions" :key="question.id">
          <label class="label is-size-4">{{ question.questionLabel }}</label>
          <p class="has-text-weight-bold" v-if="question.dataEntryInstructions">Instructions:</p>
          <div class="instructions" v-if="question.dataEntryInstructions" v-html="question.dataEntryInstructions"></div>
          <input
            v-if="question.dataEntryType === 'text'"
            class="input"
            type="text"
            :placeholder="`Enter ${question.questionLabel}`"
          />
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            class="input"
            :placeholder="`Enter ${question.questionLabel}`"
          ></textarea>
          <div class="btn-container has-text-right">
            <Button class="example" label="Example(s)" type="dark" v-if="question.hasExamples" @click="showExample" />
          </div>
          <ExampleModal v-if="shouldShowExample" :handleClose="() => (this.shouldShowExample = false)">
            <Tabs
              :tabs="[{ id: 'example1', name: 'Example 1', isActive: true }, { id: 'example2', name: 'Example 2' }]"
            >
              <template v-slot:example1>
                <p class="has-text-black">
                  Example 1
                </p>
              </template>
              <template v-slot:example2>
                <p class="has-text-black">
                  Example 2
                </p>
              </template>
            </Tabs>
            <div class="has-text-right">
              <Button class="addExample" label="Add Example" type="success" />
            </div>
          </ExampleModal>
          <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
        </div>
        <div class="field" v-if="shouldDisplayMap">
          <Locations />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Tip from '@/components/shared/Tip';
import Locations from '@/components/app/Locations/Locations';
import Button from '@/components/shared/Button';
import ExampleModal from '@/components/shared/ExampleModal';
import Tabs from '@/components/shared/Tabs';

export default {
  components: { Locations, Tip, Button, ExampleModal, Tabs },
  data() {
    return {
      currentOutlineNum: '1.1',
      shouldDisplayMap: false,
      shouldShowExample: false,
    };
  },
  computed: {
    ...mapState('structure', ['sections', 'questions']),
    currentQuestions() {
      if (this.shouldDisplayMap) return [];
      return this.questions.filter((q) => q.outlineNumber === this.currentOutlineNum);
    },
  },
  mounted() {
    this.getSections();
    this.getQuestions();
  },
  methods: {
    ...mapActions('structure', ['getSections', 'getQuestions']),
    changeSection(outlineNumber) {
      this.shouldDisplayMap = false;
      this.currentOutlineNum = outlineNumber;
    },
    showExample() {
      this.shouldShowExample = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  border-right: 1px solid #00b0e6;
}

.step-number {
  display: inline-block;
  width: 2em;
}

.button.is-text {
  text-decoration: none;

  &:active,
  &:focus {
    background: none;
  }
}

.notification {
  margin-top: 1em;
}

.instructions {
  display: inline;
}

textarea {
  resize: vertical;
  height: 8em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.right {
  margin-left: 3%;
}

.btn-container {
  margin-bottom: 1em;
}
</style>
