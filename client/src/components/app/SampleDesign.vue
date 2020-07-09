<template>
  <div class="clear">
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveSingleAction="'Edit'"
      :shouldHaveGlobalActions="false"
      noDataMessage="No sampling design information has been added for selected parameters."
      @onEdit="onEdit"
    />
    <SideNav
      v-if="isEnteringInfo"
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Sampling Design Information' : 'Add Sampling Design Information'"
    >
      <form ref="form" @submit.prevent="submitData">
        <div class="columns">
          <div class="column is-4">
            <p>Parameter</p>
            <p>Location ID</p>
            <p>Location Name</p>
            <p>Water Type</p>
            <p>Concerns</p>
          </div>
          <div class="column is-8">
            <p>{{ selectedRow.parameterLabel }}</p>
            <p>{{ selectedRow['Location ID'] }}</p>
            <p>{{ selectedRow['Location Name'] }}</p>
            <p>{{ selectedRow['Water Type'] }}</p>
            <p>{{ selectedRow.waterConcerns }}</p>
          </div>
        </div>
        <div
          class="field"
          v-for="question in questions.filter((q) => q.questionLabel !== 'Parameter')"
          :key="question.id"
        >
          <label class="label" :for="`question${question.id}`">{{ question.questionLabel }}</label>
          <input
            v-if="question.dataEntryType === 'number'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            type="number"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            :required="question.questionLabel != 'Lab Duplicates' && question.questionLabel != 'Lab Blanks'"
          />
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            :placeholder="
              `EPA recommends 10% QC samples per sampling event (e.g., 2 QC samples per 20 sites sampled) which can be field blanks, replicates or duplicates, or co-located samples.`
            "
            :maxlength="question.maxLength"
            required
          ></textarea>
          <div v-if="question.dataEntryType === 'select'">
            <Multiselect
              v-if="question.questionLabel === 'Parameter'"
              v-model="pendingData[question.questionName]"
              :options="getParameters()"
              :placeholder="`Select ${question.questionLabel}`"
              label="label"
              track-by="id"
            ></Multiselect>
            <Multiselect
              v-else
              v-model="pendingData[question.questionName]"
              :options="getOptions(question.refName)"
              :multiple="true"
              :taggable="true"
              tag-placeholder="Add as other rationale"
              placeholder="Select rationale, or type to specify other rationale"
              @tag="addOther($event, question)"
            ></Multiselect>
          </div>
        </div>
        <Button
          :label="shouldShowEdit ? 'Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
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
import Multiselect from 'vue-multiselect';
import unsavedChanges from '@/mixins/unsavedChanges';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Table from '@/components/shared/Table';

export default {
  name: 'SampleDesign',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Button, SideNav, Table, Multiselect },
  mixins: [unsavedChanges],
  data() {
    return {
      isEnteringInfo: false,
      shouldShowEdit: false,
      shouldShowDelete: false,
      shouldDeleteAll: false,
      shouldDeleteSingle: false,
      selectedRow: null,
      pendingData: {},
      rows: [],
      columns: [
        {
          key: 'Location ID',
          label: 'Location ID',
        },
        {
          key: 'parameterLabel',
          label: 'Parameter/Method',
        },
        {
          key: 'Lab Blanks',
          label: 'Lab Blanks',
        },
        {
          key: 'Lab Spikes',
          label: 'Lab Spikes',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', ['parameters', 'locationRationales', 'sampleNumRationales', 'concerns']),
    ...mapState('structure', ['sections']),
    ...mapGetters('qapp', ['qappData']),
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    onEdit(row) {
      this.selectedRow = row;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.questionName, row[q.questionLabel]);
      });
      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
    },
    submitData() {
      if (this.shouldShowEdit) {
        this.editData();
      } else {
        this.addData();
      }
    },
    async editData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedRow.valueId,
        values: this.cleanData(this.pendingData),
      });
      this.refreshData();
      this.isEnteringInfo = false;
    },
    addData() {
      const sampleData = {};
      this.questions.forEach((q) => {
        sampleData[q.questionLabel] = this.pendingData[q.questionName];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (this.rows.length) {
        newValueId = Math.max(...this.rows.map((row) => row.valueId)) + 1;
      }

      this.rows.push({
        ...sampleData,
        parameterLabel: sampleData.Parameter.label,
        valueId: newValueId,
      });

      // Emit saveData to parent component to save to DB
      this.$emit('saveData', null, newValueId, this.cleanData(this.pendingData));

      this.isEnteringInfo = false;
      this.pendingData = {};
    },

    refreshData() {
      const locationQuestions = this.$store.state.structure.questions.filter(
        (q) => q.section.sectionLabel === 'Monitoring Locations'
      );
      // const relevantQuestions = locationQuestions.concat(this.questions);
      const rows = [];
      let currentValueId = 1;
      this.qappData.locationId.forEach((val) => {
        const location = {};
        locationQuestions.forEach((q) => {
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

        const paramsByLocation = this.qappData.parametersByLocation
          .find((p) => {
            return p.valueId === val.valueId;
          })
          .value.split(',');
        paramsByLocation.forEach((paramId) => {
          const parameterSampleData = { Parameter: paramId };
          this.questions.forEach((q) => {
            if (this.qappData[q.questionName]) {
              const paramValueObject = this.qappData.sampleParameter.find((datum) => datum.value === paramId);
              if (paramValueObject) {
                const qappDataObject = this.qappData[q.questionName].find(
                  (datum) => datum.valueId === paramValueObject.valueId
                );
                parameterSampleData[q.questionLabel] = qappDataObject ? qappDataObject.value : null;
              }
            }
          });
          if (!isNaN(paramId)) {
            const parameter = this.parameters.find((p) => {
              if (p.id === parseInt(paramId, 10)) {
                return p;
              }
            });
            rows.push({
              ...location,
              'Sample Location ID': location['Location ID'],
              ...parameterSampleData,
              parameterLabel: parameter.label,
              valueId: currentValueId,
            });
            currentValueId += 1;
          } else if (isNaN(paramId)) {
            rows.push({
              ...location,
              'Sample Location ID': location['Location ID'],
              ...parameterSampleData,
              parameterLabel: paramId,
              valueId: currentValueId,
            });
            currentValueId += 1;
          }
        });
      });
      this.rows = rows;
    },
    getOptions(refName) {
      // get reference data array based on refName field in questions table
      return this[refName];
    },
    getParameters() {
      const params = [];
      const selectedParameters = this.qappData.parameters;

      if (selectedParameters) {
        const paramIds = selectedParameters.split(',');
        this.parameters.forEach((param) => {
          if (paramIds.indexOf(param.id.toString()) > -1) {
            params.push(param);
          }
        });

        paramIds.forEach((param) => {
          if (isNaN(param)) {
            // eslint-disable-line
            params.push({
              id: param,
              label: param,
            });
          }
        });
      }
      return params;
    },
    cleanData() {
      // vue-multiselect sets values to objects - set values as id instead of the full object before posting to db
      const cleanedData = {};
      Object.keys(this.pendingData).forEach((qName) => {
        if (typeof this.pendingData[qName] === 'object') {
          // if array, store comma separate list of codes
          if (Array.isArray(this.pendingData[qName])) {
            const idArray = this.pendingData[qName].map((datum) => {
              return datum.id || datum;
            });
            cleanedData[qName] = idArray.join(',');
          } else {
            cleanedData[qName] = this.pendingData[qName].id;
          }
        } else {
          cleanedData[qName] = this.pendingData[qName];
        }
      });
      return cleanedData;
    },
    addOther(value, question) {
      const enteredVal = value.replace(/,/gi, ''); // replace all commas in entered value, since we split stored values by comma
      let newVal = this.pendingData[question.questionName];
      // if values already exist for this question, push entered value into array, otherwise set as array
      if (newVal) newVal.push(enteredVal);
      else newVal = [enteredVal];
      // set pending data object to the new value
      this.$set(this.pendingData, question.id, newVal);
    },
  },
};
</script>

<style scoped>
.clear {
  clear: both;
}

textarea {
  height: 6em;
}
</style>
