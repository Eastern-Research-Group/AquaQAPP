<template>
  <div id="app">
    <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm4 md2>
        <v-navigation-drawer permanent>
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  AquaQAPP
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
              <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click=""
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <treeview/>
        </v-navigation-drawer>
      </v-flex>
      <v-flex d-flex md5>
        <v-form id="qapp_form" action="/api/qapp" name="qapp_form" method="post">
          QAPP Version Number:<br>
          <input type="text" name="version_number" id="version_number" value="1">
          <br>
          QAPP Revision Date:<br>
          <input type="text" name="revision_date" id="revision_date" value="1/30/2019">
          <br>
          Project Name:<br>
          <input type="text" name="project_name" id="project_name" value="QAPP">
          <br>
          Project Title:<br>
          <input type="text" name="project_title" id="project_title" value="AquaQAPP">
          <br>
          Prepared By:<br>
          <textarea rows="5" cols="50" id="prepared_by" name="prepared_by">Brad Cooper</textarea>
          <br>
          Prepared For:<br>
          <textarea rows="5" cols="50" id="prepared_for" name="prepared_for">MassBays</textarea>
          <br>
          <v-btn type="submit" id="submit">Submit</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>

  import Treeview from './Treeview';

  export default {
    components: {
      Treeview
    },
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'Organization', icon: 'perm_identity' }
        ],
        right: null
      }
    }
  }
</script>

<style>
div {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}

#img {
  margin-right: 15px;
}
</style>