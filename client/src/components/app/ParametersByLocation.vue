<template>
  <div class="clear">
    <Table :columns="columns" :rows="locations" shouldHaveSingleAction="Edit" @onEdit="onEdit" />
    <SideNav
      v-if="isEnteringInfo"
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      title="Monitoring Location"
    >
      <div class="columns">
        <div class="column is-4">
          <p>Location ID</p>
          <p>Location Name</p>
          <p>Water Type</p>
          <p>Concerns</p>
        </div>
        <div class="column is-8">
          <p>{{ selectedLocation['Location ID'] }}</p>
          <p>{{ selectedLocation['Location Name'] }}</p>
          <p>{{ selectedLocation['Water Type'] }}</p>
          <p>{{ selectedLocation.waterConcerns }}</p>
        </div>
      </div>
      <form ref="form" @submit.prevent="submitData">
        <fieldset>
          <legend>Selected {{ selectedLocation['Water Type'] }} Parameters</legend>
          <div class="border-container">
            <div
              v-if="getFilteredParams(selectedParams, selectedLocation['Water Type']).length"
              class="field checkboxes-container"
            >
              <div
                v-for="param in getFilteredParams(selectedParams, selectedLocation['Water Type'])"
                class="field"
                :key="param.id"
              >
                <input
                  class="is-checkradio is-info"
                  :id="param.id"
                  type="checkbox"
                  :value="param.id"
                  :checked="isChecked(param.id)"
                  @change="updateData($event, paramQuestion)"
                />
                <label :for="param.id">{{ param.label }}</label>
              </div>
            </div>
            <div v-else class="field checkboxes-container">
              <i>There are no suggested parameters based on selected concerns</i>
            </div>
          </div>
        </fieldset>
        <div class="field" v-for="question in questions" :key="question.id">
          <label
            v-if="question.questionLabel !== 'Parameters By Location'"
            class="label"
            :for="`question${question.id}`"
            >{{ question.questionLabel }}</label
          >
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          ></textarea>
        </div>
        <Button label="Save" type="primary" submit />
      </form>
    </SideNav>
    <UnsavedWarning
      v-if="shouldDisplayUnsavedWarning"
      @onClose="() => (shouldDisplayUnsavedWarning = false)"
      @onSave="saveChanges"
      @onDiscard="discardChanges"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import getLocationsTableConcerns from '@/utils/getLocationsTableConcerns';
import unsavedChanges from '@/mixins/unsavedChanges';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Table from '@/components/shared/Table';
import sortBy from 'lodash/sortBy';

export default {
  name: 'ParametersByLocation',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Button, SideNav, Table },
  mixins: [unsavedChanges],
  data() {
    return {
      paramQuestion: this.questions[0],
      isEnteringInfo: false,
      shouldShowEdit: false,
      isFormIncomplete: false,
      selectedLocation: null,
      locations: [],
      pendingData: {},
      columns: [
        {
          key: 'Location ID',
          label: 'Location ID',
        },
        {
          key: 'Location Name',
          label: 'Location Name',
        },
      ],
    };
  },
  mounted() {
    this.refreshLocationData();
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', [
      'parameters',
      'concerns',
      'locationTypes',
      'collectionMethods',
      'coordRefSystems',
      'concerns',
      'waterTypes',
    ]),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', [
      'parametersQuestionId',
      'concernsDifferByLocQuestionId',
      'concernsQuestionId',
      'paramsbyLocQuestionId',
    ]),
    selectedParams() {
      const selectedParams = this.qappData[this.parametersQuestionId].split(',');
      const params = [];
      selectedParams.forEach((param) => {
        if (this.parameters.find((p) => p.id === parseInt(param, 10))) {
          params.push(this.parameters.find((p) => p.id === parseInt(param, 10)));
        }
      });
      return params;
    },
    checkedParams() {
      return this.pendingData[this.paramQuestion.id] ? this.pendingData[this.paramQuestion.id].split(',') : [];
    },
  },
  methods: {
    refreshLocationData() {
      this.locations = [];
      // Add markers to map if location data already exists
      const locations = {};
      // Logic to loop through existing qapp data and set up markers to be used by leaflet map
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        let locationQuestions = this.$store.state.structure.questions.filter(
          (q) => q.section.sectionLabel === 'Monitoring Locations'
        );
        const paramsByLocQuestions = this.$store.state.structure.questions.filter(
          (q) => q.section.sectionLabel === 'Parameters By Location'
        );
        locationQuestions = locationQuestions.concat(paramsByLocQuestions);
        const question = locationQuestions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((locationField) => {
            if (typeof locations[locationField.valueId] === 'undefined') locations[locationField.valueId] = {};
            if (question.refName === 'concerns') {
              locations[locationField.valueId][key] = this.concerns.filter(
                (r) => locationField.value && locationField.value.indexOf(r.code) > -1
              );
            } else if (question.refName === 'locationTypes' || question.refName === 'coordRefSystems') {
              locations[locationField.valueId][key] = this[question.refName].find((r) => r === locationField.value);
            } else {
              locations[locationField.valueId][key] = locationField.value;
            }
          });
        }
      });

      Object.keys(locations).forEach((locationId) => {
        const monLoc = locations[locationId];

        if (this.shouldShowConcerns() && !monLoc['Water Quality Concerns']) {
          monLoc['Water Quality Concerns'] = this.getConcerns();
        }
        getLocationsTableConcerns(monLoc, this.getConcerns());
        this.locations.push({
          ...monLoc,
          valueId: locationId,
          latLng: [parseFloat(monLoc['Location Latitude']), parseFloat(monLoc['Location Longitude'])],
        });
      });
    },
    onEdit(location) {
      this.isFormIncomplete = false;
      this.selectedLocation = location;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.id, location[q.questionLabel]);
      });
      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
    },
    getFilteredParams(params, waterType) {
      if (waterType === 'Fresh') {
        return sortBy(params.filter((p) => p.waterType === 'Freshwater'), [(p) => p.parameter.toLowerCase()]);
      }
      // salt or brackish types are both indicated by the "salt" boolean column
      return sortBy(params.filter((p) => p.waterType === 'Saltwater'), [(p) => p.parameter.toLowerCase()]);
    },
    isChecked(paramId) {
      return this.checkedParams.indexOf(paramId.toString()) > -1;
    },
    shouldShowConcerns() {
      return this.qappData[this.concernsDifferByLocQuestionId] === 'Y';
    },
    getConcerns() {
      const concerns = [];
      const selectedConcerns = this.qappData[this.concernsQuestionId];
      if (selectedConcerns) {
        this.concerns.forEach((concern) => {
          if (selectedConcerns.indexOf(concern.code) > -1) {
            concerns.push(concern);
          }
        });
      }
      return concerns;
    },
    submitData() {
      this.isFormIncomplete = false;
      this.questions.forEach((q) => {
        if (!this.pendingData[q.id] && q.id !== this.paramsbyLocQuestionId) this.isFormIncomplete = true;
      });

      this.$nextTick().then(() => {
        if (this.$refs.alert) this.$refs.alert.$el.focus();
      });

      if (
        !this.isFormIncomplete &&
        (!this.qappData[this.paramsbyLocQuestionId] ||
          !this.qappData[this.paramsbyLocQuestionId].find((param) => param.valueId === this.selectedLocation.valueId))
      ) {
        this.addData();
      } else {
        this.editData();
      }
    },
    async addData() {
      this.locations.forEach((location) => {
        if (location.valueId === this.selectedLocation.valueId) {
          this.questions.forEach((q) => {
            location[q.questionLabel] = this.pendingData[q.id];
          });
        }
      });

      this.$emit('saveData', null, this.selectedLocation.valueId, this.pendingData);
      this.isEnteringInfo = false;
      this.shouldShowEdit = false;
      this.pendingData = {};
    },
    async editData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedLocation.valueId,
        values: this.pendingData,
      });
      this.refreshLocationData(); // refresh markers and table data after editing
      this.isEnteringInfo = false;
    },
    updateData(e, question) {
      this.hasSaved = false;
      if (question.refName) {
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
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.border-container {
  border: solid 1px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.checkboxes-container {
  background-color: $darkBlue;
  max-height: 230px;
  overflow: auto;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

textarea {
  height: 4em;
}

//For IE 11
legend {
  color: white;
}
</style>
