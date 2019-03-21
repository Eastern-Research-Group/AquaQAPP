<template>
    <v-layout>
        <v-flex xs8 offset-xs2>
            <div>
                <h1>Dashboard</h1>
            </div>
            <div>
                <v-data-table
                        :headers="headers"
                        :items="accounts"
                        class="elevation-1"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.project_name }}</td>
                        <td class="text-xs-right">{{ props.item.user_name }}</td>
                    </template>
                </v-data-table>
            </div>
        </v-flex>
    </v-layout>

</template>

<script>
export default {
  async mounted() {
    // todo: move this logic into vuex and populate the dashboard table based on the actual response
    const response = await this.$http.get('api/qapps');
    console.log(response);
  },
  data() {
    return {
      headers: [
        {
          text: 'Short Title',
          value: 'title',
          align: 'center',
        },
        {
          text: 'Project Name',
          value: 'project_name',
          align: 'center',
        },
        {
          text: 'Author',
          value: 'user_name',
          align: 'center',
        },
      ],
      accounts: [
        {
          title: 'First QAPP',
          project_name: 'Aqua',
          user_name: 'John Doe',
        },
        {
          title: 'Second QAPP',
          project_name: 'MassBays',
          user_name: 'Jack Doe',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
