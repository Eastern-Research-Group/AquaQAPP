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
    <section class="column is-three-quarters">
      <form>
        <div class="field" v-for="question in currentQuestions" :key="question.id">
          <label class="label">{{ question.questionLabel }}</label>
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
          <div v-if="question.dataEntryTip" v-html="question.dataEntryTip" class="notification is-primary"></div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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

textarea {
  resize: vertical;
  height: 4em;
}
</style>
