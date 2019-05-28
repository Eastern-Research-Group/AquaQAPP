<template>
  <div class="section">
    <div class="field">
      <p>1. What are your water quality concerns? Select all that apply.</p>
    </div>
    <div class="field is-one-quarter">
      <div class="tile" v-for="concern in concerns" :key="concern.id">
        <input
          class="is-checkradio is-block is-info"
          :id="concern.concernCode"
          type="checkbox"
          :name="concern.concernLabel"
        />
        <label :id="concern.concernLabel" :for="concern.concernCode">{{ concern.concernLabel }}</label>
      </div>
    </div>
    <div class="field">
      <p>2. Do your water quality concerns differ by sampling location?</p>
    </div>
    <div class="field is-grouped">
      <p class="control is-one-quarter">
        <input class="is-checkradio is-block is-info" id="yes" type="checkbox" name="yes" />
        <label for="yes">Yes</label>
      </p>
      <p class="control is-one-quarter">
        <input class="is-checkradio is-block is-info" id="no" type="checkbox" name="no" />
        <label for="no">No</label>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Concerns',
  computed: {
    ...mapState('ref', ['concerns']),
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
  grid-gap: 8px;
  grid-auto-rows: 105px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.is-checkradio[type='checkbox'].is-info.is-block:checked + label {
  background-color: $darkBlue;
}
</style>
