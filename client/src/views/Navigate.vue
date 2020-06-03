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
                v-model="pendingData[question.id]"
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
                v-model="pendingData[question.id]"
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
                v-model="pendingData[question.id]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              />
              <textarea
                v-if="question.dataEntryType === 'largeText'"
                :id="`question${question.id}`"
                class="input"
                required
                :placeholder="`Enter ${question.questionLabel}`"
                v-model="pendingData[question.id]"
                @input="hasSaved = false"
                :maxlength="question.maxLength"
              ></textarea>
              <HoverText
                v-if="question.refName === 'concerns' && locationConcerns.length"
                hoverId="concernsInfo"
                linkText="Why are some concerns disabled?"
              >
                There are monitoring locations associated with these concerns. You must delete these locations before
                the concerns can be removed.
              </HoverText>
              <fieldset v-if="question.dataEntryType === 'checkboxBtn'">
                <legend class="is-sr-only">{{ question.questionLabel }}</legend>
                <div class="columns is-multiline">
                  <CheckboxButton
                    v-for="option in getOptions(question.refName)"
                    :key="option.id"
                    :id="option.code"
                    :name="option.label"
                    :isSingleSelect="question.refName === 'yesNo'"
                    :singleSelectId="question.questionLabel"
                    :value="option.code"
                    :disabled="locationConcerns.indexOf(option.code) > -1"
                    :checked="!!(pendingData[question.id] && pendingData[question.id].indexOf(option.code) > -1)"
                    @check="updatePendingData($event, question)"
                    @click.native="triggerConcernsWarningModal(option.code)"
                  />
                </div>
              </fieldset>
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
      <Modal v-if="shouldDisplayConcernsWarning" @close="closeConcernsWarningModal">
        <Alert
          message="Selecting No will remove all selected concerns from existing monitoring locations."
          type="warning"
        />
        <div class="btn-container">
          <Button label="Continue" type="success" @click.native="removeConcerns" />
          <Button label="Cancel" type="danger" @click.native="cancelYesNo" />
        </div>
      </Modal>
      <Modal v-if="shouldDisplayAddParameter" @close="closeAddParametersWarningModal" class="parametersWarningModal">
        <div class="columns">
          <div class="column is-9">
            <Alert
              message="Would you like to associate all the new parameters to monitoring locations with the corresponding water type?"
              type="warning"
            />
          </div>
          <div class="column is-3">
            <multiselect v-model="addParamValue" :options="yesNoOptions" placeholder="Select Option"></multiselect>
          </div>
        </div>
        <div class="columns">
          <div class="column is-offset-10">
            <Button label="Continue" type="success" @click.native="addRemoveParams" />
          </div>
        </div>
      </Modal>
      <Modal
        v-if="shouldDisplayRemoveParameter"
        @close="closeRemoveParametersWarningModal"
        class="parametersWarningModal"
      >
        <div class="columns">
          <div class="column is-9">
            <Alert
              message="You've chosen to remove parameters that have already been associated with one or more monitoring locations, are you sure you want to delete those parameters?"
              type="warning"
            />
          </div>
          <div class="column is-3">
            <multiselect v-model="removeParamValue" :options="yesNoOptions" placeholder="Select Option"></multiselect>
          </div>
        </div>
        <div class="columns">
          <div class="column is-offset-10">
            <Button label="Continue" type="success" @click.native="addRemoveParams" />
          </div>
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
import CheckboxButton from '@/components/shared/CheckboxButton';
import Modal from '@/components/shared/Modal';
import HoverText from '@/components/shared/HoverText';
import LoadingIndicator from '@/components/shared/LoadingIndicator';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
// Custom section components - these are used in the "customSections" loop above
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
    ProjectActivities,
    LoadingIndicator,
    SampleDesign,
    RecordHandlingProcedures,
    ParametersByLocation,
    Multiselect,
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
      shouldDisplayConcernsWarning: false,
      previousParameters: [],
      shouldDisplayParametersWarning: false,
      yesNoOptions: ['Yes', 'No'],
      removeParamValue: '',
      addParamValue: '',
      shouldDisplayAddParameter: false,
      shouldDisplayRemoveParameter: false,
      addParamsArray: [],
      removeParamsArray: [],
      paramSaveValueId: null,
      paramSaveData: null,
    };
  },
  computed: {
    ...mapState('qapp', ['completedSections', 'isFetching', 'isSaving']),
    ...mapState('structure', ['sections', 'questions']),
    ...mapState('ref', ['concerns', 'yesNo', 'customSections', 'parameters']),
    ...mapGetters('qapp', ['qappData', 'wordDocData']),
    ...mapGetters('structure', [
      'concernsQuestionId',
      'concernsDifferByLocQuestionId',
      'locationQuestionId',
      'parametersQuestionId',
      'locConcernsQuestionId',
      'sampleDesignQuestionId',
      'paramsbyLocQuestionId',
      'detailsQuestionId',
    ]),
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
      if (this.qappData[this.locConcernsQuestionId]) {
        this.qappData[this.locConcernsQuestionId].forEach((location) => {
          if (location.value) {
            concerns = concerns.concat(location.value.split(','));
          }
        });
      }
      return concerns;
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
          this.currentQuestions.filter((q) => !!this.pendingData[q.id]).length === this.currentQuestions.length ||
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
      this.shouldDisplayAddParameter = false;
      this.shouldDisplayRemoveParameter = false;
      this.changeSection(this.pendingSection);
      this.pendingSection = null;
    },
    getOptions(refName) {
      return this[refName];
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

      if (this.currentSection.sectionName === 'sampleDesign') {
        hasEmptyFields = true;
        let selectedParams = this.qappData[this.parametersQuestionId];
        selectedParams = selectedParams.split(',');
        let tableParams = [];
        if (selectedParams.length > 0 && this.qappData[this.sampleDesignQuestionId]) {
          this.qappData[this.sampleDesignQuestionId].forEach((param) => {
            tableParams.push(param.value);
          });
          tableParams = uniqBy(tableParams);
          hasEmptyFields = !isEqual(tableParams.sort(), selectedParams.sort());
        }
      } else if (this.currentSection.sectionName === 'recordHandling') {
        hasEmptyFields = true;
        if (this.qappData[this.detailsQuestionId]) hasEmptyFields = this.qappData[this.detailsQuestionId].length < 5;
      } else {
        this.currentQuestions.forEach((q) => {
          if (
            (!this.pendingData[q.id] ||
              (this.pendingData[q.id] &&
                typeof this.pendingData[q.id] === 'string' &&
                !this.pendingData[q.id].trim())) &&
            (!this.qappData[q.id] ||
              (this.qappData[q.id] && typeof this.qappData[q.id] === 'string' && !this.qappData[q.id].trim()))
          ) {
            hasEmptyFields = true;
          }
        });
      }
      return hasEmptyFields;
    },
    hasUnsavedData() {
      if (this.hasSaved) return false;
      if (
        this.currentSection.sectionLabel === 'Parameters' &&
        this.qappData[this.parametersQuestionId] &&
        this.pendingData[this.parametersQuestionId]
      ) {
        let currentParameters = [];
        this.currentQuestions.forEach((q) => {
          currentParameters = sortBy(this.pendingData[q.id].split(','));
        });
        return !isEqual(currentParameters, this.previousParameters);
      }
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
          !this.customSections.find((s) => s.label === this.currentSection.sectionLabel) ||
          this.currentSection.sectionLabel === 'Parameters'
        ) {
          this.saveData();
        }
      }
    },
    async saveData(e, valueId = null, data) {
      // Wait for all data to be saved before setting hasSaved
      this.dataError = null;
      this.addParamsArray = [];
      this.removeParamsArray = [];

      if (this.qappData[this.parametersQuestionId]) {
        this.previousParameters = this.qappData[this.parametersQuestionId].split(',');
      } else {
        this.previousParameters = [];
      }

      if (data && data.paramsByLocation) {
        await this.$store
          .dispatch('qapp/save', {
            qappId: this.$store.state.qapp.id,
            questionId: this.paramsbyLocQuestionId,
            value: data.paramsByLocation,
            valueId,
          })
          .catch((error) => {
            if (this.dataError === null) this.dataError = error.response.data.error;
            else this.dataError += `<br/>${error.response.data.error}`;
          });
      } else if (this.currentSection.sectionName === 'parameters') {
        this.paramSaveValueId = valueId;
        this.paramSaveData = data;
        this.checkParameters();
      } else {
        await Promise.all(
          this.currentQuestions.map(async (q) => {
            await this.$store
              .dispatch('qapp/save', {
                qappId: this.$store.state.qapp.id,
                questionId: q.id,
                value: data ? data[q.id] : this.pendingData[q.id],
                valueId,
              })
              .catch((error) => {
                if (this.dataError === null) this.dataError = error.response.data.error;
                else this.dataError += `<br/>${error.response.data.error}`;
              });
          })
        );
      }

      this.hasSaved = this.dataError === null;
      this.shouldDisplayUnsavedWarning = false;

      if (this.pendingSection && !this.shouldDisplayRemoveParameter && !this.shouldDisplayAddParameter) {
        this.changeSection(this.pendingSection);
        this.pendingSection = null;
      }
    },
    checkParameters() {
      if (this.pendingData[this.parametersQuestionId]) {
        this.shouldDisplayAddParameter = false;
        this.shouldDisplayRemoveParameter = false;
        const sectionId = this.sections.find((s) => s.sectionNumber === '11').id;
        const currentParameters = this.pendingData[this.parametersQuestionId].split(',');
        if (!isEqual(currentParameters, this.previousParameters)) {
          this.shouldDisplayParametersWarning = true;
          this.$store.dispatch('qapp/deleteCompletedSection', sectionId);

          if (this.previousParameters.length && currentParameters.length) {
            currentParameters.forEach((param) => {
              if (this.previousParameters.indexOf(param) === -1) {
                this.shouldDisplayAddParameter = true;
                this.addParamsArray.push(param);
              }
            });
            this.previousParameters.forEach((param) => {
              if (currentParameters.indexOf(param) === -1) {
                this.shouldDisplayRemoveParameter = true;
                this.removeParamsArray.push(param);
              }
            });
          } else if (!this.previousParameters.length && currentParameters.length) {
            this.shouldDisplayAddParameter = true;
            this.addParamsArray = currentParameters;
          }
        }
      } else if (
        !this.pendingData[this.parametersQuestionId] &&
        this.previousParameters &&
        this.currentSection.sectionName === 'parameters'
      ) {
        this.shouldDisplayRemoveParameter = true;
        this.removeParamsArray = this.previousParameters;
      }
    },
    isSectionNotAvailable() {
      /* User must have saved data for concerns before viewing locations section,
       * and must have saved data for locations before viewing parameters section
       */
      let sectionNotAvailable = false;
      if (
        this.currentSection.sectionLabel === 'Monitoring Locations' &&
        (!this.qappData[this.concernsQuestionId] || !this.qappData[this.concernsDifferByLocQuestionId])
      ) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns section before completing this section';
      } else if (this.currentSection.sectionLabel === 'Parameters' && !this.qappData[this.locationQuestionId]) {
        sectionNotAvailable = true;
        this.sectionNotAvailableMessage =
          'You must complete the Water Quality Concerns and Monitoring Locations sections before completing this section';
      } else if (
        (this.currentSection.sectionLabel === 'Sampling Design Details' ||
          this.currentSection.sectionLabel === 'Parameters By Location') &&
        !this.qappData[this.parametersQuestionId]
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
    closeConcernsWarningModal() {
      this.shouldDisplayConcernsWarning = false;
    },
    closeAddParametersWarningModal() {
      this.shouldDisplayAddParameter = false;
    },
    closeRemoveParametersWarningModal() {
      this.shouldDisplayRemoveParameter = false;
    },
    triggerConcernsWarningModal(value) {
      if (value === 'N' && !!this.qappData[this.concernsQuestionId] && this.qappData[this.locationQuestionId]) {
        this.shouldDisplayConcernsWarning = true;
      }
    },
    async removeConcerns() {
      this.shouldDisplayConcernsWarning = false;
      this.dataError = null;
      await this.$store
        .dispatch('qapp/save', {
          qappId: this.$store.state.qapp.id,
          questionId: this.locConcernsQuestionId,
          value: null,
          valueId: 'remove_all_concerns',
        })
        .catch((error) => {
          if (this.dataError === null) this.dataError = error.response.data.error;
          else this.dataError += `<br/>${error.response.data.error}`;
        });
    },
    cancelYesNo() {
      this.shouldDisplayConcernsWarning = false;
      this.pendingData[this.concernsDifferByLocQuestionId] = 'Y';
    },
    async addRemoveParams() {
      this.dataError = null;

      if (this.removeParamValue !== 'No' || this.addParamValue !== '') {
        await Promise.all(
          this.currentQuestions.map(async (q) => {
            await this.$store
              .dispatch('qapp/save', {
                qappId: this.$store.state.qapp.id,
                questionId: q.id,
                value: this.paramSaveData ? this.paramSaveData[q.id] : this.pendingData[q.id],
                valueId: this.paramSaveValueId,
              })
              .catch((error) => {
                if (this.dataError === null) this.dataError = error.response.data.error;
                else this.dataError += `<br/>${error.response.data.error}`;
              });
          })
        );

        let filteredParams = [];
        this.qappData[this.paramsbyLocQuestionId].forEach((paramByLoc) => {
          if (paramByLoc.value !== 'Freshwater' || paramByLoc.value !== 'Saltwater') {
            paramByLoc.value.split(',').forEach((param) => {
              if (this.parameters.find((p) => p.id === parseInt(param, 10))) {
                filteredParams.push({
                  valueId: paramByLoc.valueId,
                  value: paramByLoc.value,
                  waterType: this.parameters.find((p) => p.id === parseInt(param, 10)).waterType,
                });
              }
            });
          }
          if (paramByLoc.value === 'Freshwater' || paramByLoc.value === 'Saltwater') {
            filteredParams.push({
              valueId: paramByLoc.valueId,
              value: '',
              waterType: paramByLoc.value,
            });
          }
        });

        filteredParams = uniqBy(filteredParams, 'valueId');

        if (this.addParamsArray.length !== 0 && this.addParamValue === 'Yes') {
          this.addParamsArray.forEach((param) => {
            filteredParams.forEach((filteredParam) => {
              if (this.parameters.find((p) => p.id === parseInt(param, 10)).waterType === filteredParam.waterType) {
                filteredParam.value = filteredParam.value !== '' ? `${filteredParam.value},${param}` : param;
              }
            });
          });
        }

        if (this.removeParamsArray.length !== 0 && this.removeParamValue === 'Yes') {
          this.removeParamsArray.forEach((param) => {
            filteredParams.forEach((filteredParam) => {
              if (this.parameters.find((p) => p.id === parseInt(param, 10)).waterType === filteredParam.waterType) {
                filteredParam.value = filteredParam.value
                  .split(',')
                  .filter((p) => p !== param)
                  .join(',');
              }
            });
          });
        }

        filteredParams.forEach((param) => {
          if (param.value === '') {
            param.value = param.waterType;
          }
        });

        if ((this.addParamValue === 'Yes' && filteredParams.length !== 0) || this.removeParamValue === 'Yes') {
          await this.$store
            .dispatch('qapp/updateData', {
              qappId: this.$store.state.qapp.id,
              questionId: this.paramsbyLocQuestionId,
              values: filteredParams,
            })
            .catch((error) => {
              if (this.dataError === null) this.dataError = error.response.data.error;
              else this.dataError += `<br/>${error.response.data.error}`;
            });
        }

        if (this.addParamValue !== '') this.shouldDisplayAddParameter = false;
        if (this.removeParamValue !== '') this.shouldDisplayRemoveParameter = false;

        // IE requires reload to avoid 403 error when applying parameters to Parameters By Location screen
        if (
          window.navigator.userAgent.indexOf('Firefox') === -1 &&
          window.navigator.userAgent.indexOf('Chrome') === -1 &&
          (this.addParamValue === 'Yes' || this.removeParamValue === 'Yes')
        ) {
          window.location.reload(true);
        }

        this.addParamValue = '';
        this.removeParamValue = '';

        if (this.pendingSection && !this.shouldDisplayRemoveParameter && !this.shouldDisplayAddParameter) {
          this.changeSection(this.pendingSection);
          this.pendingSection = null;
        }
      } else {
        this.shouldDisplayRemoveParameter = false;
        this.shouldDisplayAddParameter = false;
        this.removeParamValue = '';
        this.addParamValue = '';
        this.pendingData[this.parametersQuestionId] = this.qappData[this.parametersQuestionId];
      }
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
.parametersWarningModal .modal-content {
  width: 800px !important;
}

.example-text ul {
  list-style: inherit;
  margin-left: 45px;
}
</style>
