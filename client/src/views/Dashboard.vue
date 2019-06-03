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
    <div class="columns">
      <div class="column table-container">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th v-for="field in fields" :key="field.key">
                {{ field.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="qapps.length === 0">
              <td colspan="5">No data available. Please add a QAPP to continue.</td>
            </tr>
            <tr v-for="qapp in qapps" :key="qapp.id">
              <td>{{ qapp.title }}</td>
              <td>{{ qapp.description }}</td>
              <td>{{ qapp.updatedAt.substr(0, 10) }}</td>
              <td>{{ qapp.completedSections.length * 10 }}%</td>
              <td>
                <div class="field is-grouped">
                  <div class="control">
                    <Button
                      label="Edit"
                      type="primary"
                      icon="edit"
                      :shouldShowIcon="true"
                      @click.native="editQapp(qapp)"
                    />
                  </div>
                  <div class="control">
                    <Button
                      label="Delete"
                      type="danger"
                      icon="trash-alt"
                      :shouldShowIcon="true"
                      @click.native="onDeleteQapp(qapp)"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
          <div class="field">
            <label class="label">Description</label>
            <input class="input" type="text" required placeholder="Enter a description" v-model="description" />
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
    <SideNav v-if="shouldShowDelete" :handleClose="() => (shouldShowDelete = false)" title="Delete QAPP">
      <template #default="props">
        <Alert :message="`Are you sure you want to delete ${selectedQapp.title}?`" type="warning" />
        <hr />
        <div class="field is-grouped">
          <div class="control">
            <Button label="Delete" type="info" :preventEvent="true" @click.native="handleDeleteQapp" />
          </div>
          <div class="control">
            <Button label="Cancel" type="cancel" @click.native="props.close" />
          </div>
        </div>
      </template>
    </SideNav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from '@/components/shared/Alert';
import SideNav from '@/components/shared/SideNav';
import Button from '@/components/shared/Button';

export default {
  components: { Alert, SideNav, Button },
  async mounted() {
    this.$store.commit('qapp/CLEAR_CURRENT_QAPP');
    this.getQapps();
  },
  methods: {
    ...mapActions('qapps', ['getQapps']),
    async onDeleteQapp(qapp) {
      this.shouldShowAdd = false;
      this.shouldShowDelete = true;
      this.selectedQapp = qapp;
    },
    clearName() {
      this.title = '';
      this.description = '';
    },
    async handleSubmit() {
      await this.$store.dispatch('qapps/add', {
        userId: this.$auth.user().id,
        title: this.title,
        description: this.description,
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
      fields: [
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'updatedAt',
          label: 'Date Updated',
        },
        {
          key: 'progress',
          label: 'Progress',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      title: '',
      description: '',
      selectedQapp: null,
    };
  },
  computed: {
    qapps() {
      return this.$store.state.qapps.data;
    },
  },
};
</script>
