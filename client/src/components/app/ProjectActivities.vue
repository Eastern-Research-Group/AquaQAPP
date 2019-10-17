<template>
  <div class="clear">
    <Table
      class="activities"
      :columns="columns"
      :rows="rows"
      :shouldHaveActionsCol="true"
      :shouldHaveGlobalActions="true"
      noDataMessage="No activities have been added. Add activities to continue."
      @onEdit="onEdit"
      @onDelete="onDelete"
      @onAdd="onAddInfo"
    />
    <SideNav
      v-if="isEnteringInfo"
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Activity and Schedule' : 'Add Activity and Schedule'"
    >
      <form ref="form" @submit.prevent="submitData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label v-if="question.dataEntryType === 'largeText'" class="label" :for="`question${question.id}`">{{
            question.questionLabel
          }}</label>
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          ></textarea>
          <div class="field" v-if="question.dataEntryType === 'checkbox'">
            <input
              class="is-checkradio"
              :id="question.id"
              type="checkbox"
              true-value="X"
              false-value=""
              v-model="pendingData[question.id]"
            />
            <label :for="question.id">{{ question.questionLabel }}</label>
          </div>
        </div>
        <Alert v-if="error" :message="error" type="error" />
        <Button
          :label="shouldShowEdit ? 'Edit and Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Activity"
      :itemLabel="shouldDeleteAll ? 'all activities' : selectedActivity['Activity']"
      @close="() => (shouldShowDelete = false)"
      @onDelete="deleteActivityData"
    />
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
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import DeleteWarning from '@/components/shared/DeleteWarning';
import Alert from '@/components/shared/Alert';

export default {
  name: 'ProjectActivities',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Table, Button, SideNav, DeleteWarning, Alert },
  mixins: [unsavedChanges],
  data() {
    return {
      isEnteringInfo: false,
      shouldShowEdit: false,
      shouldShowDelete: false,
      shouldDeleteAll: false,
      shouldDeleteSingle: false,
      selectedActivity: null,
      error: null,
      pendingData: {},
      rows: [],
      columns: [
        {
          key: 'Activity',
          label: 'Activity',
        },
        {
          key: 'January',
          label: 'J',
        },
        {
          key: 'February',
          label: 'F',
        },
        {
          key: 'March',
          label: 'M',
        },
        {
          key: 'April',
          label: 'A',
        },
        {
          key: 'May',
          label: 'M',
        },
        {
          key: 'June',
          label: 'J',
        },
        {
          key: 'July',
          label: 'J',
        },
        {
          key: 'August',
          label: 'A',
        },
        {
          key: 'September',
          label: 'S',
        },
        {
          key: 'October',
          label: 'O',
        },
        {
          key: 'November',
          label: 'N',
        },
        {
          key: 'December',
          label: 'J',
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
    this.refreshActivityData();
  },
  methods: {
    onEdit(row) {
      this.selectedActivity = row;
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.id, row[q.questionLabel]);
      });
      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
      this.error = null;
    },
    onDelete(row) {
      this.shouldShowDelete = true;
      if (row) {
        this.selectedActivity = row;
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
      this.selectedActivity = null;
      this.shouldShowEdit = false;
      this.error = null;
    },
    submitData() {
      if (this.shouldShowEdit) {
        this.editActivityData();
      } else {
        this.addActivityData();
      }
    },
    async editActivityData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedActivity.valueId,
        values: this.pendingData,
      });
      this.refreshActivityData();
      this.isEnteringInfo = false;
    },
    addActivityData() {
      const activityData = {};
      this.questions.forEach((q) => {
        activityData[q.questionLabel] = this.pendingData[q.id];
      });

      // A unique value id allows us to save multiple sets of activities to the DB, each tied to a value id
      let newValueId = 1;
      if (this.rows.length) {
        newValueId = Math.max(...this.rows.map((row) => row.valueId)) + 1;
      }

      if (Object.values(activityData).filter((x) => x).length > 1) {
        this.rows.push({
          ...activityData,
          valueId: newValueId,
        });

        this.$emit('saveData', null, newValueId, this.pendingData);

        this.isEnteringInfo = false;
        this.pendingData = {};
      } else {
        this.error = 'User must select at least one month to add and save.';
      }
    },
    async deleteActivityData() {
      let valueIds = [];
      if (this.shouldDeleteSingle) {
        valueIds = [this.selectedActivity.valueId];
      } else {
        valueIds = this.rows.map((r) => r.valueId);
      }
      const questionIds = this.questions.map((q) => q.id);
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds, questionIds });
      this.refreshActivityData();
      this.shouldShowDelete = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
    refreshActivityData() {
      this.rows = [];

      // Add rows to table if activity data already exists
      const activity = {};

      // Logic to loop through existing qapp data and set up rows for table
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        const question = this.questions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((activityField) => {
            if (typeof activity[activityField.valueId] === 'undefined') activity[activityField.valueId] = {};
            if (question.refName) {
              activity[activityField.valueId][key] = this[question.refName].find(
                (r) => r.id === parseInt(activityField.value, 10)
              );
            } else {
              activity[activityField.valueId][key] = activityField.value;
            }
          });
        }
      });

      Object.keys(activity).forEach((activityId) => {
        const row = activity[activityId];
        this.rows.push({
          ...row,
          valueId: activityId,
        });
      });
    },
  },
};
</script>

<style scoped>
textarea {
  height: 6em;
}
</style>

<style>
.activities .table thead th,
.activities td {
  border-width: 2px !important;
}
</style>
