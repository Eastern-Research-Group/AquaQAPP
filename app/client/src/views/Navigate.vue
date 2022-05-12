<template>
  <div class="navigate-container">
    <Alert v-if="dataError !== null" :message="dataError" type="error"></Alert>
    <div class="columns">
      <aside class="menu column is-one-quarter">
        <div class="overlay-end"><i class="fas fa-arrow-circle-right arrow-right"></i></div>
        <div class="overlay-start"><i class="fas fa-arrow-circle-left arrow-left"></i></div>
        <ul class="menu-list disable-scrollbars">
          <li v-for="section in sections" :key="section.id" :id="`section${section.id}`">
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
            type="dark"
            class="aq-save-btn is-pulled-right"
            :disabled="hasSaved || !hasUnsavedData || isSaving"
            :title="getSaveBtnHoverText()"
            @click.native="saveData"
          >
            <LoadingIndicator v-if="isSaving" class="light" />
            <span v-else>
              {{ hasSaved ? 'Saved' : 'Save' }}
            </span>
          </Button>
          <MarkComplete
            @markComplete="markComplete(currentSection.sectionNumber)"
            :complete="currentSection.id && completedSections.indexOf(currentSection.id) > -1"
            :disabled="!(currentSection.id && completedSections.indexOf(currentSection.id) > -1) && hasEmptyFields"
            :isBusy="isMarkingComplete"
          />

          <h2 class="label is-size-4">
            {{ currentSection.sectionLabel }}
          </h2>
          <p class="instructions content" v-html="currentSection.instructions"></p>

          <div
            class="field field-padding-bottom"
            v-for="question in currentQuestions.filter(
              (q) => customSections.map((s) => s.label).indexOf(q.section.sectionLabel) === -1
            )"
            :key="question.id"
          >
            <LoadingIndicator v-if="isFetching" class="dark" message="Loading..." />
            <div v-else>
              <label
                v-if="question.questionLabel !== currentSection.sectionLabel"
                :for="`question${question.id}`"
                class="label is-size-5"
                >{{ question.questionLabel }}</label
              >
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
              <p class="instructions" v-if="question.dataEntryInstructions" v-html="question.dataEntryInstructions"></p>
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
                  label="Example"
                  type="dark-gray"
                  v-if="question.examples.length > 0"
                  @click.native="() => (shouldShowExample = question)"
                />
              </div>
              <Modal v-if="shouldShowExample === question" @close="() => (shouldShowExample = null)">
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
                    <p
                      :key="index"
                      class="has-text-black example-text content"
                      ref="exampleText"
                      v-html="example.text"
                    ></p>
                  </template>
                </Tabs>
                <p
                  v-else
                  class="has-text-black example-text content"
                  ref="exampleText"
                  v-html="getExampleText(question)"
                ></p>
              </Modal>
              <Tip v-if="question.dataEntryTip" :message="question.dataEntryTip" />
            </div>
          </div>
          <div v-if="customSection">
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
import difference from 'lodash/difference';
// Custom section components - these are used in the "customSections" loop above
import Concerns from '@/components/app/Concerns';
import PersonnelTable from '@/components/app/PersonnelTable';
import Locations from '@/components/app/Locations/Locations';
import Parameters from '@/components/app/Parameters';
import ProjectActivities from '@/components/app/ProjectActivities';
import SampleDesign from '@/components/app/SampleDesign';
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
    SampleDesign,
    Tabs,
    Tip,
  },
  data() {
    return {
      currentSection: {},
      shouldShowExample: false,
      hasSaved: true,
      pendingData: {},
      shouldDisplayUnsavedWarning: false,
      pendingSection: null,
      sectionNotAvailableMessage: '',
      dataError: null,
      shouldDisplayParametersWarning: false,
      yesNoOptions: ['Yes', 'No'],
      removedParamsWithLocations: [],
      shouldDisplayParamLocationWarning: false,
      tableSections: [
        'Project Organization/Personnel',
        'Project Schedule',
        'Monitoring Location',
        'Parameters By Location',
      ],
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections', 'isFetching', 'isSaving', 'isMarkingComplete']),
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
    hasEmptyFields() {
      let hasEmptyFields = false;

      if (this.currentSection.sectionName === 'sampleDesign') {
        // Make sure sample design details have saved entries for all parameters by all locations
        const paramsByLocationCount = this.qappData.parametersByLocation.reduce((accumulator, currentValue) => {
          if (currentValue.value) {
            return accumulator + currentValue.value.split(',').length;
          }
          return accumulator;
        }, 0);
        // Use frequency count to confirm as it is the first sample design question and is required
        // Make sure frequency exists in qappData before checking length to avoid error
        if (!this.pendingData.frequency) {
          hasEmptyFields = true;
        } else {
          hasEmptyFields = paramsByLocationCount !== this.pendingData.frequency.length;
        }
      } else if (this.currentSection.sectionName === 'parameters') {
        // User can either select parameters or enter their own, so we only need to check if at least one of these cases has happened
        if (!this.pendingData.parameters && !this.pendingData.otherParameters) hasEmptyFields = true;
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
  created() {
    window.addEventListener('beforeunload', this.preventReloadIfUnsaved);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.preventReloadIfUnsaved);
  },
  methods: {
    preventReloadIfUnsaved(e) {
      if (this.hasUnsavedData) {
        const confirmationMessage = 'You have unsaved changes. If you leave before saving, your changes will be lost.';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
      return undefined;
    },
    getExampleText(question) {
      if (question.examples.length) {
        return question.examples[0].text;
      }
      return '';
    },
    changeSection(section) {
      this.dataError = null;
      if (window.innerWidth <= 769) {
        document
          .getElementById(`section${section.id}`)
          .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
      if (this.hasUnsavedData) {
        this.shouldDisplayUnsavedWarning = true;
        this.pendingSection = section;
      } else {
        this.currentSection = section;
        // Set initial pending data based on existing qapp data
        this.pendingData = { ...this.qappData };
        /*
         * Table/Sidenav-based screens are automatically saved upon adding or editing, so hasSaved will always be true
         * If all fields are filled upon coming to new section, set hasSaved to true and de-activate save btn
         * Parameters section has "otherParameters" question which is not required, so there is special logic for this case
         */
        if (
          this.tableSections.indexOf(section.sectionLabel) > -1 ||
          this.currentQuestions.filter((q) => !!this.pendingData[q.questionName]).length ===
            this.currentQuestions.length ||
          (section.sectionName === 'parameters' &&
            this.currentQuestions.filter((q) => !!this.pendingData[q.questionName]).length ===
              this.currentQuestions.length - 1)
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
    updatePendingData(e, question, valueId) {
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
      } else if (valueId) {
        const existingData = this.pendingData[question.questionName] || [];
        this.pendingData[question.questionName] = existingData;
        const existingValueIndex = existingData.findIndex((v) => v.valueId === valueId);
        const indexToUpdate = existingValueIndex > -1 ? existingValueIndex : existingData.length;
        this.$set(this.pendingData[question.questionName], indexToUpdate, { value: e.target.value, valueId });
      } else {
        this.$set(this.pendingData, question.questionName, e.target.value);
      }
    },
    markComplete(sectionNumber) {
      const sectionId = this.sections.find((s) => s.sectionNumber === sectionNumber).id;
      if (this.completedSections.indexOf(sectionId) > -1) {
        this.$store.dispatch('qapp/deleteCompletedSection', sectionId);
      } else {
        this.$store.dispatch('qapp/addCompletedSection', sectionId);
        // Locations and personnel are automatically saved upon add/edit, so don't saveData on markComplete
        if (
          !this.tableSections.find((s) => s.label === this.currentSection.sectionLabel) &&
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

      const dataToSave = [];

      this.currentQuestions.forEach((q) => {
        const value = data ? data[q.questionName] : this.pendingData[q.questionName];

        // If value is array of values with valueIds, loop through to save each separately
        if (Array.isArray(value)) {
          value.forEach((valObject) => {
            dataToSave.push({
              qappId: this.$store.state.qapp.id,
              questionId: q.id,
              value: valObject.value,
              valueId: valObject.valueId,
            });
          });
        } else {
          dataToSave.push({
            qappId: this.$store.state.qapp.id,
            questionId: q.id,
            value: data ? data[q.questionName] : this.pendingData[q.questionName],
            valueId,
          });
        }
      });

      // If user is removing parameters that are associated with locations, update parametersByLocation values to remove those parameters
      if (this.removedParamsWithLocations.length) {
        this.qappData.parametersByLocation.forEach((paramByLocValue) => {
          const valArray = paramByLocValue.value.split(',');
          // Filter function compares params to be deleted with existing parametersByLocation values
          const newParamsByLocations = valArray.filter((val) => !this.removedParamsWithLocations.includes(val));
          // If the arrays do not match, update dataToSave to include updated parametersByLocation values (with removed parameters)
          if (newParamsByLocations.length !== valArray.filter) {
            const pendingParamData = { parametersByLocation: newParamsByLocations.join(',') };
            const locationId = this.qappData.locationId.find((l) => l.valueId === paramByLocValue.valueId);
            // Dispatch deleteParamsByLocation action which will also delete any related Sampling Design records
            this.$store.dispatch('qapp/deleteParamsByLocation', {
              locationId: locationId ? locationId.value : null,
              locationValueId: paramByLocValue.valueId,
              pendingData: pendingParamData,
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
        (!this.qappData.parameters && !this.qappData.otherParameters)
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage = 'You must complete the Parameters section before completing this section';
      } else if (
        this.currentSection.sectionLabel === 'Sampling Design Details' &&
        !this.qappData.parametersByLocation
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Parameters By Location section before completing this section';
      }
      return sectionNotAvailable;
    },
    getSaveBtnHoverText() {
      if (this.tableSections.indexOf(this.currentSection.sectionLabel) > -1) {
        return 'Data are automatically saved upon adding, editing, or deleting.';
      }
      if (this.hasEmptyFields) {
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

      const params = this.qappData.parameters ? this.qappData.parameters.split(',') : [];
      const otherParams = this.qappData.otherParameters
        ? JSON.parse(this.qappData.otherParameters).map((p) => p.name)
        : [];

      const pendingParams = this.pendingData.parameters ? this.pendingData.parameters.split(',') : [];
      const pendingOtherParams = this.pendingData.otherParameters
        ? JSON.parse(this.pendingData.otherParameters).map((p) => p.name)
        : [];

      // Use lodash difference function to get removed params (compare original qappData with pendingData arrays for both parameters and otherParameters)
      const removedParams = difference(params, pendingParams).concat(difference(otherParams, pendingOtherParams));

      // Use filter function to determine is any selected params by location match with the params to be removed
      this.removedParamsWithLocations = allParamsByLocation.filter((paramId) => removedParams.includes(paramId));
      return this.removedParamsWithLocations.length;
    },
  },
};
</script>
<style lang="scss">
.getting-started {
  a,
  strong {
    color: #fff;
  }

  a,
  a:visited {
    text-decoration: underline;

    &:hover {
      color: whitesmoke;
    }
  }

  .top-of-page {
    display: block;
    text-align: right;
    font-size: 0.9rem;
  }
}
</style>

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

  strong {
    color: #fff;
  }
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
  min-width: 4.5rem;
  margin-left: 2em;

  ::v-deep .spinner {
    margin-left: 0;
  }
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

.example-text ul {
  list-style: inherit;
  margin-left: 45px;
}

.field-padding-bottom:not(:last-child) {
  margin-bottom: 2.25rem;
}

.overlay-end,
.overlay-start {
  display: none;
}

@media only screen and (max-width: 890px) {
  .menu {
    border-right: none;
  }
}

@media only screen and (max-width: 769px) {
  .is-one-quarter {
    position: relative;
  }

  .overlay-end {
    display: block;
    position: absolute;
    width: 1em;
    right: 0;
    top: 0;
    z-index: 1;
    text-align: right;
  }

  .overlay-start {
    display: block;
    position: absolute;
    width: 1em;
    left: 0;
    top: 0;
    z-index: 1;
    text-align: left;
  }

  .arrow-right {
    opacity: 0.5;
    position: relative;
    transform: translateY(-50%);
    padding-right: 1em;
  }

  .arrow-left {
    opacity: 0.5;
    position: relative;
    transform: translateY(-50%);
    padding-left: 1em;
  }

  .is-one-quarter ul {
    overflow-x: scroll;
    white-space: nowrap;
  }

  .is-one-quarter li {
    display: inline-block;
  }

  .disable-scrollbars {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }

  .right {
    padding-left: 0.75rem;
  }
}
</style>
