<template>
  <div>
    <Tabs :tabs="getWaterTypes()">
      <template v-for="waterType in getWaterTypes()" v-slot:[waterType.id]>
        <div :key="waterType.id" class="columns tab-content">
          <div class="column is-two-thirds">
            <div class="columns">
              <div class="column is-10">
                <p>Parameters for {{ waterType.name }} based on selected concerns</p>
                <div class="field checkboxes-container">
                  <div v-for="param in getFilteredParams(waterType.name)" class="field" :key="param.id">
                    <input
                      class="is-checkradio is-info"
                      :id="param.id"
                      type="checkbox"
                      :value="param.id"
                      :checked="isChecked(param.id)"
                      @change="$emit('updateData', $event, paramQuestion)"
                    />
                    <label :for="param.id">{{ param.name }}</label>
                  </div>
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3 "></span>
              </div>
            </div>
            <!-- Removed until "Suggested parameters" logic is determined
            <div class="columns">
              <div class="column is-10">
                <p>
                  All {{ waterType.name }} (other parameters that aren't suggested but are part of the selected
                  concerns)
                </p>
                <div class="field checkboxes-container">
                  <div v-for="param in getFilteredParams(waterType.name)" class="field" :key="param.id">
                    <input
                      class="is-checkradio is-info"
                      :id="param.id"
                      type="checkbox"
                      :value="param.id"
                      v-model="selectedParams"
                    />
                    <label :for="param.id">{{ param.name }}</label>
                  </div>
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3"></span>
              </div>
            </div> -->
            <div class="columns">
              <div class="column is-10">
                <div class="field">
                  <p>Other</p>
                  <input ref="otherInput" class="input" type="text" @keyup.enter="updateParams($event)" />
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3 "></span>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <p class="has-text-centered">Selected</p>
            <div class="box selected-parameters">
              <ul>
                <li v-for="param in selectedParams" :key="param" class="param-label has-text-weight-semibold">
                  {{ getParamLabel(param) }}
                  <span
                    class="fa fa-times"
                    @click="$emit('updateData', { target: { value: param.id || param } }, paramQuestion)"
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
    ...mapState('ref', ['parameters', 'waterTypes']),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', ['concernsQuestionId', 'locationWaterTypeQuestionId']),
    selectedParams() {
      return this.pendingData[this.paramQuestion.id] ? this.pendingData[this.paramQuestion.id].split(',') : [];
    },
  },
  methods: {
    getFilteredParams(waterType) {
      const selectedConcerns = this.qappData[this.concernsQuestionId].split(',');
      /* Check if any one concern from parameters ref matches any one concern from selected concerns (using Array.some())
       * Then, check if parameter's water type matches the current tab's water type (or if param's water type is "All")
       */
      return this.parameters.filter(
        (v) =>
          v.concern.split(',').some((c) => selectedConcerns.indexOf(c) > -1) &&
          (v.waterType.split(',').indexOf(waterType) > -1 || v.waterType === 'All')
      );
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
    getParamLabel(param) {
      const pId = parseInt(param, 10);
      return this.parameters.find((p) => p.id === pId) ? this.parameters.find((p) => p.id === pId).name : param;
    },
    updateParams(e) {
      this.$emit('updateData', e, this.paramQuestion);
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
  max-height: 300px;
  overflow: auto;
  border-radius: 4px;
}

.tab-content {
  margin-top: 10px;
}

.box {
  margin: 0.5rem 0;
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
