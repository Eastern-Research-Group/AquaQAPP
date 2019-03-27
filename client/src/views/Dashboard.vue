<template>
    <div class="main-view">
        <b-row>
            <b-col>
                <h2>Dashboard</h2>
            </b-col>
            <b-col align-self="end" md="1">
                <b-button
                    class="add-button"
                    size="lg"
                    align-self="end"
                    v-b-modal.modalPrevent>
                  Add
                </b-button>
            </b-col>
        </b-row>
        <br/>
        <b-row>
            <b-table striped hover :items="this.$store.state.qapps.data" :fields="fields">
                <template slot="title" slot-scope="data">
                    <a href="#" @click="editQapp(data.item)">{{ data.value }}</a>
                </template>
            </b-table>
        </b-row>

        <b-modal
            id="modalPrevent"
            ref="modal"
            @ok="handleOk"
            @shown="clearName"
        >
            <div class="d-block">Add a new QAPP</div>
            <br/>
            <form id="addQappForm" @submit.stop.prevent="handleSubmit">
                <b-form-group>
                    <b-form-input
                        type="text"
                        placeholder="Enter a title"
                        v-model="title"
                        :state="titleValidation"
                    />
                    <b-form-invalid-feedback :state="titleValidation">
                        Title is required.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        placeholder="Enter a description"
                        v-model="description"
                        :state="descValidation"
                    />
                    <b-form-invalid-feedback :state="descValidation">
                        Description is required.
                    </b-form-invalid-feedback>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';
import BRow from 'bootstrap-vue/src/components/layout/row';

export default {
  components: { BRow },
  async mounted() {
    this.getQapps();
  },
  methods: {
    ...mapActions('qapps', [
      'getQapps',
    ]),
    clearName() {
      this.title = '';
      this.description = '';
    },
    handleOk(e) {
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
      await this.$store.dispatch('qapp/add', this.$auth.user().id);
      this.$router.push('navigate');
    },
    editQapp(qapp) {
      this.$store.commit('qapp/SET_CURRENT_QAPP', qapp);
      this.$router.push('navigate');
    },
  },
  data() {
    return {
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
  background-color: #FFF;
}
.d-block {
    color: black !important;
}
.add-button {
    background-color: #3AA02B;
}
</style>
