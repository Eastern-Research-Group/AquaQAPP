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
            <tr v-if="rows.length === 0">
              <td colspan="4">No locations have been added. Add a location to continue.</td>
            </tr>
            <tr v-for="row in rows" :key="row.id" ref="row">
              <td>{{ row['Location ID'] }}</td>
              <td>{{ row['Location Name'] }}</td>
              <td>{{ row['Location Latitude'] }}</td>
              <td>{{ row['Location Longitude'] }}</td>
              <td>
                <div class="field is-grouped">
                  <div class="control">
                    <Button
                      label="Edit"
                      type="primary"
                      icon="edit"
                      :shouldShowIcon="true"
                      @click.native="$emit('onEdit', $event, row)"
                    />
                  </div>
                  <div class="control">
                    <Button
                      label="Delete"
                      type="danger"
                      icon="trash-alt"
                      :shouldShowIcon="true"
                      @click.native="$emit('onDelete', $event, row)"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="has-text-right btn-container">
      <Button label="Add" type="success" @click.native="$emit('onAddLocationInfo')" />
      <Button label="Delete All" type="danger" @click.native="$emit('onDelete')" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/shared/Button';

export default {
  name: 'LocationsTable',
  components: { Button },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'locationId',
          label: 'Location ID',
        },
        {
          key: 'locationName',
          label: 'Location Name',
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
          label: 'Actions',
        },
      ],
    };
  },
};
</script>

<style scoped>
.btn-container .button {
  margin-left: 1em;
  width: 6em;
}
</style>
