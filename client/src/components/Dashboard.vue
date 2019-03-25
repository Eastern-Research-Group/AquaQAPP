<template>
    <v-container glid-list-xl>
        <v-layout row wrap>
            <v-flex xs8 offset-xs2>
                <v-flex xs12 offset-xs2 d-inline-block>
                    <h1 class="display-2">Dashboard</h1>
                </v-flex>
                <v-flex xs2 d-inline-block right>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Add</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Create New Qapp</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field
                                                label="Title*"
                                                required
                                                :value="title"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field
                                                label="Description*"
                                                required
                                                :value="description"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    flat
                                    @click="dialog = false"
                                >Close</v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    flat
                                    @click="addNewQapp"
                                >Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
                <div>
                    <v-data-table
                            :headers="headers"
                            :items="allQapps"
                            class="elevation-1"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.title }}</td>
                            <td class="text-xs-right">{{ props.item.description }}</td>
                            <td class="text-xs-right">{{ props.item.updatedAt }}</td>
                        </template>
                    </v-data-table>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'getQapps',
    ]),
    addNewQapp(e) {
      this.$store.commit('addQapp', e.target.value);
    },
  },
  computed: {
    ...mapGetters(['allQapps']),
    ...mapState({
      title: state => state.qapp.title,
      description: state => state.qapp.description,
    }),
  },
  async mounted() {
    this.getQapps();
  },
  data() {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title',
          align: 'center',
        },
        {
          text: 'Description',
          value: 'description',
          align: 'center',
        },
        {
          text: 'Date Updated',
          value: 'updatedAt',
          align: 'center',
        },
      ],
      dialog: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
