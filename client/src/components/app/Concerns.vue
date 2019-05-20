<template>
  <div class="container">
    <div class="columns">
      <div class="column is-full">
        <p>1. What are your water quality concerns? Select all that apply.</p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-two-thirds">
        <div class="tile" v-for="concern in concerns">
          <input
            class="is-checkradio is-block is-info"
            :id="concern.concernCode"
            type="checkbox"
            :name="concern.concernLabel"
          />
          <label :id="concern.concernLabel" :for="concern.concernCode">{{ concern.concernLabel }}</label>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <p>2. Do your water quality concerns differ by sampling location?</p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter">
        <input class="is-checkradio is-block is-info" id="yes" type="checkbox" name="yes" />
        <label for="yes">Yes</label>
      </div>
      <div class="column is-one-quarter">
        <input class="is-checkradio is-block is-info" id="no" type="checkbox" name="no" />
        <label for="no">No</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Concerns',
  computed: {
    ...mapState('structure', ['concerns']),
  },
  mounted() {
    this.getConcerns();
  },
  methods: {
    ...mapActions('structure', ['getConcerns']),
  },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

label {
  font-size: 14px !important;
  text-align: center !important;
  padding: 20px 10px 10px 10px !important;
}

.is-two-thirds,
.is-one-quarter {
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: 105px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.is-checkradio[type='checkbox'].is-info.is-block:checked + label {
  background-color: $darkBlue;
}
</style>
