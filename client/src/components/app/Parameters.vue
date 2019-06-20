<template>
  <div>
    <label class="label is-size-4">Parameters</label>
    <Tabs
      :tabs="[
        { id: 'Fresh', name: 'Fresh', isActive: true },
        { id: 'Salt', name: 'Salt' },
        { id: 'Brackish', name: 'Brackish' },
      ]"
    >
      <template v-for="waterType in waterTypes" v-slot:[waterType.id]>
        <div :key="waterType.id" class="columns tab-content">
          <div class="column is-three-quarters">
            <div class="columns">
              <div class="column is-10">
                <p>Suggested Parameters for {{ waterType.name }} based on selected concerns</p>
                <div class="field checkboxes-container">
                  <div v-for="param in parameters" class="field" :key="param">
                    <input
                      class="is-checkradio is-info"
                      :id="param"
                      type="checkbox"
                      :value="param"
                      v-model="selectedParams"
                    />
                    <label :for="param">{{ param }}</label>
                  </div>
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3 "></span>
              </div>
            </div>
            <div class="columns">
              <div class="column is-10">
                <p>
                  All {{ waterType.name }} (other parameters that aren't suggested but are part of the selected
                  concerns)
                </p>
                <div class="field checkboxes-container">
                  <div v-for="param in parameters" class="field" :key="param">
                    <input
                      class="is-checkradio is-info"
                      :id="param"
                      type="checkbox"
                      :value="param"
                      v-model="selectedParams"
                    />
                    <label :for="param">{{ param }}</label>
                  </div>
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3"></span>
              </div>
            </div>
            <div class="columns">
              <div class="column is-10">
                <div class="field">
                  <p>Other</p>
                  <input class="input" type="text" @keyup.enter="addOther($event)" />
                </div>
              </div>
              <div class="column arrows is-hidden-mobile">
                <span class="fas fa-angle-double-right is-size-3 "></span>
              </div>
            </div>
          </div>
          <div class="column is-one-quarter">
            <p class="has-text-centered">Selected</p>
            <div class="box selected-parameters">
              <ul>
                <li v-for="param in selectedParams" :key="param" class="has-text-weight-semibold">
                  {{ param }}
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
import { mapState } from 'vuex';
import Tabs from '@/components/shared/Tabs';

export default {
  name: 'Parameters',
  components: { Tabs },
  data() {
    return {
      selectedParams: [],
    };
  },
  computed: {
    ...mapState('ref', ['parameters', 'waterTypes']),
  },
  methods: {
    addOther(e) {
      this.selectedParams.push(e.target.value);
      e.target.value = ''; // clear other textbox after adding
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
</style>
