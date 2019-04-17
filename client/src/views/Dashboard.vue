<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title is-size-2">Dashboard</h1>
      </div>
      <div class="column has-text-right">
        <button class="button is-success is-medium" @click="shouldShowAdd = true">
          <span class="fa fa-plus"></span>
          Add
        </button>
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
            <tr v-for="qapp in qapps" :key="qapp.id">
              <td>{{ qapp.title }}</td>
              <td>{{ qapp.description }}</td>
              <td>{{ qapp.updatedAt.substr(0, 10) }}</td>
              <td>Pending</td>
              <td>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-primary" @click="editQapp(qapp)">
                      <span class="fa fa-edit"></span>
                      Edit
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-danger" @click="onDeleteQapp(qapp)">
                      <span class="fa fa-trash-alt"></span>
                      Delete
                    </button>
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
      :handleClose="() => (this.shouldShowAdd = false)"
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
              <button class="button is-info">
                Submit
              </button>
            </div>
            <div class="control">
              <button class="button has-background-grey-light" @click.prevent="props.close">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </template>
    </SideNav>
    <SideNav v-if="shouldShowDelete" title="Delete QAPP" :handleClose="() => (this.shouldShowDelete = false)">
      <template #default="props">
        <Alert :message="`Are you sure you want to delete ${currentQapp.title}?`" type="warning" />
        <hr />
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-info" @click="handleDeleteQapp">
              Delete
            </button>
          </div>
          <div class="control">
            <button class="button has-background-grey-light" @click.prevent="props.close">
              Cancel
            </button>
          </div>
        </div>
      </template>
    </SideNav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from '@/components/Alert';
import SideNav from '../components/SideNav';

export default {
  components: { Alert, SideNav },
  async mounted() {
    this.currentQapp = null;
    this.getQapps();
  },
  methods: {
    ...mapActions('qapps', ['getQapps']),
    async onDeleteQapp(qapp) {
      this.shouldShowAdd = false;
      this.shouldShowDelete = true;
      this.currentQapp = qapp;
    },
    clearName() {
      this.title = '';
      this.description = '';
    },
    async handleSubmit() {
      await this.$store.dispatch('qapp/add', {
        userId: this.$auth.user().id,
        projectId: this.$projectId,
      });
      this.$router.push('navigate');
    },
    editQapp(qapp) {
      this.currentQapp = qapp;
      this.$router.push('navigate');
    },
    async handleDeleteQapp() {
      await this.$store.dispatch('qapp/delete');
      this.shouldShowDelete = false;
      this.currentQapp = null;
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
    };
  },
  computed: {
    qapps() {
      return this.$store.state.qapps.data;
    },
    currentQapp: {
      get() {
        return this.$store.state.qapp.currentQapp;
      },
      set(value) {
        this.$store.commit('qapp/SET_CURRENT_QAPP', value);
      },
    },
    title: {
      get() {
        return this.$store.state.qapp.title;
      },
      set(value) {
        this.$store.commit('qapp/SET_TITLE', value);
      },
    },
    description: {
      get() {
        return this.$store.state.qapp.description;
      },
      set(value) {
        this.$store.commit('qapp/SET_DESCRIPTION', value);
      },
    },
  },
};
</script>
