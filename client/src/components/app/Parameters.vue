<template>
  <div>
    <Tabs :tabs="getWaterTypes()">
      <template v-for="waterType in getWaterTypes()" v-slot:[waterType.id]>
        <div :key="waterType.id" class="columns tab-content">
          <div class="column is-8 param-inputs">
            <fieldset>
              <legend>Suggested parameters for {{ waterType.name }} water based on selected concerns</legend>
              <div v-if="getFilteredParams(suggestedParams, waterType.name).length" class="field checkboxes-container">
                <div v-for="param in getFilteredParams(suggestedParams, waterType.name)" class="field" :key="param.id">
                  <input
                    class="is-checkradio is-info"
                    :id="param.id"
                    type="checkbox"
                    :value="param.id"
                    :checked="isChecked(param.id)"
                    @change="$emit('updateData', $event, paramQuestion)"
                  />
                  <label :for="param.id">{{ param.label }}</label>
                </div>
              </div>
              <div v-else class="field checkboxes-container">
                <i>There are no suggested parameters based on selected concerns</i>
              </div>
            </fieldset>
            <fieldset>
              <legend>All other parameters for {{ waterType.name }} water</legend>
              <div v-if="getFilteredParams(allParams, waterType.name).length" class="field checkboxes-container">
                <div v-for="param in getFilteredParams(allParams, waterType.name)" class="field" :key="param.id">
                  <input
                    class="is-checkradio is-info"
                    :id="param.id"
                    type="checkbox"
                    :value="param.id"
                    :checked="isChecked(param.id)"
                    @change="$emit('updateData', $event, paramQuestion)"
                  />
                  <label :for="param.id">{{ param.label }}</label>
                </div>
              </div>
              <div v-else class="field checkboxes-container">
                <i>There are no other parameters for {{ waterType.name }} water</i>
              </div>
            </fieldset>
            <label for="otherParam">Other parameters</label>
            <div class="field has-addons">
              <div class="control other-input">
                <input ref="otherInput" id="otherParam" class="input" type="text" />
              </div>
              <div class="control">
                <button @click="updateParams" class="button is-success">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <p class="has-text-centered">Selected</p>
            <div class="box selected-parameters">
              <ul>
                <li
                  v-for="param in sortedParams"
                  :key="param.id || param.parameter"
                  class="param-label has-text-weight-semibold"
                >
                  {{ param.label || `${param.parameter} - OTHER` }}
                  <span
                    class="fa fa-times"
                    @click="
                      $emit(
                        'updateData',
                        { target: { value: param.id ? param.id.toString() : param.parameter } },
                        paramQuestion
                      )
                    "
                  ></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Tabs from '@/components/shared/Tabs';
import sortBy from 'lodash/sortBy';

export default {
  name: 'Parameters',
  props: {
    pendingData: {
      type: Object,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Tabs },
  data() {
    return {
      paramQuestion: this.questions[0],
    };
  },
  computed: {
    ...mapState('ref', ['concerns', 'parameters', 'waterTypes']),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', ['concernsQuestionId', 'locationWaterTypeQuestionId']),
    selectedConcernCodes() {
      return this.qappData[this.concernsQuestionId].split(',');
    },
    selectedParams() {
      return this.pendingData[this.paramQuestion.id] ? this.pendingData[this.paramQuestion.id].split(',') : [];
    },
    sortedParams() {
      let sortedParams = [];
      this.selectedParams.forEach((param) => {
        if (this.parameters.find((p) => p.id === parseInt(param, 10))) {
          sortedParams.push(this.parameters.find((p) => p.id === parseInt(param, 10)));
        } else {
          sortedParams.push({ parameter: param });
        }
      });
      sortedParams = sortBy(sortedParams, [(p) => p.parameter.toLowerCase()]);
      return sortedParams;
    },
    suggestedParams() {
      const params = [];
      this.parameters.forEach((param) => {
        if (param.concerns.map((v) => v.code).some((c) => this.selectedConcernCodes.indexOf(c) > -1)) {
          params.push(param);
        }
      });
      return params;
    },
    allParams() {
      const params = [];
      this.parameters.forEach((param) => {
        if (this.suggestedParams.map((p) => p.id).indexOf(param.id) === -1) {
          params.push(param);
        }
      });
      return params;
    },
  },
  methods: {
    getFilteredParams(params, waterType) {
      if (waterType === 'Fresh') {
        return sortBy(params.filter((p) => p.waterType === 'Freshwater'), [(p) => p.parameter.toLowerCase()]);
      }
      // salt or brackish types are both indicated by the "salt" boolean column
      return sortBy(params.filter((p) => p.waterType === 'Saltwater'), [(p) => p.parameter.toLowerCase()]);
    },
    getWaterTypes() {
      let waterTypes = this.qappData[this.locationWaterTypeQuestionId].map((v) => v.value);
      waterTypes = waterTypes.filter((v, i, a) => a.indexOf(v) === i); // unique list of water types
      return waterTypes.map((v) => ({
        id: v,
        name: v,
      }));
    },
    isChecked(paramId) {
      return this.selectedParams.indexOf(paramId.toString()) > -1;
    },
    updateParams() {
      // Need to manually set event object based on input value
      const event = { target: { value: this.$refs.otherInput[0].value } };
      this.$emit('updateData', event, this.paramQuestion);
      this.$refs.otherInput[0].value = '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.selected-parameters {
  height: 95% !important;
}

.arrows {
  margin: auto;
  height: 100%;
  text-align: center;
  position: relative;
  top: 13px;
}

.checkboxes-container {
  background-color: $darkBlue;
  padding: 15px;
  margin-top: 10px;
  max-height: 180px;
  overflow: auto;
  border-radius: 4px;
}

.tab-content {
  margin-top: 10px;
}

.box {
  margin: 0.5rem 0;
}

.param-inputs {
  padding-right: 2rem;

  fieldset {
    margin-bottom: 0.5rem;
  }
}

.other-input {
  width: 100%;
}

.param-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa-times {
  color: $danger;
  cursor: pointer;
}
</style>
