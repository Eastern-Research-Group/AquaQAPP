<template>
  <div class="clear">
    <label class="label is-size-4">Secondary Data</label>
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveActionsCol="true"
      :shouldHaveGlobalActions="true"
      noDataMessage="No secondary data have been added. Click the Add button to add data."
      @onEdit="onEdit"
      @onDelete="onDelete"
      @onAdd="onAddInfo"
    />
    <SideNav
      v-if="isEnteringInfo"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Secondary Data' : 'Add Secondary Data'"
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
        <Button
          :label="shouldShowEdit ? 'Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Secondary Data"
      :itemLabel="shouldDeleteAll ? 'all secondary data' : `data for ${selectedRow['Data Source']}`"
      @close="() => (shouldShowDelete = false)"
      @onDelete="deleteData"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Table from '@/components/shared/Table';
import DeleteWarning from '@/components/shared/DeleteWarning';

export default {
  name: 'SecondaryData',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Button, SideNav, Table, DeleteWarning },
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
          key: 'Data Source',
          label: 'Data Source',
        },
        {
          key: 'Waterbody Type',
          label: 'Waterbody Type',
        },
        {
          key: 'Sample Data Parameters',
          label: 'Sample Data Parameters',
        },
        {
          key: 'Sample Design',
          label: 'Sample Design',
        },
        {
          key: 'Geographic Area',
          label: 'Geographic Area',
        },
        {
          key: 'Web Data Links',
          label: 'Web Data Links',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
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
      const secondaryData = {};
      this.questions.forEach((q) => {
        secondaryData[q.questionLabel] = this.pendingData[q.id];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (this.rows.length) {
        newValueId = Math.max(...this.rows.map((row) => row.valueId)) + 1;
      }

      this.rows.push({
        ...secondaryData,
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

      // Add rows to table if secondary data already exists
      const secondaryData = {};

      // Logic to loop through existing qapp data and set up rows for table
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        const question = this.questions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((field) => {
            if (typeof secondaryData[field.valueId] === 'undefined') secondaryData[field.valueId] = {};
            secondaryData[field.valueId][key] = field.value;
          });
        }
      });

      Object.keys(secondaryData).forEach((valId) => {
        const row = secondaryData[valId];
        this.rows.push({
          ...row,
          valueId: valId,
        });
      });
    },
    getOptions(refName) {
      // get reference data array based on refName field in questions table
      return this[refName];
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
