<template>
  <div class="clear">
    <Button label="Select All" type="primary" @click.native="selectAllParams"></Button>
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
          <p>{{ selectedLocation['Water Type'].replace('Salt', 'Marine') }}</p>
          <p>{{ selectedLocation.waterConcerns }}</p>
        </div>
      </div>
      <form ref="form" @submit.prevent="submitData">
        <fieldset>
          <legend>Selected {{ selectedLocation['Water Type'] }} Parameters</legend>
          <div class="border-container">
            <div v-if="getFilteredParams().length" class="field checkboxes-container">
              <div v-for="param in getFilteredParams()" class="field" :key="param.id">
                <input
                  class="is-checkradio is-info"
                  :id="param.id"
                  type="checkbox"
                  :value="param.id"
                  :checked="
                    pendingData.parametersByLocation
                      ? pendingData.parametersByLocation.split(',').includes(param.id.toString())
                      : false
                  "
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
            v-model="pendingData[question.questionName]"
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
      selectedLocation: {},
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
    selectedParams() {
      const selectedParams = this.qappData.parameters ? this.qappData.parameters.split(',') : [];
      return this.parameters.filter((param) => selectedParams.includes(param.id.toString()));
    },
    otherParameters() {
      return this.qappData.otherParameters ? JSON.parse(this.qappData.otherParameters) : [];
    },
  },
  methods: {
    async selectAllParams() {
      const updatedValues = this.locations.map((location) => {
        this.selectedLocation = location;
        return {
          valueId: location.valueId,
          value: this.getFilteredParams()
            .map((p) => p.id)
            .join(','),
        };
      });
      this.selectedLocation = {};
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        questionId: this.paramQuestion.id,
        values: updatedValues,
      });
      this.refreshLocationData();
    },
    refreshLocationData() {
      const locationQuestions = this.$store.state.structure.questions.filter(
        (q) => q.section.sectionLabel === 'Monitoring Locations'
      );
      const relevantQuestions = locationQuestions.concat(this.questions);
      const locations = [];
      this.qappData.locationId.forEach((val) => {
        const location = { valueId: val.valueId };
        relevantQuestions.forEach((q) => {
          if (this.qappData[q.questionName]) {
            const qappDataObject = this.qappData[q.questionName].find((datum) => datum.valueId === val.valueId);
            location[q.questionLabel] = qappDataObject ? qappDataObject.value : null;
          }
        });
        if (location['Water Quality Concerns']) {
          const locationConcerns = this.concerns.filter((concern) =>
            location['Water Quality Concerns'].split(',').includes(concern.code)
          );
          location.waterConcerns = locationConcerns.map((c) => c.label).join(', ');
        } else {
          const locationConcerns = this.concerns.filter((concern) =>
            this.qappData.waterConcerns.split(',').includes(concern.code)
          );
          location.waterConcerns = locationConcerns.map((c) => c.label).join(', ');
        }
        locations.push(location);
      });
      this.locations = locations;
    },
    onEdit(location) {
      this.isFormIncomplete = false;
      this.selectedLocation = location;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.questionName, location[q.questionLabel]);
      });
      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
    },
    getFilteredParams() {
      const params = this.selectedParams;
      const waterType = this.selectedLocation['Water Type'];
      let filteredParams = [];
      if (waterType === 'Fresh') {
        filteredParams = sortBy(params.filter((p) => p.waterType === 'Freshwater'), [(p) => p.parameter.toLowerCase()]);
        // Add other parameters that have water type of "Fresh"
        filteredParams.push(
          ...this.otherParameters.filter((p) => p.waterType === 'Fresh').map((p) => ({ id: p.name, label: p.name }))
        );
      } else {
        // salt or brackish types are both indicated by the "salt" boolean column
        filteredParams = sortBy(params.filter((p) => p.waterType === 'Saltwater'), [(p) => p.parameter.toLowerCase()]);
        // Add other parameters that have water type of "Salt"
        filteredParams.push(
          ...this.otherParameters.filter((p) => p.waterType === 'Salt').map((p) => ({ id: p.name, label: p.name }))
        );
      }
      return filteredParams;
    },
    submitData() {
      this.isFormIncomplete = false;
      this.questions.forEach((q) => {
        if (!this.pendingData[q.questionName] && q.questionName !== 'parametersByLocation')
          this.isFormIncomplete = true;
      });

      this.$nextTick().then(() => {
        if (this.$refs.alert) this.$refs.alert.$el.focus();
      });
      if (
        !this.isFormIncomplete &&
        (!this.qappData.parametersByLocation ||
          !this.qappData.parametersByLocation.find((param) => param.valueId === this.selectedLocation.valueId))
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
            location[q.questionLabel] = this.pendingData[q.questionName];
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
      if (question.questionName === 'parametersByLocation') {
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
