<template>
  <div class="main-view">
    <b-row>
      <b-col>
        <h2>Dashboard</h2>
      </b-col>
      <b-col class="text-right">
        <b-button variant="success" size="lg" @click="onAddQapp" v-b-modal.modalPrevent>
          <span class="fa fa-plus"></span>
          Add
        </b-button>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-table striped hover :items="this.$store.state.qapps.data" :fields="fields">
          <template slot="updatedAt" slot-scope="data">
            {{ data.item.updatedAt.substr(0, 10) }}
          </template>
          <template slot="progress">
            Pending
          </template>
          <template slot="actions" slot-scope="data" class="text-center">
            <b-button @click="editQapp(data.item)" variant="primary" class="mr-1">
              <span id="edit-icon" class="fa fa-edit"></span>
              Edit
            </b-button>
            <b-button v-b-modal.modalPrevent @click="onDeleteQapp(data.item)" variant="danger">
              <span class="fa fa-trash-alt"></span>
              Delete
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <SideNav v-if="isAdd" :handleOk="handleAddQapp" :handleShown="clearName" title="Add QAPP">
      <form id="addQappForm" @submit.stop.prevent="handleSubmit">
        <b-form-group>
          <b-form-input type="text" placeholder="Enter a title" v-model="title" :state="titleValidation" />
          <b-form-invalid-feedback :state="titleValidation">
            Title is required.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" placeholder="Enter a description" v-model="description" :state="descValidation" />
          <b-form-invalid-feedback :state="descValidation">
            Description is required.
          </b-form-invalid-feedback>
        </b-form-group>
      </form>
    </SideNav>
    <SideNav v-if="isDelete" :handleOk="handleDeleteQapp" title="Delete QAPP">
      <div>
        <b-alert show variant="danger">Are you sure you want to delete {{ isCurrentQapp.title }}?</b-alert>
      </div>
    </SideNav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BRow from 'bootstrap-vue/src/components/layout/row';
import BAlert from 'bootstrap-vue/src/components/alert/alert';
import SideNav from '../components/SideNav';

export default {
  components: { BAlert, BRow, SideNav },
  async mounted() {
    this.getQapps();
  },
  methods: {
    ...mapActions('qapps', ['getQapps']),
    onAddQapp() {
      this.isDelete = false;
      this.isAdd = true;
    },
    async onDeleteQapp(qapp) {
      this.isAdd = false;
      this.isDelete = true;
      this.isCurrentQapp = qapp;
      this.$store.commit('qapp/SET_CURRENT_QAPP', qapp);
    },
    clearName() {
      this.title = '';
      this.description = '';
    },
    handleAddQapp(e) {
      // Prevent modal from closing
      e.preventDefault();
      if (!this.title) {
        this.titleHasError = true;
      } else if (!this.description) {
        this.descHasError = true;
      } else {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      await this.$store.dispatch('qapp/add', {
        userId: this.$auth.user().id,
        projectId: this.$projectId,
      });
      this.$router.push('navigate');
    },
    editQapp(qapp) {
      this.$store.commit('qapp/SET_CURRENT_QAPP', qapp);
      this.$router.push('navigate');
    },
    async handleDeleteQapp() {
      await this.$store.dispatch('qapp/delete');
      await this.$store.commit('qapp/SET_CURRENT_QAPP', null);
    },
  },
  data() {
    return {
      isAdd: false,
      isDelete: false,
      isCurrentQapp: '',
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
    title: {
      get() {
        return this.$store.state.qapp.title;
      },
      set(value) {
        if (value !== '') this.titleHasError = false;
        this.$store.commit('qapp/SET_TITLE', value);
      },
    },
    description: {
      get() {
        return this.$store.state.qapp.description;
      },
      set(value) {
        if (value !== '') this.descHasError = false;
        this.$store.commit('qapp/SET_DESCRIPTION', value);
      },
    },
    titleValidation() {
      return this.title.length > 0;
    },
    descValidation() {
      return this.description.length > 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  background-color: #fff;
}

.d-block {
  color: black !important;
}

.add-button {
  background-color: #3aa02b;
}

.icon {
  cursor: pointer;
}

.d-block {
  color: white !important;
}
</style>
