<template>
  <div class="clear">
    <label class="label is-size-4">Sample Design</label>
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveActionsCol="true"
      :shouldHaveGlobalActions="true"
      noDataMessage="No sample design information has been added for selected parameters."
      @onEdit="onEdit"
      @onDelete="onDelete"
      @onAdd="onAddInfo"
    />
    <SideNav
      v-if="isEnteringInfo"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Sample Design Information' : 'Add Sample Design Information'"
    >
      <form @submit.prevent="submitData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label class="label" :for="`question${question.id}`">{{ question.questionLabel }}</label>
          <input
            v-if="question.dataEntryType === 'text'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            type="text"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          />
          <input
            v-if="question.dataEntryType === 'number'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            type="number"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          />
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          ></textarea>
          <div v-if="question.dataEntryType === 'select'">
            <Multiselect
              v-if="question.questionLabel === 'Parameter'"
              v-model="pendingData[question.id]"
              :options="getParameters()"
              :placeholder="`Select ${question.questionLabel}`"
              label="label"
              track-by="id"
            ></Multiselect>
            <Multiselect
              v-else
              v-model="pendingData[question.id]"
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
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Sample Design Information"
      :itemLabel="
        shouldDeleteAll
          ? 'all sample design information'
          : `sample design information for ${selectedRow.parameterLabel}`
      "
      @close="() => (shouldShowDelete = false)"
      @onDelete="deleteData"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Table from '@/components/shared/Table';
import DeleteWarning from '@/components/shared/DeleteWarning';

export default {
  name: 'SampleDesign',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Button, SideNav, Table, DeleteWarning, Multiselect },
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
          key: 'parameterLabel',
          label: 'Parameter',
        },
        {
          key: 'Number of Sample Locations',
          label: 'Number of Sample Locations',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', ['parameters', 'locationRationales', 'sampleNumRationales']),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', ['parametersQuestionId']),
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    onEdit(row) {
      this.selectedRow = row;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.id, row[q.questionLabel]);
      });
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
    },
    onDelete(row) {
      this.shouldShowDelete = true;
      if (row) {
        this.selectedRow = row;
        this.shouldDeleteAll = false;
        this.shouldDeleteSingle = true;
      } else {
        this.shouldDeleteSingle = false;
        this.shouldDeleteAll = true;
      }
    },
    async onAddInfo() {
      this.pendingData = {};
      this.isEnteringInfo = true;
      this.selectedRow = null;
      this.shouldShowEdit = false;
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
        sampleData[q.questionLabel] = this.pendingData[q.id];
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
    async deleteData() {
      let valueIds = [];
      if (this.shouldDeleteSingle) {
        valueIds = [this.selectedRow.valueId];
      } else {
        valueIds = this.rows.map((r) => r.valueId);
      }
      const questionIds = this.questions.map((q) => q.id);
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds, questionIds });
      this.refreshData();
      this.shouldShowDelete = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
    refreshData() {
      this.rows = [];

      // Add rows to table if sample data already exists
      const sampleDesign = {};

      // Logic to loop through existing qapp data and set up rows for table
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        const question = this.questions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((field) => {
            if (typeof sampleDesign[field.valueId] === 'undefined') sampleDesign[field.valueId] = {};
            if (question.refName) {
              const ref = this[question.refName].find((r) => r.id === parseInt(field.value, 10));
              if (ref) {
                sampleDesign[field.valueId][key] = ref;
              } else if (field.value) {
                sampleDesign[field.valueId][key] = field.value.split(',');
              }
            } else {
              sampleDesign[field.valueId][key] = field.value;
            }
          });
        }
      });

      Object.keys(sampleDesign).forEach((sampleDesignId) => {
        const row = sampleDesign[sampleDesignId];
        this.rows.push({
          ...row,
          parameterLabel: row.Parameter.label,
          valueId: sampleDesignId,
        });
      });
    },
    getOptions(refName) {
      // get reference data array based on refName field in questions table
      return this[refName];
    },
    getParameters() {
      const params = [];
      const selectedParams = this.qappData[this.parametersQuestionId];
      if (selectedParams) {
        this.parameters.forEach((param) => {
          if (selectedParams.split(',').indexOf(param.id.toString()) > -1) {
            params.push(param);
          }
        });
      }
      return params;
    },
    cleanData() {
      // vue-multiselect sets values to objects - set values as id instead of the full object before posting to db
      const cleanedData = {};
      Object.keys(this.pendingData).forEach((qId) => {
        if (typeof this.pendingData[qId] === 'object') {
          // if array, store comma separate list of codes
          if (Array.isArray(this.pendingData[qId])) {
            const idArray = this.pendingData[qId].map((datum) => {
              return datum.id || datum;
            });
            cleanedData[qId] = idArray.join(',');
          } else {
            cleanedData[qId] = this.pendingData[qId].id;
          }
        } else {
          cleanedData[qId] = this.pendingData[qId];
        }
      });
      return cleanedData;
    },
    addOther(value, question) {
      const enteredVal = value.replace(/,/gi, ''); // replace all commas in entered value, since we split stored values by comma
      let newVal = this.pendingData[question.id];
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
