<template>
  <div class="section">
    <div class="columns">
      <div class="column table-container">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th v-for="field in fields" :key="field.key">
              {{ field.label }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="" :key="">
            <td>pending</td>
            <td>pending</td>
            <td>pending</td>
            <td>
              <div class="field is-grouped">
                <div class="control">
                  <Button label="Edit" type="primary" icon="edit" v-bind:shouldShowIcon="true"/>
                </div>
                <div class="control">
                  <Button label="Delete" type="danger" icon="trash" v-bind:shouldShowIcon="true"/>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="columns">
      <div class="column is-9">
      </div>
      <div class="column is-3">
        <Button class="section-btn" label="Add" type="success" v-bind:onClick="onAddLocationInfo"/>
        <Button class="section-btn" label="Delete All" type="danger" v-bind:onClick="onDeleteAll"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/shared/Button';

export default {
  name: 'LocationsTable',
  components: {Button},
  props: {
    onAddLocationInfo: {
      type: Function,
      required: false,
    },
    onDeleteAll: {
      type: Function,
      required: false,
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'location',
          label: 'Location',
        },
        {
          key: 'latitude',
          label: 'Latitude',
        },
        {
          key: 'longitude',
          label: 'Longitude',
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
    }
  }
};
</script>

<style scoped>
.section-btn {
  border-radius: 0;
  margin-left: 17px;
}
</style>
