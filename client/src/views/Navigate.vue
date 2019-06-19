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
      <Alert v-if="isSectionNotAvailable()" :message="this.sectionNotAvailableMessage" type="error" />
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
          v-for="question in currentQuestions.filter(
            (q) => customSections.map((s) => s.label).indexOf(q.section.sectionLabel) === -1
          )"
          :key="question.id"
        >
          <div>
            <label class="label is-size-4">{{ question.questionLabel }}</label>
            <p class="has-text-weight-bold" v-if="question.dataEntryInstructions">Instructions:</p>
            <div
              class="instructions"
              v-if="question.dataEntryInstructions"
              v-html="question.dataEntryInstructions"
            ></div>
            <input
              v-if="question.dataEntryType === 'text'"
              class="input"
              type="text"
              required
              :placeholder="`Enter ${question.questionLabel}`"
              v-model="pendingData[question.id]"
              @input="hasSaved = false"
            />
            <textarea
              v-if="question.dataEntryType === 'largeText'"
              class="input"
              required
              :placeholder="`Enter ${question.questionLabel}`"
              v-model="pendingData[question.id]"
              @input="hasSaved = false"
            ></textarea>
            <HoverText
              v-if="question.refName === 'concerns' && locationConcerns.length"
              hoverId="concernsInfo"
              linkText="Why are some concerns disabled?"
            >
              There are monitoring locations associated with these concerns. You must delete these locations before the
              concerns can be removed.
            </HoverText>
            <div v-if="question.dataEntryType === 'checkboxBtn'" class="columns is-multiline">
              <CheckboxButton
                v-for="option in getOptions(question.refName)"
                :key="option.id"
                :id="option.code"
                :name="option.label"
                :isSingleSelect="question.refName === 'yesNo'"
                :singleSelectId="question.questionLabel"
                :value="option.code"
                :checked="!!(pendingData[question.id] && pendingData[question.id].indexOf(option.code) > -1)"
                :disabled="locationConcerns.indexOf(option.code) > -1"
                @check="updatePendingData($event, question)"
              />
            </div>
            <div class="btn-container has-text-right">
              <Button
                class="example"
                label="Example(s)"
                type="dark"
                v-if="question.examples.length"
                @click.native="() => (shouldShowExample = true)"
              />
            </div>
            <Modal v-if="shouldShowExample" @close="() => (shouldShowExample = false)">
              <Tabs
                v-if="question.examples.length > 1"
                :tabs="
                  question.examples.map((example, index) => ({
                    id: `example${index}`,
                    name: `Example ${index + 1}`,
                    isActive: index === 0,
                  }))
                "
              >
                <template v-for="(example, index) in question.examples" v-slot:[`example${index}`]>
                  <p :key="index" class="has-text-black example-text" ref="exampleText">
                    {{ example.text }}
                  </p>
                </template>
              </Tabs>
              <p v-else class="has-text-black example-text" ref="exampleText">
                {{ question.examples[0].text }}
              </p>
              <div class="has-text-right">
                <Button label="Add Example" type="success" @click.native="addExample(question.id)" />
              </div>
            </Modal>
            <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
          </div>
        </div>
        <div v-for="customSection in customSections" :key="customSection.component">
          <component
            v-if="customSection.label === currentSection.sectionLabel"
            :is="customSection.component"
            :questions="currentQuestions"
            @saveData="saveData"
          />
        </div>
      </form>
    </section>
    <Modal v-if="shouldDisplayUnsavedWarning" @close="() => (shouldDisplayUnsavedWarning = false)">
      <Alert message="You have unsaved changes. Please save or discard before continuing." type="warning" />
      <div class="btn-container">
        <Button label="Save Changes" type="success" @click.native="saveData" />
        <Button label="Discard Changes" type="danger" @click.native="discardChanges" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Alert from '@/components/shared/Alert';
import Tip from '@/components/shared/Tip';
import Button from '@/components/shared/Button';
import Tabs from '@/components/shared/Tabs';
import MarkComplete from '@/components/shared/MarkComplete';
import CheckboxButton from '@/components/shared/CheckboxButton';
import Modal from '@/components/shared/Modal';
import HoverText from '@/components/shared/HoverText';

// Custom section components - these are used in the "customSections" loop above
import PersonnelTable from '@/components/app/PersonnelTable';
import Locations from '@/components/app/Locations/Locations';
import Parameters from '@/components/app/Parameters';

export default {
  components: {
    Alert,
    Locations,
    Tip,
    Button,
    Tabs,
    MarkComplete,
    Parameters,
    CheckboxButton,
    PersonnelTable,
    Modal,
    HoverText,
  },
  data() {
    return {
      currentSection: {},
      shouldShowExample: false,
      hasSaved: false,
      pendingData: {},
      shouldDisplayUnsavedWarning: false,
      pendingSection: null,
      sectionNotAvailableMessage: '',
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections']),
    ...mapState('structure', ['sections', 'questions']),
    ...mapState('ref', ['concerns', 'yesNo', 'customSections']),
    ...mapGetters('qapp', ['qappData']),
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
    locationConcerns() {
      let concerns = [];
      const locationConcernQuestion = this.questions.find((q) => q.questionLabel === 'Water Quality Concerns');
      if (locationConcernQuestion && this.qappData[locationConcernQuestion.id]) {
        this.qappData[locationConcernQuestion.id].forEach((location) => {
          concerns = concerns.concat(location.value.split(','));
        });
      }
      return concerns;
    },
  },
  async mounted() {
    // Fetch latest qapp data
    await this.$store.dispatch('qapp/get', this.$route.params.id);

    // Fetch structure data from DB to generate sections and questions on the fly
    this.getQuestions();
    await this.getSections();
    if (this.sections) {
      this.getFirstUncompletedSectionIndex();
    }
    // Fetch lookup reference data
    this.$store.dispatch('ref/getData');
  },
  methods: {
    ...mapActions('structure', ['getSections', 'getQuestions']),
    changeSection(section) {
      if (this.hasUnsavedData()) {
        this.shouldDisplayUnsavedWarning = true;
        this.pendingSection = section;
      } else {
        this.hasSaved = false;
        this.currentSection = section;
        // Set initial pending data based on existing qapp data
        this.pendingData = Object.assign({}, this.qappData);
        /*
         * Locations are automatically saved upon adding or editing, so hasSaved will always be true
         * If all fields are filled upon coming to new section, set hasSaved to true and de-activate save btn
         */
        if (
          section.sectionLabel === 'Monitoring Locations' ||
          this.currentQuestions.filter((q) => !!this.pendingData[q.id]).length === this.currentQuestions.length
        ) {
          this.hasSaved = true;
        }
      }
    },
    discardChanges() {
      this.pendingData = {};
      this.shouldDisplayUnsavedWarning = false;
      this.changeSection(this.pendingSection);
      this.pendingSection = null;
    },
    getOptions(refName) {
      return this[refName];
    },
    addExample(qId) {
      this.pendingData[qId] = this.pendingData[qId] || ''; // if undefined, set as empty string
      this.$set(this.pendingData, qId, this.pendingData[qId] + this.$refs.exampleText[0].innerText);
      this.shouldShowExample = false;
    },
    updatePendingData(e, question) {
      this.hasSaved = false;
      if (question.refName && question.refName !== 'yesNo') {
        let dataArray = this.pendingData[question.id] ? this.pendingData[question.id].split(',') : [];
        if (dataArray.indexOf(e.target.value) > -1) {
          dataArray = dataArray.filter((val) => val !== e.target.value);
        } else {
          dataArray.push(e.target.value);
        }
        this.$set(this.pendingData, question.id, dataArray.join(','));
      } else {
        this.$set(this.pendingData, question.id, e.target.value);
      }
    },
    checkRequiredFields() {
      let hasEmptyFields = false;
      this.currentQuestions.forEach((q) => {
        if (
          (!this.pendingData[q.id] ||
            (this.pendingData[q.id] && typeof this.pendingData[q.id] === 'string' && !this.pendingData[q.id].trim())) &&
          (!this.qappData[q.id] ||
            (this.qappData[q.id] && typeof this.qappData[q.id] === 'string' && !this.qappData[q.id].trim()))
        ) {
          hasEmptyFields = true;
        }
      });
      return hasEmptyFields;
    },
    hasUnsavedData() {
      if (this.hasSaved) return false;
      return this.currentQuestions.filter((q) => !!this.pendingData[q.id]).length;
    },
    markComplete(sectionNumber) {
      const sectionId = this.sections.find((s) => s.sectionNumber === sectionNumber).id;
      if (this.completedSections.indexOf(sectionId) > -1) {
        this.$store.dispatch('qapp/deleteCompletedSection', sectionId);
      } else {
        this.$store.dispatch('qapp/addCompletedSection', sectionId);
        // Locations and personnel are automatically saved upon add/edit, so don't saveData on markComplete
        if (
          this.currentSection.sectionLabel !== 'Monitoring Locations' &&
          this.currentSection.sectionLabel !== 'Project Organization/Personnel'
        ) {
          this.saveData();
        }
      }
    },
    async saveData(e, valueId = null, data) {
      // Wait for all data to be saved before setting hasSaved
      await Promise.all(
        this.currentQuestions.map(async (q) => {
          await this.$store.dispatch('qapp/save', {
            qappId: this.$store.state.qapp.id,
            questionId: q.id,
            value: data ? data[q.id] : this.pendingData[q.id],
            valueId,
          });
        })
      );
      this.hasSaved = true;
      this.shouldDisplayUnsavedWarning = false;
      if (this.pendingSection) {
        this.changeSection(this.pendingSection);
        this.pendingSection = null;
      }
    },
    isSectionNotAvailable() {
      let sectionNotAvailable = false;
      if (
        this.currentSection.sectionLabel === 'Monitoring Locations' &&
        this.completedSections.indexOf(this.sections.find((s) => s.sectionLabel === 'Water Quality Concerns').id) === -1
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns section before completing this section';
      } else if (
        this.currentSection.sectionLabel === 'Parameters' &&
        (this.completedSections.indexOf(this.sections.find((s) => s.sectionLabel === 'Water Quality Concerns').id) ===
          -1 ||
          this.completedSections.indexOf(this.sections.find((s) => s.sectionLabel === 'Monitoring Locations').id) ===
            -1)
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns and Monitoring Locations sections before completing this section';
      }
      return sectionNotAvailable;
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
      this.changeSection(this.sections[firstSection]);
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
  white-space: normal;
  text-align: left;
  height: 100%;

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
  .button {
    margin-right: 1em;
  }

  &.has-text-right {
    margin-bottom: 1em;

    .button {
      margin-right: 0;
    }
  }
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

.example-text {
  margin: 0.5em 0.5em 1em 0.5em;
}
</style>
