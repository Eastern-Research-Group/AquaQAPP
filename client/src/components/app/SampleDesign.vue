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
          v-for="question in questions.filter(
            (q) => q.questionLabel !== 'Parameter' && q.questionLabel !== 'Sample Location ID'
          )"
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
  components: { Button, SideNav, Table },
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
          label: 'Parameter',
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
        values: this.pendingData,
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
      this.$emit('saveData', null, newValueId, this.pendingData);

      this.isEnteringInfo = false;
      this.pendingData = {};
    },

    refreshData() {
      const locationQuestions = this.$store.state.structure.questions.filter(
        (q) => q.section.sectionLabel === 'Monitoring Locations'
      );

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
          if (!Number.isNaN(Number(paramId))) {
            const parameter = this.parameters.find((p) => p.id === parseInt(paramId, 10));
            rows.push({
              ...location,
              'Sample Location ID': location['Location ID'],
              ...parameterSampleData,
              parameterLabel: parameter ? parameter.label : paramId, // Add fallback to paramId in case user entered number as "other" parameter
              valueId: currentValueId,
            });
            currentValueId += 1;
          } else if (Number.isNaN(Number(paramId))) {
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
