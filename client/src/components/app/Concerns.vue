<template>
  <div class="container">
    <div class="columns">
      <div class="column is-full">
        <p>1. What are your water quality concerns? Select all that apply.</p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter">
        <input class="is-checkradio is-block is-info" id="concern1" type="checkbox" name="concern1" />
        <label id="concern1-label" for="concern1">General Environmental Health: Physical/Chemical Water Quality</label>

        <input class="is-checkradio is-block is-info" id="concern2" type="checkbox" name="concern2" />
        <label for="concern2">Eutrophication (Nutrients)</label>

        <input class="is-checkradio is-block is-info" id="concern3" type="checkbox" name="concern3" />
        <label for="concern3">Illicit Connections</label>
      </div>
      <div class="column is-one-quarter">
        <input class="is-checkradio is-block is-info" id="concern4" type="checkbox" name="concern4" />
        <label id="concern4-label" for="concern4">General Environmental Health: Benthic</label>

        <input class="is-checkradio is-block is-info" id="concern5" type="checkbox" name="concern5" />
        <label for="concern5">Harmful Algal Blooms (HABs) (Algal Toxins)</label>

        <input class="is-checkradio is-block is-info" id="concern6" type="checkbox" name="concern6" />
        <label for="concern6">Stormwater</label>
      </div>
      <div class="column is-one-quarter">
        <input class="is-checkradio is-block is-info" id="concern7" type="checkbox" name="concern7" />
        <label id="concern7-label" for="concern7">Recreation (Swimming and/or Boating)</label>

        <input class="is-checkradio is-block is-info" id="concern8" type="checkbox" name="concern8" />
        <label for="concern8">Acidification</label>

        <input class="is-checkradio is-block is-info" id="concern9" type="checkbox" name="concern9" />
        <label for="concern9">Other</label>
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
export default {
  name: 'Concerns',
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

label {
  font-size: 14px !important;
  text-align: center !important;
  padding: 20px 10px 10px 10px !important;
}

label::before,
label::after {
  display: none !important;
}

.is-one-quarter {
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: 105px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

#concern1-label,
#concern4-label,
#concern7-label {
  margin-left: 7px !important;
}

.is-checkradio[type='checkbox'].is-info.is-block:checked + label {
  background-color: $darkBlue;
}

.is-checkradio[type='checkbox'].is-info.is-block:checked:hover:not([disabled]) + label {
  background-color: $gray !important;
}
</style>
