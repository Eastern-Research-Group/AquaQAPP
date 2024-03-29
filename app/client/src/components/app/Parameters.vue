<template>
  <div>
    <Tabs :tabs="waterTypes" ref="paramTabs">
      <template v-for="waterType in waterTypes" v-slot:[waterType.id]>
        <div :key="waterType.id" class="columns tab-content">
          <div class="column is-8 param-inputs">
            <fieldset>
              <legend>Suggested parameters for {{ waterType.name }} water based on selected concerns</legend>
              <div v-if="getFilteredParams(suggestedParams, waterType.name).length" class="field checkboxes-container">
                <div v-for="param in getFilteredParams(suggestedParams, waterType.name)" class="field" :key="param.id">
                  <input
                    class="is-checkradio is-info"
                    :id="`param${param.id}`"
                    type="checkbox"
                    :value="param.id"
                    :checked="isChecked(param.id)"
                    @change="$emit('updateData', $event, paramQuestion)"
                  />
                  <label :for="`param${param.id}`">{{ param.label }}</label>
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
            <label for="otherParam"
              >Other parameters
              <HoverText :icon="true" hoverId="otherParamInfo">
                The parameter entered will be associated with the current tab's water type ({{ waterType.name }})
              </HoverText>
            </label>
            <div class="field has-addons">
              <div class="control other-input">
                <input
                  id="otherParam"
                  v-model="otherInputValue"
                  class="input"
                  type="text"
                  @keyup.enter="addOtherParam"
                />
              </div>
              <div class="control">
                <button
                  @click="addOtherParam"
                  class="button is-success"
                  :disabled="isOtherInputDisabled"
                  :title="
                    !otherInputValue
                      ? 'You must enter a parameter name before adding.'
                      : isOtherInputDisabled
                      ? 'You cannot have two parameters with the same name.'
                      : ''
                  "
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <p class="has-text-centered">Selected Parameters</p>
            <div class="box selected-parameters">
              <p class="selected-param-header">Fresh Parameters</p>
              <ul class="selected-param-group">
                <li
                  v-for="param in sortedParams.filter((p) => p.waterType === 'Freshwater')"
                  :key="param.id"
                  class="param-label has-text-weight-semibold"
                >
                  {{ param.label || `${param.parameter} - OTHER` }}
                  <span
                    class="fa fa-times"
                    @click="$emit('updateData', { target: { value: param.id.toString() } }, paramQuestion)"
                  ></span>
                </li>
                <li
                  v-for="param in otherSortedParams.filter((p) => p.waterType === 'Fresh')"
                  :key="param.name"
                  class="param-label has-text-weight-semibold"
                >
                  {{ `${param.name} - OTHER` }}
                  <span class="fa fa-times" @click="clearOtherParam(param)"></span>
                </li>
              </ul>
              <p class="selected-param-header bottom">Marine/Estuarine Parameters</p>
              <ul class="selected-param-group">
                <li
                  v-for="param in sortedParams.filter((p) => p.waterType === 'Saltwater')"
                  :key="param.id"
                  class="param-label has-text-weight-semibold"
                >
                  {{ param.label || `${param.parameter} - OTHER` }}
                  <span
                    class="fa fa-times"
                    @click="$emit('updateData', { target: { value: param.id.toString() } }, paramQuestion)"
                  ></span>
                </li>
                <li
                  v-for="param in otherSortedParams.filter((p) => p.waterType !== 'Fresh')"
                  :key="param.name"
                  class="param-label has-text-weight-semibold"
                >
                  {{ `${param.name} - OTHER` }}
                  <span class="fa fa-times" @click="clearOtherParam(param)"></span>
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
import HoverText from '@/components/shared/HoverText';
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
  components: { HoverText, Tabs },
  data() {
    return {
      paramQuestion: this.questions[0],
      otherParamQuestion: this.questions[1],
      otherInputValue: '',
    };
  },
  computed: {
    ...mapState('ref', ['concerns', 'parameters', 'waterTypes']),
    ...mapGetters('qapp', ['qappData']),
    waterTypes() {
      // Treat Estuarine the same as Marine
      let waterTypes = this.qappData.waterType.map((v) => (v.value === 'Estuarine' ? 'Salt' : v.value));
      waterTypes = waterTypes.filter((v, i, a) => a.indexOf(v) === i); // unique list of water types
      return waterTypes.map((v) => {
        if (v === 'Salt') {
          return {
            id: v,
            name: 'Marine/Estuarine',
          };
        }
        if (v === 'Fresh') {
          return {
            id: v,
            name: 'Fresh',
          };
        }
        return {
          id: v,
          name: v,
        };
      });
    },
    selectedConcernCodes() {
      return this.qappData.waterConcerns.split(',');
    },
    selectedParams() {
      return this.pendingData.parameters ? this.pendingData.parameters.split(',') : [];
    },
    sortedParams() {
      let sortedParams = [];
      this.selectedParams.forEach((param) => {
        if (this.parameters.find((p) => p.id === parseInt(param, 10))) {
          sortedParams.push(this.parameters.find((p) => p.id === parseInt(param, 10)));
        }
      });
      sortedParams = sortBy(sortedParams, [(p) => p.parameter.toLowerCase()]);
      return sortedParams;
    },
    otherParamsArray() {
      return this.pendingData.otherParameters ? JSON.parse(this.pendingData.otherParameters) : [];
    },
    otherSortedParams() {
      return sortBy(this.otherParamsArray, [(p) => p.name.toLowerCase()]);
    },
    isOtherInputDisabled() {
      return this.otherInputValue && this.otherParamsArray.find((p) => p.name === this.otherInputValue);
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
    isChecked(paramId) {
      return this.selectedParams.indexOf(paramId.toString()) > -1;
    },
    addOtherParam() {
      // Store the param value as a parsable JSON string with param name and current water type (both value and current tab are accessed via $refs)
      // Replace any commas as they could break logic in future sections
      const paramValue = { name: this.otherInputValue.replace(/,/g, ' '), waterType: this.$refs.paramTabs.activeTabId };
      const otherParams = [...this.otherParamsArray];
      otherParams.push(paramValue);
      this.$emit('updateData', { target: { value: JSON.stringify(otherParams) } }, this.otherParamQuestion);

      // Clear input value
      this.otherInputValue = '';
    },
    clearOtherParam(param) {
      let otherParams = [...this.otherParamsArray];
      otherParams = otherParams.filter((p) => JSON.stringify(p) !== JSON.stringify(param));
      this.$emit('updateData', { target: { value: JSON.stringify(otherParams) } }, this.otherParamQuestion);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.selected-parameters {
  height: 95% !important;
  max-height: 475px;
}

.selected-param-group {
  height: 42%;
  padding-bottom: 0.5rem;
  overflow: auto;
}

.selected-param-header {
  font-weight: bold;
  margin-bottom: 0.25rem;

  &.bottom {
    border-top: 2px solid $blue;
    padding-top: 0.5rem;
  }
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
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa-times {
  color: $danger;
  cursor: pointer;
}

//for IE 11
legend {
  color: white;
}
</style>
