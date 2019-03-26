<template>
    <div class="main-view">
        <b-row>
            <b-col>
                <h2>Dashboard</h2>
            </b-col>
            <b-col align-self="end" md="1">
                <b-button class="add-button" size="lg" align-self="end" v-b-modal.modalPrevent>Add</b-button>
            </b-col>
        </b-row>
        <br/>
        <b-row>
            <b-table striped hover :items="this.$store.state.qapps.data" :fields="fields">
                <template v-slot:items="props">
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                </template>
            </b-table>
        </b-row>

        <b-modal
            id="modalPrevent"
            ref="modal"
            @ok="handleOk"
            @shown="clearName"
        >
            <div class="d-block">Add a new Qapp!</div>
            <br/>
            <form id="addQappForm" @submit.stop.prevent="handleSubmit">
                <b-form-input
                    type="text"
                    placeholder="Enter a title"
                    v-model="title"
                />
                <b-form-input
                    type="text"
                    placeholder="Enter a description"
                    v-model="description"
                />
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
        alert('Please enter a title');
      } else if (!this.description) {
        alert('Please enter a description');
      } else {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      await this.$store.dispatch('qapp/add', this.$auth.user().id);
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
