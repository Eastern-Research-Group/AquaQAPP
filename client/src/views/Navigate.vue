<template>
  <div class="columns">
    <aside class="menu column is-one-quarter">
      <ul class="menu-list">
        <li v-for="section in sections" :key="section.id">
          <button
            :class="
              `button is-text has-text-white ${
                currentSection.sectionNumber === section.sectionNumber ? 'has-text-weight-bold' : ''
              }`
            "
            @click="changeSection(section)"
          >
            <span class="step-number" v-if="false">{{ section.sectionNumber }}</span>
            {{ section.sectionLabel }}
            <span v-if="completedSections.indexOf(section.id) > -1">
              <span class="fa fa-check has-text-success"></span>
            </span>
          </button>
        </li>
      </ul>
    </aside>
    <section class="right column is-three-quarters">
      <Alert
        v-if="isSectionNotAvailable()"
        :message="`You must complete the Water Quality Concerns section before completing this section`"
        type="error"
      />
      <form v-else @submit.prevent>
        <Button
          :label="hasSaved ? 'Saved' : 'Save'"
          type="primary"
          class="aq-save-btn is-pulled-right"
          :disabled="hasSaved || checkRequiredFields()"
          :title="getSaveBtnHoverText()"
          @click.native="saveData"
        />
        <MarkComplete
          @markComplete="markComplete(currentSection.sectionNumber)"
          :complete="currentSection.id && completedSections.indexOf(currentSection.id) > -1"
          :disabled="checkRequiredFields()"
        />
        <div
          class="field"
          v-for="question in currentQuestions.filter((q) => q.section.sectionLabel !== 'Monitoring Locations')"
          :key="question.id"
        >
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
              required
              :placeholder="`Enter ${question.questionLabel}`"
              @input="updateQappData($event, question)"
            />
            <textarea
              v-if="question.dataEntryType === 'largeText'"
              :value="qappData[question.id]"
              class="input"
              required
              :placeholder="`Enter ${question.questionLabel}`"
              @input="updateQappData($event, question)"
            ></textarea>
            <div v-if="question.dataEntryType === 'checkboxBtn'" class="columns is-multiline">
              <CheckboxButton
                v-for="option in getOptions(question.refName)"
                :key="option.id"
                :id="option.code"
                :name="option.label"
                :isSingleSelect="question.refName === 'yesNo'"
                :singleSelectId="question.questionLabel"
                :value="option.code"
                :checked="!!(qappData[question.id] && qappData[question.id].indexOf(option.code) > -1)"
                @check="updateQappData($event, question)"
              />
            </div>
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
        <div class="field" v-if="currentSection.sectionLabel === 'Monitoring Locations'">
          <Locations
            :questions="currentQuestions"
            @updateQappData="updateQappData"
            @saveData="saveData"
            @refreshData="refreshQappData"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Alert from '@/components/shared/Alert';
import Tip from '@/components/shared/Tip';
import Locations from '@/components/app/Locations/Locations';
import Button from '@/components/shared/Button';
import ExampleModal from '@/components/shared/ExampleModal';
import Tabs from '@/components/shared/Tabs';
import MarkComplete from '@/components/shared/MarkComplete';
import Parameters from '@/components/app/Parameters';
import CheckboxButton from '@/components/shared/CheckboxButton';

export default {
  components: { Alert, Locations, Tip, Button, ExampleModal, Tabs, MarkComplete, Parameters, CheckboxButton },
  data() {
    return {
      currentSection: {},
      shouldShowExample: false,
      hasSaved: false,
      qappData: {},
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections']),
    ...mapState('structure', ['sections', 'questions']),
    ...mapState('ref', ['concerns']),
    currentQuestions() {
      return this.questions
        .filter((q) => q.sectionNumber === this.currentSection.sectionNumber)
        .sort((a, b) => {
          if (a.sectionQuestionSort < b.sectionQuestionSort) {
            return -1;
          }
          if (a.sectionQuestionSort > b.sectionQuestionSort) {
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
    this.getQuestions();
    await this.getSections();
    this.currentSection = this.sections ? this.sections[this.getFirstUncompletedSectionIndex()] : {};
    // Fetch lookup reference data
    this.$store.dispatch('ref/getData');
  },
  methods: {
    ...mapActions('structure', ['getSections', 'getQuestions']),
    changeSection(section) {
      this.hasSaved = false;
      // Locations are automatically saved upon adding or editing, so hasSaved will always be true
      if (section.sectionLabel === 'Monitoring Locations') this.hasSaved = true;
      this.currentSection = section;
    },
    getOptions(refName) {
      return this[refName];
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
    updateQappData(e, question) {
      this.hasSaved = false;
      if (question.refName && question.refName !== 'yesNo') {
        let dataArray = this.qappData[question.id] ? this.qappData[question.id].split(',') : [];
        if (dataArray.indexOf(e.target.value) > -1) {
          dataArray = dataArray.filter((val) => val !== e.target.value);
        } else {
          dataArray.push(e.target.value);
        }
        this.$set(this.qappData, question.id, dataArray.join(','));
      } else {
        this.$set(this.qappData, question.id, e.target.value);
      }
    },
    checkRequiredFields() {
      let hasEmptyFields = false;
      this.currentQuestions.forEach((q) => {
        if (
          !this.qappData[q.id] ||
          (this.qappData[q.id] && typeof this.qappData[q.id] === 'string' && !this.qappData[q.id].trim())
        ) {
          hasEmptyFields = true;
        }
      });
      return hasEmptyFields;
    },
    markComplete(sectionNumber) {
      const sectionId = this.sections.find((s) => s.sectionNumber === sectionNumber).id;
      if (this.completedSections.indexOf(sectionId) > -1) {
        this.$store.dispatch('qapp/deleteCompletedSection', sectionId);
      } else {
        this.$store.dispatch('qapp/addCompletedSection', sectionId);
        // Locations are automatically saved upon add/edit, so don't saveData on markComplete
        if (this.currentSection.sectionLabel !== 'Monitoring Locations') this.saveData();
      }
    },
    async saveData(e, valueId = null, data) {
      // TODO: do not save if user has not changed any locations data
      // Wait for all data to be saved before setting hasSaved and refreshing qappData
      await Promise.all(
        this.currentQuestions.map(async (q) => {
          await this.$store.dispatch('qapp/save', {
            qappId: this.$store.state.qapp.id,
            questionId: q.id,
            value: data ? data[q.id] : this.qappData[q.id],
            valueId,
          });
        })
      );
      this.hasSaved = true;

      // Refresh global qappData to update validation on mark complete/saving
      this.refreshQappData();
    },
    isSectionNotAvailable() {
      return (
        ['Monitoring Locations', 'Parameters'].indexOf(this.currentSection.sectionLabel) > -1 &&
        this.completedSections.indexOf(this.sections.find((s) => s.sectionLabel === 'Water Quality Concerns').id) === -1
      );
    },
    getSaveBtnHoverText() {
      if (this.currentSection.sectionLabel === 'Monitoring Locations') {
        return 'Location data are automatically saved upon adding, editing, or deleting.';
      }
      if (this.checkRequiredFields()) {
        return 'You must complete all required fields before saving.';
      }
      return null;
    },
    refreshQappData() {
      this.qappData = this.$store.getters['qapp/qappData'];
    },
    getFirstUncompletedSectionIndex() {
      /*
       * get the first section that is NOT completed.
       * If no sections are completed, return a section index of zero (0).
       * If the completedSections looks like: [1,2,5] (note: 1 based)
       *   then return 2 (as section 3, but section[2]) is the first section NOT completed
       * If the completedSections looks like: [2,4,5] (note: 1 based)
       *   then return 0 (as section 1, but section[0]) is the first section NOT completed
       * If all the sections are complete, then return the index of the last section
       */
      let firstSection = 0;
      this.completedSections.forEach((i) => {
        if (i !== firstSection && i === firstSection + 1) firstSection = i;
      });

      // all are complete, just use the last one
      if (firstSection === this.sections.length) firstSection -= 1;
      return firstSection;
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

.columns.is-multiline {
  margin-top: 0.5em;
}
</style>
