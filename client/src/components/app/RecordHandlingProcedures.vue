<template>
  <div class="clear">
    <Table
      :columns="columns"
      :rows="procedures"
      shouldHaveSingleAction="Edit"
      noDataMessage="No record handling procedures data found."
      @onEdit="onEdit"
    />
    <SideNav
      v-if="isEnteringInfo"
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      title="Edit Record Handling Procedures"
    >
      <div class="columns">
        <div class="column is-3">
          <p>Activity</p>
        </div>
        <div class="column is-9">
          <p>{{ selectedRow.activity }}</p>
        </div>
      </div>
      <form ref="form" @submit.prevent="submitData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label class="label" :for="`question${question.id}`">{{ question.questionLabel }}</label>
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            :placeholder="`${selectedRow.placeholder}`"
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

export default {
  name: 'RecordHandlingProcedures',
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
      isFormIncomplete: false,
      selectedRow: null,
      pendingData: {},
      columns: [
        {
          key: 'activity',
          label: 'Activity',
        },
        {
          key: 'Details',
          label: 'Details',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', ['procedures']),
    ...mapGetters('qapp', ['qappData']),
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    onEdit(row) {
      this.isFormIncomplete = false;
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
      this.isFormIncomplete = false;

      this.questions.forEach((q) => {
        if (!this.pendingData[q.questionName]) this.isFormIncomplete = true;
      });

      this.$nextTick().then(() => {
        if (this.$refs.alert) this.$refs.alert.$el.focus();
      });

      if (
        !this.isFormIncomplete &&
        (!this.qappData.details || !this.qappData.details.find((detail) => detail.valueId === this.selectedRow.id))
      ) {
        this.addData();
      } else {
        this.editData();
      }
    },
    async editData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedRow.id,
        values: this.cleanData(this.pendingData),
      });
      this.refreshData();
      this.isEnteringInfo = false;
    },
    addData() {
      const proceduresData = {};

      this.procedures.forEach((procedure) => {
        if (procedure.id === this.selectedRow.id) {
          this.questions.forEach((q) => {
            proceduresData[q.questionLabel] = this.pendingData[q.questionName];
            this.$set(this.selectedRow, 'Details', this.pendingData[q.questionName]);
          });
        }
      });

      // Emit saveData to parent component to save to DB
      this.$emit('saveData', null, this.selectedRow.id, this.cleanData(this.pendingData));

      this.isEnteringInfo = false;
      this.pendingData = {};
    },
    refreshData() {
      // Add rows to table if procedure data already exists
      const procedures = {};

      // Logic to loop through existing qapp data and set up rows for table
      Object.keys(this.qappData).forEach((qName) => {
        const datum = this.qappData[qName];
        const question = this.questions.find((q) => q.questionName === qName);
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((field) => {
            if (typeof procedures[field.valueId] === 'undefined') procedures[field.valueId] = {};
            procedures[field.valueId][key] = field.value;
          });
        }
      });

      Object.keys(procedures).forEach((activityId) => {
        const row = procedures[activityId];
        this.procedures.forEach((p) => {
          if (p.id === parseInt(activityId, 10)) {
            this.$set(p, 'Details', row.Details);
          }
        });
      });
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
  },
};
</script>

<style scoped>
.clear {
  clear: both;
}

textarea {
  height: 7em;
}
</style>
