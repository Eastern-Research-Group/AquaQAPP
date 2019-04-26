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
            <tr v-for="row in rows" :key="row.id" ref="row">
              <td>{{ row.title }}</td>
              <td>{{ row.lat }}</td>
              <td>{{ row.lng }}</td>
              <td>
                <div class="field is-grouped">
                  <div class="control">
                    <Button label="Edit" type="primary" icon="edit" :shouldShowIcon="true" @onClick="onEditRow" />
                  </div>
                  <div class="control">
                    <Button label="Delete" type="danger" icon="trash" :shouldShowIcon="true" @onClick="onDeleteRow" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="columns">
      <div class="column is-7"></div>
      <div class="column is-5">
        <Button class="section-btn" label="Add" type="success" @onClick="onAddLocationInfo" />
        <Button class="section-btn" label="Delete All" type="danger" @onClick="onDeleteAll" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/shared/Button';

export default {
  name: 'LocationsTable',
  components: { Button },
  props: {
    onAddLocationInfo: {
      type: Function,
      required: false,
    },
    onDeleteAll: {
      type: Function,
      required: false,
    },
    rows: {
      type: Array,
      required: true,
    },
    onEditRow: {
      type: Function,
      required: false,
      default: () => {},
    },
    onDeleteRow: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'location',
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
.section-btn {
  width: 8em;
  height: 3em;
  margin-left: 33px;
  margin-bottom: 10px;
}
</style>
