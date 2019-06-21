<template>
  <div class="clear">
    <label class="label is-size-4">Project Organization/Personnel</label>
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveActionsCol="true"
      :shouldHaveGlobalActions="true"
      noDataMessage="No personnel have been added. Add personnel to continue."
      @onEdit="onEdit"
      @onDelete="onDelete"
      @onAdd="onAddInfo"
    />
    <SideNav
      v-if="isEnteringInfo"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Org/Personnel' : 'Add Org/Personnel'"
    >
      <form @submit.prevent="submitPersonnelData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label
            v-if="
              question.dataEntryType === 'text' ||
                question.dataEntryType === 'largeText' ||
                question.dataEntryType === 'email' ||
                question.dataEntryType === 'tel'
            "
            class="label"
            :for="`question${question.id}`"
            >{{ question.questionLabel }}</label
          >
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
            v-if="question.dataEntryType === 'email'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            type="email"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          />
          <input
            v-if="question.dataEntryType === 'tel'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            type="tel"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            oninvalid="this.setCustomValidity('Enter phone number in the following format: 123-456-7890')"
            oninput="this.setCustomValidity('')"
          />
          <small v-if="question.dataEntryType === 'tel'">Format: 123-456-7890</small>
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
          <div class="field" v-if="question.dataEntryType === 'singleCheckbox'">
            <input
              class="is-checkradio"
              :id="question.id"
              type="checkbox"
              true-value="X"
              false-value=""
              v-model="pendingData[question.id]"
              :disabled="isPrimaryContactDisabled"
            />
            <label :for="question.id">{{ question.questionLabel }}</label>
          </div>
        </div>
        <Button
          :label="shouldShowEdit ? 'Edit and Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Personnel"
      :itemLabel="shouldDeleteAll ? 'all personnel' : selectedPersonnel['Full Name']"
      @close="() => (shouldShowDelete = false)"
      @onDelete="deletePersonnelData"
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
  name: 'PersonnelTable',
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
      selectedPersonnel: null,
      isPrimaryContactDisabled: false,
      pendingData: {},
      rows: [],
      columns: [
        {
          key: 'Full Name',
          label: 'Name',
        },
        {
          key: 'Title/Position',
          label: 'Title/Position',
        },
        {
          key: 'Include in distribution list?',
          label: 'Distribution List',
        },
        {
          key: 'Include in the approval list?',
          label: 'Approval Sheet',
        },
        {
          key: 'Organization',
          label: 'Organization',
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
    this.refreshPersonnelData();
  },
  methods: {
    onEdit(row) {
      this.selectedPersonnel = row;
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.id, row[q.questionLabel]);
      });
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;

      if (this.rows.find(() => row['Primary Contact'] === 'X') && row['Primary Contact'] !== 'X') {
        this.isPrimaryContactDisabled = true;
      } else {
        this.isPrimaryContactDisabled = false;
      }
    },
    onDelete(row) {
      this.shouldShowDelete = true;
      if (row) {
        this.selectedPersonnel = row;
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
      this.selectedPersonnel = null;
      this.shouldShowEdit = false;

      if (this.rows.find((row) => row['Primary Contact'] === 'X')) {
        this.isPrimaryContactDisabled = true;
      } else {
        this.isPrimaryContactDisabled = false;
      }
    },
    submitPersonnelData() {
      if (this.shouldShowEdit) {
        this.editPersonnelData();
      } else {
        this.addPersonnelData();
      }
    },
    async editPersonnelData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedPersonnel.valueId,
        values: this.pendingData,
      });
      this.refreshPersonnelData();
      this.isEnteringInfo = false;
    },
    addPersonnelData() {
      const personnelData = {};
      this.questions.forEach((q) => {
        personnelData[q.questionLabel] = this.pendingData[q.id];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (this.rows.length) {
        newValueId = Math.max(...this.rows.map((row) => row.valueId)) + 1;
      }

      this.rows.push({
        ...personnelData,
        valueId: newValueId,
      });

      this.$emit('saveData', null, newValueId, this.pendingData);

      this.isEnteringInfo = false;
      this.pendingData = {};
    },
    async deletePersonnelData() {
      let valueIds = [];
      if (this.shouldDeleteSingle) {
        valueIds = [this.selectedPersonnel.valueId];
      } else {
        valueIds = this.rows.map((r) => r.valueId);
      }
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds });
      this.refreshPersonnelData();
      this.shouldShowDelete = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
    refreshPersonnelData() {
      this.rows = [];

      // Add rows to table if personnel data already exists
      const personnel = {};

      // Logic to loop through existing qapp data and set up rows for table
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        const question = this.questions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((personnelField) => {
            if (typeof personnel[personnelField.valueId] === 'undefined') personnel[personnelField.valueId] = {};
            if (question.refName) {
              personnel[personnelField.valueId][key] = this[question.refName].find(
                (r) => r.id === parseInt(personnelField.value, 10)
              );
            } else {
              personnel[personnelField.valueId][key] = personnelField.value;
            }
          });
        }
      });

      Object.keys(personnel).forEach((personnelId) => {
        const row = personnel[personnelId];
        this.rows.push({
          ...row,
          valueId: personnelId,
          // ['Include in distribution list?']: row['Include in distribution list?'] === 'Yes' ? 'X' : '',
          // ['Include in the approval list?']: row['Include in the approval list?'] === 'Yes' ? 'X' : '',
        });
      });
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
