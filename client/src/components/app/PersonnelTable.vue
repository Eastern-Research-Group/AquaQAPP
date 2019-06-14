<template>
  <div class="section">
    <div class="columns">
      <div class="column table-container">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th v-for="field in fields" :key="field.key">
                {{ field.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="rows.length === 0">
              <td colspan="4">No personnel has been added. Add personnel to continue.</td>
            </tr>
            <tr v-for="row in rows" :key="row.id" ref="row">
              <td>{{ row['Full Name'] }}</td>
              <td>{{ row['Title/Position'] }}</td>
              <td>{{ row['Include in distribution list?'] === 'Yes' ? 'X' : '' }}</td>
              <td>{{ row['Include in the approval list?'] === 'Yes' ? 'X' : '' }}</td>
              <td>{{ row['Organization'] }}</td>
              <td>
                <div class="field is-grouped">
                  <div class="control">
                    <Button
                      label="Edit"
                      type="primary"
                      icon="edit"
                      :shouldShowIcon="true"
                      @click.native="onEdit(row)"
                    />
                  </div>
                  <div class="control">
                    <Button
                      label="Delete"
                      type="danger"
                      icon="trash-alt"
                      :shouldShowIcon="true"
                      @click.native="onDelete(row)"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="has-text-right btn-container">
      <Button label="Add" type="success" @click.native="onAddInfo" />
      <Button label="Delete All" type="danger" @click.native="onDelete()" />
    </div>
    <SideNav
      v-if="isEnteringInfo"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Org/Personnel' : 'Add Org/Personnel'"
    >
      <form @submit.prevent="submitPersonnelData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label
            v-if="question.dataEntryType === 'text' || question.dataEntryType === 'largeText'"
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
            required
          />
          <textarea
            v-if="question.dataEntryType === 'largeText'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            :placeholder="`Enter ${question.questionLabel}`"
            required
          ></textarea>
          <div class="field" v-if="question.dataEntryType === 'checkbox'">
            <input
              class="is-checkradio"
              :id="question.id"
              type="checkbox"
              true-value="Yes"
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
              true-value="Yes"
              false-value="No"
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
    <SideNav v-if="shouldShowDelete" title="Delete Personnel" :handleClose="() => (this.shouldShowDelete = false)">
      <template #default="props">
        <Alert v-if="shouldDeleteAll" :message="`Are you sure you want to delete all org/personnel?`" type="warning" />
        <Alert
          v-if="shouldDeleteSingle"
          :message="`Are you sure you want to delete ${selectedPersonnel['Full Name']}?`"
          type="warning"
        />
        <hr />
        <div class="field is-grouped">
          <div class="control">
            <Button label="Delete" type="info" @click.native="deletePersonnelData" />
          </div>
          <div class="control">
            <Button label="Cancel" type="cancel" :preventEvent="true" @click.native="props.close" />
          </div>
        </div>
      </template>
    </SideNav>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Alert from '@/components/shared/Alert';

export default {
  name: 'PersonnelTable',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Button, SideNav, Alert },
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
      fields: [
        {
          key: 'personnelName',
          label: 'Name',
        },
        {
          key: 'personnelPosition',
          label: 'Title/Position',
        },
        {
          key: 'distributionList',
          label: 'Distribution List',
        },
        {
          key: 'approvalSheet',
          label: 'Approval Sheet',
        },
        {
          key: 'organization',
          label: 'Organization',
        },
        {
          key: 'actions',
          label: 'Actions',
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

      if (row['Primary Contact'] === 'Yes') {
        this.isPrimaryContactDisabled = false;
      } else if (row['Primary Contact'] === 'No' || !row['Primary Contact']) {
        this.isPrimaryContactDisabled = true;
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

      if (this.qappData) {
        Object.keys(this.qappData).forEach(() => {
          const datum = this.qappData[8];
          if (Array.isArray(datum)) {
            this.isPrimaryContactDisabled = datum.some((d) => d.value === 'Yes');
          } else {
            this.isPrimaryContactDisabled = false;
          }
        });
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
        });
      });
    },
  },
};
</script>

<style scoped>
.btn-container .button {
  margin-left: 1em;
  width: 6em;
}

textarea {
  height: 6em;
}
</style>
