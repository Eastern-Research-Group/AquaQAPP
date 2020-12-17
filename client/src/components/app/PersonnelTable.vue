<template>
  <div class="clear">
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
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Organization/Personnel' : 'Add Organization/Personnel'"
    >
      <form ref="form" @submit.prevent="submitData">
        <Alert
          v-if="isFormIncomplete"
          ref="alert"
          type="error"
          message="All fields are required. Please enter all fields to submit."
          tabindex="0"
        />
        <div class="field" v-for="question in questions" :key="question.id">
          <label
            v-if="['text', 'email', 'tel', 'select'].indexOf(question.dataEntryType) !== -1"
            class="label"
            :for="`question${question.id}`"
            >{{ question.questionLabel }}</label
          >
          <input
            v-if="question.dataEntryType === 'text'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            type="text"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          />
          <input
            v-if="question.dataEntryType === 'email'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            type="email"
            :placeholder="`Enter ${question.questionLabel}`"
            :maxlength="question.maxLength"
            required
          />
          <input
            v-if="question.dataEntryType === 'tel'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
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
          <div class="field" v-if="question.dataEntryType === 'checkbox'">
            <input
              class="is-checkradio"
              :id="question.id"
              type="checkbox"
              true-value="X"
              false-value=""
              v-model="pendingData[question.questionName]"
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
              v-model="pendingData[question.questionName]"
              :disabled="isPrimaryContactDisabled"
            />
            <label :for="question.id">{{ question.questionLabel }}</label>
          </div>
          <div v-if="question.dataEntryType === 'select'">
            <multiselect
              v-model="pendingData[question.questionName]"
              :options="combinedRoles"
              :multiple="true"
              :taggable="true"
              tag-placeholder="Add this as a new role"
              :placeholder="`Select roles, or type to add other roles`"
              label="label"
              track-by="code"
              @tag="addRole($event, question)"
              @remove="removeRole($event, question)"
            ></multiselect>
          </div>
          <div v-if="question.questionName === 'roles'" class="other-roles-container">
            <div class="field" v-for="role in otherRoles" :key="role.code">
              <label class="label" :for="`question${getQuestionId('responsibilities')}${role.valueId}`">
                {{ role.label }} Responsibilities
              </label>
              <textarea
                :id="`question${getQuestionId('responsibilities')}${role.valueId}`"
                v-model="pendingData.responsibilities[otherRoles.indexOf(role)].value"
                class="input"
                placeholder="Enter Responsibilities"
                :maxlength="4000"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <Button label="Save" :type="shouldShowEdit ? 'primary' : 'success'" submit />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Personnel"
      :itemLabel="shouldDeleteAll ? 'all personnel' : selectedPersonnel['Full Name']"
      @close="() => (shouldShowDelete = false)"
      @onDelete="deletePersonnelData"
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
import Multiselect from 'vue-multiselect';
import { mapState, mapGetters } from 'vuex';
import unsavedChanges from '@/mixins/unsavedChanges';
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Table from '@/components/shared/Table';
import DeleteWarning from '@/components/shared/DeleteWarning';
import '../../../static/bulma-multiselect.css';

export default {
  name: 'PersonnelTable',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Alert, Button, SideNav, Table, DeleteWarning, Multiselect },
  mixins: [unsavedChanges],
  data() {
    return {
      isEnteringInfo: false,
      shouldShowEdit: false,
      shouldShowDelete: false,
      shouldDeleteAll: false,
      shouldDeleteSingle: false,
      selectedPersonnel: null,
      isPrimaryContactDisabled: false,
      isFormIncomplete: false,
      shouldDisplayResponsibilities: false,
      pendingData: {},
      rows: [],
      otherRoles: [],
      columns: [
        {
          key: 'Full Name of Personnel',
          label: 'Name',
        },
        {
          key: 'RolesList',
          label: 'Roles',
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
          key: 'Organization Name',
          label: 'Organization',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', ['roles']),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', ['getQuestionId']),
    combinedRoles() {
      return this.roles.concat(this.otherRoles);
    },
  },
  mounted() {
    this.refreshPersonnelData();
  },
  methods: {
    addRole(value, question) {
      let newValueId = 1;
      if (this.otherRoles.length) {
        newValueId = Math.max(...this.otherRoles.map((role) => role.valueId)) + 1;
      }

      const enteredVal = {
        code: `${newValueId} - ${value.replace(/,/gi, '')}`, // replace all commas in entered value, since we split stored values by comma
        label: value.replace(/,/gi, ''),
        valueId: newValueId,
      };

      const newResponsibility = {
        value: '',
        valueId: newValueId,
      };

      if (!this.pendingData.responsibilities) this.pendingData.responsibilities = [];
      this.$set(this.pendingData.responsibilities, this.pendingData.responsibilities.length, newResponsibility);

      this.otherRoles.push(enteredVal);
      this.shouldDisplayResponsibilities = true;

      let newVal = this.pendingData[question.questionName];
      // if values already exist for this question, push entered value into array, otherwise set as array
      if (newVal) newVal.push(enteredVal);
      else newVal = [enteredVal];
      // set pending data object to the new value
      this.$set(this.pendingData, question.questionName, newVal);
    },
    removeRole(value) {
      this.otherRoles = this.otherRoles.filter((role) => role.valueId !== value.valueId);
      if (this.pendingData.responsibilities && this.pendingData.responsibilities.length) {
        const responsibilitiesArray = this.pendingData.responsibilities.filter((r) => r.valueId !== value.valueId);
        this.$set(this.pendingData, 'responsibilities', responsibilitiesArray);
      }
      // If all other roles are cleared, clear all responsibilities
      if (!this.otherRoles.length) {
        this.$set(this.pendingData, 'responsibilities', []);
      }
    },
    onEdit(row) {
      this.isFormIncomplete = false;
      this.otherRoles = [];
      this.selectedPersonnel = row;
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.questionName, row[q.questionLabel]);
      });

      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;

      if (this.rows.find(() => row['Primary Contact'] === 'X') && row['Primary Contact'] !== 'X') {
        this.isPrimaryContactDisabled = true;
      } else {
        this.isPrimaryContactDisabled = false;
      }

      if (row.Roles.length) {
        row.Roles.forEach((role) => {
          if (role.valueId) this.otherRoles.push(role);
        });
      }
      if (row.Responsibilities && row.Responsibilities.length !== 0) {
        this.shouldDisplayResponsibilities = true;
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
      this.isFormIncomplete = false;
      this.pendingData = {};
      this.isEnteringInfo = true;
      this.selectedPersonnel = null;
      this.shouldShowEdit = false;
      this.otherRoles = [];

      if (this.rows.find((row) => row['Primary Contact'] === 'X')) {
        this.isPrimaryContactDisabled = true;
      } else {
        this.isPrimaryContactDisabled = false;
      }
    },
    submitData() {
      // Check that all non-checkbox questions have been filled out before submitting
      this.isFormIncomplete = false;
      this.questions.forEach((q) => {
        if (
          q.dataEntryType !== 'checkbox' &&
          q.dataEntryType !== 'singleCheckbox' &&
          q.questionName !== 'responsibilities' &&
          !this.pendingData[q.questionName]
        ) {
          this.isFormIncomplete = true;
        }
      });
      // Check that a responsibility has been entered for each "other" role
      if (
        (this.pendingData.roles && !this.pendingData.roles.length) ||
        (this.otherRoles.length && this.otherRoles.length !== this.pendingData.responsibilities.length)
      ) {
        this.isFormIncomplete = true;
      }
      // nextTick waits until Alert is now displayed (based on its v-if), and then sets focus to the alert
      if (this.isFormIncomplete) {
        this.$nextTick().then(() => {
          this.$refs.alert.$el.focus();
        });
        return;
      }

      if (!this.isFormIncomplete && this.shouldShowEdit) {
        this.editPersonnelData();
      } else if (!this.isFormIncomplete) {
        this.addPersonnelData();
      }
    },
    async editPersonnelData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedPersonnel.valueId,
        values: this.cleanData(this.pendingData),
      });

      this.refreshPersonnelData();
      this.isEnteringInfo = false;
      this.shouldDisplayResponsibilities = false;
    },
    addPersonnelData() {
      const personnelData = {};
      this.questions.forEach((q) => {
        personnelData[q.questionLabel] = this.pendingData[q.questionName];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (this.rows.length) {
        newValueId = Math.max(...this.rows.map((row) => row.valueId)) + 1;
      }

      this.rows.push({
        ...personnelData,
        RolesList: personnelData.Roles.map((r) => r.label).join(', '),
        valueId: newValueId,
      });

      this.$emit('saveData', null, newValueId, this.cleanData(this.pendingData));

      this.shouldDisplayResponsibilities = false;
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
      const questionIds = this.questions.map((q) => q.id);
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds, questionIds });
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
      Object.keys(this.qappData).forEach((qName) => {
        const datum = this.qappData[qName];
        const question = this.questions.find((q) => q.questionName === qName);
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((personnelField) => {
            if (typeof personnel[personnelField.valueId] === 'undefined') personnel[personnelField.valueId] = {};
            if (question.refName === 'roles') {
              const values = [];
              personnelField.value.split(',').forEach((value) => {
                if (value.includes(' - ')) {
                  values.push({ code: value, label: value.slice(4), valueId: parseInt(value.slice(0, 1), 10) });
                } else {
                  values.push(this.roles.find((r) => r.code === value));
                }
              });
              personnel[personnelField.valueId][key] = values;
            } else if (question.questionName === 'responsibilities' && personnelField.value) {
              const newResponsibilities = [];
              personnelField.value.split(',').forEach((pValue) => {
                newResponsibilities.push({
                  value: pValue.slice(1),
                  valueId: parseInt(pValue.slice(0, 1), 10),
                });
              });

              personnel[personnelField.valueId][key] = newResponsibilities;
            } else if (
              question.refName &&
              question.refName !== 'roles' &&
              question.questionName !== 'responsibilities'
            ) {
              const ref = this[question.refName].find((r) => r.id === parseInt(personnelField.value, 10));
              if (ref) {
                personnel[personnelField.valueId][key] = ref;
              } else if (personnelField.value) {
                personnel[personnelField.valueId][key] = personnelField.value.split(',');
              }
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
          RolesList: row.Roles ? row.Roles.map((r) => r.label).join(', ') : '',
          valueId: personnelId,
        });
      });
    },
    cleanData() {
      // vue-multiselect sets values to objects - set values as id instead of the full object before posting to db
      const cleanedData = {};
      Object.keys(this.pendingData).forEach((qName) => {
        if (this.pendingData[qName] !== null && typeof this.pendingData[qName] === 'object') {
          // if array, store comma separate list of codes
          if (Array.isArray(this.pendingData[qName])) {
            const codesArray = this.pendingData[qName].map((datum) => {
              return datum.code || `${datum.valueId}${datum.value}`;
            });
            cleanedData[qName] = codesArray.join(',');
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
  height: 6em;
}

.other-roles-container {
  margin: 0.75rem 0 0 0.75rem;
}
</style>
