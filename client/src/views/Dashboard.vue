<template>
  <div class="main-view">
    <b-row>
      <b-col>
        <h2>Dashboard</h2>
      </b-col>
      <b-col align-self="end" md="1">
        <b-button class="add-button" size="lg" align-self="end" @click="onAddQapp" v-b-modal.modalPrevent>
          Add
        </b-button>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-table striped hover :items="this.$store.state.qapps.data" :fields="fields">
        <template slot="title" slot-scope="data">
          <a href="#" @click="editQapp(data.item)">{{ data.value }}</a>
        </template>
        <template slot="edit" slot-scope="data">
          <div id="edit-container">
            <font-awesome-icon class="icon" id="edit-icon" icon="edit" @click="editQapp(data.item)" />
            <font-awesome-icon class="icon" icon="trash-alt" @click="onDeleteQapp(data.item)" v-b-modal.modalPrevent />
          </div>
        </template>
      </b-table>
    </b-row>

    <SideNav v-if="isAdd" :handleOk="handleAddQapp" :handleShown="clearName">
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
    <SideNav v-if="isDelete" :handleOk="handleDeleteQapp">
      <div>
        <b-alert show variant="danger">Are you sure you want to delete this qapp</b-alert><br />
        <p>{{ isCurrentQapp.title }}</p>
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
        instanceId: this.$instanceId,
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
          key: 'edit',
          label: 'Edit/Remove',
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

#edit-container {
  padding-left: 30px;
}

.icon {
  cursor: pointer;
}

#edit-icon {
  margin-right: 10px;
}

.d-block {
  color: white !important;
}
</style>
