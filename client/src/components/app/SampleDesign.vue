<template>
  <div class="clear">
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveGlobalActions="false"
      noDataMessage="No sampling design information has been added for selected parameters."
    >
      <template #cell(3)="{ row }">
        <select
          required
          class="table-select"
          :value="getFrequencyValue(row.valueId)"
          @change="$emit('updateData', $event, questions.find((q) => q.questionName === 'frequency'), row.valueId)"
        >
          <option hidden selected disabled value="">Select a Frequency</option>
          <option v-for="frequency in frequencies" :key="frequency" :value="frequency">{{ frequency }}</option>
        </select>
      </template>
    </Table>
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
import Table from '@/components/shared/Table';

export default {
  name: 'SampleDesign',
  props: {
    questions: {
      type: Array,
      required: true,
    },
    pendingData: {
      type: Object,
      required: true,
    },
  },
  components: { Table },
  mixins: [unsavedChanges],
  data() {
    return {
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
        {
          key: 'Water Type',
          label: 'Water Type',
        },
        {
          key: 'Frequency of Sampling',
          label: 'Frequency of Sampling',
        },
      ],
      frequencies: [
        'Daily',
        'Twice per week',
        'Weekly',
        'Every other week',
        'Twice per month',
        'Monthly',
        'Every other month',
        'Weather events',
        'Once per season',
        'Once per year',
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
    getFrequencyValue(valueId) {
      if (!this.pendingData.frequency) return '';
      const existingValue = this.pendingData.frequency.find((d) => d.valueId === valueId);
      return existingValue ? existingValue.value : '';
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

        const paramsByLocationObj = this.qappData.parametersByLocation.find((p) => {
          return p.valueId === val.valueId;
        });
        const paramsByLocation = paramsByLocationObj ? paramsByLocationObj.value.split(',') : [];
        paramsByLocation.forEach((paramId) => {
          const parameterSampleData = { Parameter: paramId };
          this.questions.forEach((q) => {
            if (this.qappData[q.questionName]) {
              const paramValueArray = this.qappData.sampleParameter.filter((datum) => datum.value === paramId);

              if (paramValueArray.length) {
                const sampleLocationIdObject = this.qappData.sampleLocationId.find(
                  (datum) =>
                    datum.value === location['Location ID'] &&
                    paramValueArray.map((p) => p.valueId).includes(datum.valueId)
                );
                const qappDataObject = sampleLocationIdObject
                  ? this.qappData[q.questionName].find((datum) => datum.valueId === sampleLocationIdObject.valueId)
                  : null;
                parameterSampleData[q.questionLabel] = qappDataObject ? qappDataObject.value : null;

                // Manually enter location id and parameter id based on current location and parameter - avoids bugs with multiple locations with same params
                parameterSampleData['Sample Location ID'] = location['Location ID'];
                parameterSampleData.Parameter = paramId;
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
  },
};
</script>

<style scoped lang="scss">
.is-multiline .column {
  padding-top: 0;
  padding-bottom: 0;
}

.clear {
  clear: both;
}

.table-select {
  padding: 5px;
  font-size: 1rem;

  &:invalid {
    color: #a9a9a9;
  }

  option {
    color: #363636;
  }

  .placeholder {
    color: #a9a9a9;
  }
}

textarea {
  height: 6em;
}
</style>
