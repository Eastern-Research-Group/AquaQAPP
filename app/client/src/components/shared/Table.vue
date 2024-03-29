<template>
  <div>
    <div class="columns">
      <div class="column table-container">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key">
                {{ column.label }}
              </th>
              <th v-if="shouldHaveActionsCol || shouldHaveSingleAction">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isFetching">
              <td :colspan="columns.length + (shouldHaveActionsCol ? 1 : 0)">
                <LoadingIndicator message="Loading..." class="dark" />
              </td>
            </tr>
            <tr v-else-if="rows.length === 0">
              <td :colspan="columns.length + (shouldHaveActionsCol ? 1 : 0)">
                {{ noDataMessage }}
              </td>
            </tr>
            <tr v-for="(row, index) in rows" :key="index">
              <td v-for="(column, colIndex) in columns" :key="column.key">
                <slot v-if="$scopedSlots[`cell(${colIndex})`]" :name="`cell(${colIndex})`" :row="row"></slot>
                <span v-else>{{ row[column.key] }}</span>
              </td>
              <td v-if="shouldHaveActionsCol || shouldHaveSingleAction">
                <div class="field is-grouped">
                  <div class="control" v-if="shouldHaveActionsCol || shouldHaveSingleAction === 'Edit'">
                    <Button
                      label="Edit"
                      type="link"
                      icon="edit"
                      :shouldShowIcon="true"
                      @click.native="$emit('onEdit', row)"
                    />
                  </div>
                  <div class="control" v-if="shouldHaveActionsCol || shouldHaveSingleAction === 'Delete'">
                    <Button
                      label="Delete"
                      type="danger"
                      icon="trash-alt"
                      :shouldShowIcon="true"
                      @click.native="$emit('onDelete', row)"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="shouldHaveGlobalActions">
            <tr>
              <td colspan="100">
                <div class="has-text-right btn-container">
                  <Button label="Add" icon="plus" type="success" @click.native="$emit('onAdd')" />
                  <Button
                    label="Delete All"
                    icon="trash-alt"
                    type="danger"
                    @click.native="$emit('onDelete')"
                    :disabled="!rows.length"
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingIndicator from '@/components/shared/LoadingIndicator';
import Button from './Button';

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    noDataMessage: {
      type: String,
      required: false,
      default: 'No data available. Add data to continue.',
    },
    shouldHaveActionsCol: {
      type: Boolean,
      required: false,
    },
    shouldHaveGlobalActions: {
      type: Boolean,
      required: false,
    },
    shouldHaveSingleAction: {
      type: String,
      required: false,
    },
  },
  components: { Button, LoadingIndicator },
  computed: {
    ...mapState('qapps', ['isFetching']),
  },
};
</script>

<style lang="scss" scoped>
.btn-container .button {
  margin-left: 1em;
  width: 6em;
}

tfoot {
  background-color: #f1f1f1;

  td {
    padding-top: 1rem;
  }

  .btn-container .button {
    width: auto;
  }
}
</style>
