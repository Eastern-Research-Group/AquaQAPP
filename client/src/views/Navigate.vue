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
            <span class="step-number" v-if="false">{{ section.outlineNumber }}</span>
            {{ section.outlineLabel }}
            <span class="fa fa-check has-text-success" v-if="markedComplete.indexOf(section.outlineNumber) > -1"></span>
          </button>
        </li>
      </ul>
    </aside>
    <section class="right column is-three-quarters">
      <form @submit.prevent>
        <Button
          :label="hasSaved ? 'Saved' : 'Save'"
          type="primary"
          class="aq-save-btn is-pulled-right"
          :disabled="hasSaved"
          @click.native="saveData"
        />
        <MarkComplete
          @markComplete="markComplete(currentOutlineNum)"
          :complete="markedComplete.indexOf(currentOutlineNum) > -1"
        />
        <div
          class="field"
          v-for="question in currentQuestions.filter((q) => q.outline.outlineLabel !== 'Monitoring Locations')"
          :key="question.id"
        >
          <div class="field" v-if="question.questionLabel === 'Water Quality Concerns'">
            <Concerns />
          </div>
          <div class="field parameters" v-if="question.questionLabel === 'Pollutants'">
            <Parameters />
          </div>
          <div v-else>
            <label class="label is-size-4">{{ question.questionLabel }}</label>
            <p class="has-text-weight-bold" v-if="question.dataEntryInstructions">Instructions:</p>
            <div
              class="instructions"
              v-if="question.dataEntryInstructions"
              v-html="question.dataEntryInstructions"
            ></div>
            <input
              v-if="question.dataEntryType === 'text'"
              :value="qappData[question.id]"
              class="input"
              type="text"
              :placeholder="`Enter ${question.questionLabel}`"
              @input="updateQappData($event, question.id)"
            />
            <textarea
              v-if="question.dataEntryType === 'largeText'"
              :value="qappData[question.id]"
              class="input"
              :placeholder="`Enter ${question.questionLabel}`"
              @input="updateQappData($event, question.id)"
            ></textarea>
            <div class="btn-container has-text-right">
              <Button
                class="example"
                label="Example(s)"
                type="dark"
                v-if="question.hasExamples"
                @click.native="toggleShouldShowExample"
              />
            </div>
            <ExampleModal v-if="shouldShowExample" :handleClose="toggleShouldShowExample">
              <Tabs
                :tabs="[{ id: 'example1', name: 'Example 1', isActive: true }, { id: 'example2', name: 'Example 2' }]"
              >
                <template v-slot:example1>
                  <p id="example1" class="has-text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </p>
                </template>
                <template v-slot:example2>
                  <p id="example2" class="has-text-black">
                    Eget felis eget nunc lobortis mattis aliquam faucibus purus. Consectetur adipiscing elit
                    pellentesque habitant morbi tristique senectus et netus. Ut aliquam purus sit amet. Bibendum enim
                    facilisis gravida neque. Duis at consectetur lorem donec massa sapien. Duis ultricies lacus sed
                    turpis tincidunt. Vitae turpis massa sed elementum tempus egestas sed sed. Amet risus nullam eget
                    felis eget.
                  </p>
                </template>
              </Tabs>
              <div class="has-text-right">
                <Button class="addExample" label="Add Example" type="success" @click.native="addExample(question.id)" />
              </div>
            </ExampleModal>
            <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
          </div>
        </div>
        <div class="field" v-if="isLocationSectionSelected()">
          <Locations :questions="currentQuestions" @updateQappData="updateQappData" @saveData="saveData" />
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
import MarkComplete from '@/components/shared/MarkComplete';
import Concerns from '@/components/app/Concerns';
import Parameters from '@/components/app/Parameters';

export default {
  components: { Locations, Tip, Button, ExampleModal, Tabs, MarkComplete, Concerns, Parameters },
  data() {
    return {
      currentOutlineNum: '1',
      shouldDisplayMap: false,
      shouldShowExample: false,
      hasSaved: false,
      qappData: {},
      markedComplete: [],
    };
  },
  computed: {
    ...mapState('structure', ['sections', 'questions']),
    currentQuestions() {
      if (this.shouldDisplayMap) return [];
      return this.questions
        .filter((q) => q.outlineNumber === this.currentOutlineNum)
        .sort((a, b) => {
          if (a.outlineQuestionSort < b.outlineQuestionSort) {
            return -1;
          }
          if (a.outlineQuestionSort > b.outlineQuestionSort) {
            return 1;
          }
          return 0;
        });
    },
  },
  async mounted() {
    // If coming directly to this URL, need to fetch the current QAPP data
    if (this.$route.params.id !== this.$store.state.qapp.id) {
      await this.$store.dispatch('qapp/get', this.$route.params.id);
    }
    /* Once QAPP is fetched, set this component's qappData to the saved database values,
       so existing field entries are pre-filled from the database */
    this.qappData = this.$store.getters['qapp/qappData'];
    // Fetch structure data from DB to generate sections and questions on the fly
    this.getSections();
    this.getQuestions();
  },
  methods: {
    ...mapActions('structure', ['getSections', 'getQuestions']),
    changeSection(outlineNumber) {
      this.shouldDisplayMap = false;
      this.hasSaved = false;
      this.currentOutlineNum = outlineNumber;
    },
    toggleShouldShowExample() {
      this.shouldShowExample = !this.shouldShowExample;
    },
    addExample(qId) {
      this.qappData[qId] = this.qappData[qId] || ''; // if undefined, set as empty string
      try {
        if (document.querySelector('#example1')) {
          this.qappData[qId] += ` ${document.querySelector('#example1').innerText}`;
        } else {
          this.qappData[qId] += ` ${document.querySelector('#example2').innerText}`;
        }
      } catch (e) {
        console.log('Exception: ', e);
      }
      this.shouldShowExample = !this.shouldShowExample;
    },
    isLocationSectionSelected() {
      const currentSection = this.sections.find((s) => s.outlineNumber === this.currentOutlineNum);
      if (currentSection) {
        return currentSection.outlineLabel === 'Monitoring Locations';
      }
      return false;
    },
    updateQappData(e, questionId) {
      this.hasSaved = false;
      this.qappData[questionId] = e.target.value;
    },
    markComplete(outlineNumber) {
      this.markedComplete.push(outlineNumber);
      this.saveData();
    },
    saveData(e, valueId = null, data) {
      // TODO: do not save if user has not changed any locations data
      this.currentQuestions.forEach((q) => {
        this.$store.dispatch('qapp/save', {
          qappId: this.$store.state.qapp.id,
          questionId: q.id,
          value: data ? data[q.id] : this.qappData[q.id],
          valueId,
        });
      });
      this.hasSaved = true;
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
  padding-left: 3em;
}

.btn-container {
  margin-bottom: 1em;
}

.aq-save-btn {
  margin-left: 2em;
}

.fa-check {
  font-size: 1.2em;
  margin-left: 0.5em;
}

.parameters {
  display: inline-flex !important;
}
</style>
