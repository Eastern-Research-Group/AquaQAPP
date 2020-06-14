<template>
  <div class="navigate-container">
    <Alert v-if="dataError !== null" :message="dataError" type="error"></Alert>
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
          <LoadingIndicator v-if="isSaving" message="Saving..." class="dark is-pulled-right" />
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

          <label v-if="currentSection.sectionName === 'gettingStarted'" class="label is-size-4">{{
            currentSection.sectionLabel
          }}</label>
          <p
            v-if="currentSection.sectionName === 'gettingStarted'"
            class="instructions content"
            v-html="currentSection.instructions"
          ></p>

          <div
            class="field"
            v-for="(question, index) in currentQuestions.filter(
              (q) => customSections.map((s) => s.label).indexOf(q.section.sectionLabel) === -1
            )"
            :key="question.id"
          >
            <LoadingIndicator v-if="isFetching" class="dark" message="Loading..." />
            <div v-else>
              <label :for="`question${question.id}`" class="label is-size-4">{{ question.questionLabel }}</label>
              <!-- only display instructions under first question label, since it is for the whole seciton -->
              <p v-if="index === 0" class="instructions content" v-html="currentSection.instructions"></p>
              <input
                v-if="question.dataEntryType === 'text'"
                :id="`question${question.id}`"
                class="input"
                type="text"
                required
                :placeholder="`Enter ${question.questionLabel}`"
                v-model="pendingData[question.questionName]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              />
              <input
                v-if="question.dataEntryType === 'phone'"
                :id="`question${question.id}`"
                class="input"
                type="tel"
                required
                :placeholder="`Enter ${question.questionLabel}`"
                v-model="pendingData[question.questionName]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              />
              <input
                v-if="question.dataEntryType === 'email'"
                :id="`question${question.id}`"
                class="input"
                type="email"
                required
                :placeholder="`Enter ${question.questionLabel}`"
                v-model="pendingData[question.questionName]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              />
              <textarea
                v-if="question.dataEntryType === 'largeText'"
                :id="`question${question.id}`"
                class="input"
                required
                :placeholder="`Enter ${question.questionLabel}`"
                v-model="pendingData[question.questionName]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              ></textarea>
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
                    <p :key="index" class="has-text-black example-text" ref="exampleText" v-html="example.text"></p>
                  </template>
                </Tabs>
                <p v-else class="has-text-black example-text" ref="exampleText" v-html="question.examples[0].text"></p>
              </Modal>
              <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
            </div>
          </div>
          <div v-if="customSection">
            <h2 class="label is-size-4">
              {{ currentSection.sectionLabel }}
            </h2>
            <p class="instructions content" v-html="currentSection.instructions"></p>
            <component
              :is="customSection.component"
              :questions="currentQuestions"
              :pendingData="pendingData"
              @saveData="saveData"
              @updateData="updatePendingData"
            />
          </div>
        </form>
      </section>
      <Modal v-if="shouldDisplayUnsavedWarning" @close="closeUnsavedWarningModal">
        <Alert message="You have unsaved changes. Please save or discard before continuing." type="warning" />
        <div class="btn-container">
          <Button label="Save Changes" type="success" @click.native="saveData" />
          <Button label="Discard Changes" type="danger" @click.native="discardChanges" />
        </div>
      </Modal>
      <Modal v-if="shouldDisplayParamLocationWarning" @close="shouldDisplayParamLocationWarning = false">
        <Alert type="warning">
          You've chosen to remove parameters that have already been associated with one or more monitoring locations.
          Are you sure you want to delete those parameters?
        </Alert>
        <div class="btn-container">
          <Button label="Continue and Save" type="success" @click.native="saveData" />
          <Button label="Cancel" type="cancel" @click.native="shouldDisplayParamLocationWarning = false" />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import Alert from '@/components/shared/Alert';
import Tip from '@/components/shared/Tip';
import Button from '@/components/shared/Button';
import Tabs from '@/components/shared/Tabs';
import MarkComplete from '@/components/shared/MarkComplete';
import Modal from '@/components/shared/Modal';
import HoverText from '@/components/shared/HoverText';
import LoadingIndicator from '@/components/shared/LoadingIndicator';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import difference from 'lodash/difference';
// Custom section components - these are used in the "customSections" loop above
import Concerns from '@/components/app/Concerns';
import PersonnelTable from '@/components/app/PersonnelTable';
import Locations from '@/components/app/Locations/Locations';
import Parameters from '@/components/app/Parameters';
import ProjectActivities from '@/components/app/ProjectActivities';
import SampleDesign from '@/components/app/SampleDesign';
import RecordHandlingProcedures from '@/components/app/RecordHandlingProcedures';
import ParametersByLocation from '@/components/app/ParametersByLocation';

export default {
  components: {
    Alert,
    Button,
    Concerns,
    HoverText,
    LoadingIndicator,
    Locations,
    MarkComplete,
    Modal,
    Multiselect,
    Parameters,
    PersonnelTable,
    ProjectActivities,
    ParametersByLocation,
    RecordHandlingProcedures,
    SampleDesign,
    Tabs,
    Tip,
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
      dataError: null,
      shouldDisplayParametersWarning: false,
      yesNoOptions: ['Yes', 'No'],
      removedParamsWithLocations: [],
      shouldDisplayParamLocationWarning: false,
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections', 'isFetching', 'isSaving']),
    ...mapState('structure', ['sections', 'questions']),
    ...mapState('ref', ['yesNo', 'customSections']),
    ...mapGetters('qapp', ['qappData', 'wordDocData']),
    ...mapGetters('structure', ['getQuestionId']),
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
    customSection() {
      return this.customSections.find((s) => s.label === this.currentSection.sectionLabel);
    },
  },
  async mounted() {
    // Fetch structure data from DB to generate sections and questions on the fly
    await this.$store.dispatch('structure/getSections');
    this.$store.dispatch('structure/getQuestions');
    // Fetch lookup reference data
    await this.$store.dispatch('ref/getData');

    // Fetch latest qapp data
    try {
      await this.$store.dispatch('qapp/get', this.$route.params.id);
    } catch (e) {
      // 241 - handle the "no qapp found" error gracefully
      this.$router.push({ name: 'dashboard', params: { notFound: '1' } });
      return;
    }

    if (this.sections) {
      this.getFirstUncompletedSectionIndex();
    }
  },
  methods: {
    changeSection(section) {
      this.dataError = null;
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
          this.currentQuestions.filter((q) => !!this.pendingData[q.questionName]).length ===
            this.currentQuestions.length ||
          section.sectionLabel === 'Project Organization/Personnel' ||
          section.sectionLabel === 'Parameters By Location'
        ) {
          this.hasSaved = true;
        }

        // Set Google Analytics event for changing sections (mark each section as a page view)
        gtag('config', 'UA-37504877-5', { page_path: section.sectionLabel });
        gtag('event', 'page_view');
      }
    },
    discardChanges() {
      this.pendingData = {};
      this.shouldDisplayUnsavedWarning = false;
      this.changeSection(this.pendingSection);
      this.pendingSection = null;
    },
    updatePendingData(e, question) {
      this.hasSaved = false;
      if (question.refName && question.refName !== 'yesNo') {
        let dataArray = this.pendingData[question.questionName]
          ? this.pendingData[question.questionName].split(',')
          : [];
        if (dataArray.indexOf(e.target.value) > -1) {
          dataArray = dataArray.filter((val) => val !== e.target.value);
        } else {
          dataArray.push(e.target.value);
        }
        this.$set(this.pendingData, question.questionName, dataArray.join(','));
      } else {
        this.$set(this.pendingData, question.questionName, e.target.value);
      }
    },
    checkRequiredFields() {
      let hasEmptyFields = false;

      if (this.currentSection.sectionName === 'sampleDesign') {
        hasEmptyFields = true;
        let selectedParams = this.qappData.parameters;
        selectedParams = selectedParams.split(',');
        let tableParams = [];
        if (selectedParams.length > 0 && this.qappData.sampleParameter) {
          this.qappData.sampleParameter.forEach((param) => {
            tableParams.push(param.value);
          });
          tableParams = uniqBy(tableParams);
          hasEmptyFields = !isEqual(tableParams.sort(), selectedParams.sort());
        }
      } else if (this.currentSection.sectionName === 'recordHandling') {
        hasEmptyFields = true;
        if (this.qappData.details) hasEmptyFields = this.qappData.details.length < 5;
      } else {
        this.currentQuestions.forEach((q) => {
          if (
            (!this.pendingData[q.questionName] ||
              (this.pendingData[q.questionName] &&
                typeof this.pendingData[q.questionName] === 'string' &&
                !this.pendingData[q.questionName].trim())) &&
            (!this.qappData[q.questionName] ||
              (this.qappData[q.questionName] &&
                typeof this.qappData[q.questionName] === 'string' &&
                !this.qappData[q.questionName].trim()))
          ) {
            hasEmptyFields = true;
          }
        });
      }
      return hasEmptyFields;
    },
    hasUnsavedData() {
      if (this.hasSaved) return false;
      return this.currentQuestions.filter((q) => !!this.pendingData[q.questionName]).length;
    },
    markComplete(sectionNumber) {
      const sectionId = this.sections.find((s) => s.sectionNumber === sectionNumber).id;
      if (this.completedSections.indexOf(sectionId) > -1) {
        this.$store.dispatch('qapp/deleteCompletedSection', sectionId);
      } else {
        this.$store.dispatch('qapp/addCompletedSection', sectionId);
        // Locations and personnel are automatically saved upon add/edit, so don't saveData on markComplete
        if (
          (!this.customSections.find((s) => s.label === this.currentSection.sectionLabel) ||
            this.currentSection.sectionLabel === 'Parameters' ||
            this.currentSection.sectionLabel === 'Water Quality Concerns') &&
          this.currentQuestions.length
        ) {
          this.saveData();
        }
      }
    },
    async saveData(e, valueId = null, data) {
      // Wait for all data to be saved before setting hasSaved
      this.dataError = null;

      // If user is saving parameters section and has already selected parameters by location, check business logic rules
      if (
        this.currentSection.sectionLabel === 'Parameters' &&
        this.qappData.parametersByLocation &&
        !this.shouldDisplayParamLocationWarning &&
        this.isUserRemovingLocationParameters()
      ) {
        this.shouldDisplayUnsavedWarning = false;
        this.shouldDisplayParamLocationWarning = true;
        return;
      }

      const dataToSave = this.currentQuestions.map((q) => {
        return {
          qappId: this.$store.state.qapp.id,
          questionId: q.id,
          value: data ? data[q.questionName] : this.pendingData[q.questionName],
          valueId,
        };
      });

      // If user is removing parameters that are associated with locations, update parametersByLocation values to remove those parameters
      if (this.removedParamsWithLocations.length) {
        this.qappData.parametersByLocation.forEach((paramByLocValue) => {
          const valArray = paramByLocValue.value.split(',');
          // Filter function compares params to be deleted with existing parametersByLocation values
          const newParamsByLocations = valArray.filter((val) => !this.removedParamsWithLocations.includes(val));
          // If the arrays do not match, update dataToSave to include updated parametersByLocation values (with removed parameters)
          if (newParamsByLocations.length !== valArray.filter) {
            dataToSave.push({
              qappId: this.$store.state.qapp.id,
              questionId: this.getQuestionId('parametersByLocation'),
              value: newParamsByLocations.join(','),
              valueId: paramByLocValue.valueId,
            });
          }
        });
        this.shouldDisplayParamLocationWarning = false;
      }

      await this.$store.dispatch('qapp/save', dataToSave);

      this.hasSaved = this.dataError === null;
      this.shouldDisplayUnsavedWarning = false;

      if (this.pendingSection) {
        this.changeSection(this.pendingSection);
        this.pendingSection = null;
      }
    },
    isSectionNotAvailable() {
      /* User must have saved data for concerns before viewing locations section,
       * and must have saved data for locations before viewing parameters section
       */
      let sectionNotAvailable = false;
      if (
        this.currentSection.sectionLabel === 'Monitoring Locations' &&
        (!this.qappData.waterConcerns || !this.qappData.differByLocation)
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns section before completing this section';
      } else if (this.currentSection.sectionLabel === 'Parameters' && !this.qappData.locationId) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns and Monitoring Locations sections before completing this section';
      } else if (
        (this.currentSection.sectionLabel === 'Sampling Design Details' ||
          this.currentSection.sectionLabel === 'Parameters By Location') &&
        !this.qappData.parameters
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage = 'You must complete the Parameters section before completing this section';
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
    closeUnsavedWarningModal() {
      this.shouldDisplayUnsavedWarning = false;
      this.pendingSection = null;
    },
    isUserRemovingLocationParameters() {
      this.removedParamsWithLocations = [];

      let allParamsByLocation = [];
      this.qappData.parametersByLocation.forEach((valObject) => {
        allParamsByLocation = allParamsByLocation.concat(valObject.value.split(','));
      });

      // Use lodash difference function to get removed params (compare original qappData with pendingData arrays)
      const removedParams = difference(this.qappData.parameters.split(','), this.pendingData.parameters.split(','));

      // Use filter function to determine is any selected params by location match with the params to be removed
      this.removedParamsWithLocations = allParamsByLocation.filter((paramId) => removedParams.includes(paramId));
      return this.removedParamsWithLocations.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigate-container {
  margin-top: 2rem;
}

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
  margin-bottom: 1.25rem;
}

textarea {
  resize: vertical;
  height: 8em;
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

<style>
.example-text ul {
  list-style: inherit;
  margin-left: 45px;
}
</style>
