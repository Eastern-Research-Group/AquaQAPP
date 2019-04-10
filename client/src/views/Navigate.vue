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
            @click="currentOutlineNum = section.outlineNumber"
          >
            <span class="step-number">{{ section.outlineNumber }}</span>
            {{ section.outlineLabel }}
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
          <div class="column is-3 is-offset-10">
            <button v-if="question.hasExamples.trim() === 'Y'" class="button has-text-white is-medium example">
              Example(s)
            </button>
          </div>
          <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Tip from '@/components/Tip';

export default {
  components: { Tip },
  data() {
    return {
      currentOutlineNum: '1.1',
    };
  },
  computed: {
    ...mapState('structure', ['sections', 'questions']),
    currentQuestions() {
      return this.questions.filter((q) => q.outlineNumber === this.currentOutlineNum);
    },
  },
  mounted() {
    this.getSections();
    this.getQuestions();
  },
  methods: {
    ...mapActions('structure', ['getSections', 'getQuestions']),
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

p {
  display: inline;
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

.example {
  background-color: #162a49;
  border-color: #162a49;
}

.right {
  margin-left: 3%;
}
</style>
