<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title is-size-2">Dashboard</h1>
      </div>
      <div class="column has-text-right">
        <Button
          class="is-size-5"
          label="Add"
          type="success"
          @click.native="() => (shouldShowAdd = true)"
          :shouldShowIcon="true"
          icon="plus"
        />
      </div>
    </div>
    <Table
      :columns="columns"
      :rows="rows"
      :shouldHaveActionsCol="true"
      noDataMessage="No QAPPs available. Add a QAPP to continue."
      @onEdit="editQapp"
      @onDelete="onDeleteQapp"
    />
    <SideNav
      v-if="shouldShowAdd"
      :handleShown="clearName"
      :handleClose="() => (shouldShowAdd = false)"
      title="Add QAPP"
    >
      <!-- #deafult="props" gives us access to SideNav's props from inside this template tag -->
      <template #default="props">
        <form id="addQappForm" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label">Title</label>
            <input class="input" type="text" required placeholder="Enter a title" v-model="title" />
          </div>
          <hr />
          <div class="field is-grouped">
            <div class="control">
              <Button label="Submit" type="info" submit />
            </div>
            <div class="control">
              <Button label="Cancel" type="cancel" :preventEvent="true" @click.native="props.close" />
            </div>
          </div>
        </form>
      </template>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete QAPP"
      :itemLabel="selectedQapp.title"
      @close="() => (shouldShowDelete = false)"
      @onDelete="handleDeleteQapp"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Alert from '@/components/shared/Alert';
import SideNav from '@/components/shared/SideNav';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import DeleteWarning from '@/components/shared/DeleteWarning';

export default {
  components: { Alert, SideNav, Button, Table, DeleteWarning },
  async mounted() {
    this.$store.commit('qapp/CLEAR_CURRENT_QAPP');
    this.getQapps();
    this.getSections();
  },
  methods: {
    ...mapActions('qapps', ['getQapps']),
    ...mapActions('structure', ['getSections']),
    async onDeleteQapp(qapp) {
      this.shouldShowAdd = false;
      this.shouldShowDelete = true;
      this.selectedQapp = qapp;
    },
    clearName() {
      this.title = '';
    },
    async handleSubmit() {
      await this.$store.dispatch('qapps/add', {
        userId: this.$auth.user().id,
        title: this.title,
        archived: false,
      });
      this.$router.push({ name: 'navigate', params: { id: this.$store.state.qapp.id } });
    },
    editQapp(qapp) {
      this.$store.commit('qapp/SET_CURRENT_QAPP', qapp);
      this.$router.push({ name: 'navigate', params: { id: qapp.id } });
    },
    async handleDeleteQapp() {
      await this.$store.dispatch('qapps/delete', this.selectedQapp.id);
      this.$store.commit('qapp/CLEAR_CURRENT_QAPP');
      this.shouldShowDelete = false;
    },
  },
  data() {
    return {
      shouldShowAdd: false,
      shouldShowDelete: false,
      columns: [
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'updatedAt',
          label: 'Date Updated',
        },
        {
          key: 'progress',
          label: 'Progress',
        },
      ],
      title: '',
      selectedQapp: null,
    };
  },
  computed: {
    ...mapState('structure', ['sections']),
    qapps() {
      return this.$store.state.qapps.data;
    },
    rows() {
      return this.qapps.map((qapp) => {
        return {
          id: qapp.id,
          title: qapp.data.find((d) => d.questionId === 1).value,
          updatedAt: qapp.updatedAt.substring(0, 10),
          progress: `${Math.round((qapp.completedSections.length / this.sections.length) * 100)}%`,
        };
      });
    },
  },
};
</script>
