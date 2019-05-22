<template>
  <div>
    <Tabs
      :tabs="[
        { id: 'fresh', name: 'Fresh', isActive: true },
        { id: 'salt', name: 'Salt' },
        { id: 'brackish', name: 'Brackish' },
      ]"
    >
      <template v-slot:fresh>
        <div class="columns tab-content-params">
          <div class="column is-three-quarters">
            <div class="columns">
              <div class="column is-10">
                <p>Suggested Parameters for Fresh based on selected concerns</p>
                <div class="field checkboxes-container">
                  <div class="field">
                    <input class="is-checkradio" id="list1" type="checkbox" name="list1" />
                    <label for="list1">List 1</label>
                  </div>
                  <div class="field">
                    <input class="is-checkradio" id="list2" type="checkbox" name="list2" />
                    <label for="list2">List 2</label>
                  </div>
                  <div class="field">
                    <input class="is-checkradio" id="list3" type="checkbox" name="list3" />
                    <label for="list3">List 3</label>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field top-arrows"><span class="fas fa-angle-double-right is-size-3 "></span></div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-10">
                <p>All Fresh (other parameters that aren't suggested but are part of the selected concerns)</p>
                <div class="field checkboxes-container">
                  <div class="field">
                    <input class="is-checkradio" id="list4" type="checkbox" name="list4" />
                    <label for="list4">List A</label>
                  </div>
                  <div class="field">
                    <input class="is-checkradio" id="list5" type="checkbox" name="list5" />
                    <label for="list5">List B</label>
                  </div>
                  <div class="field">
                    <input class="is-checkradio" id="list6" type="checkbox" name="list6" />
                    <label for="list6">List C</label>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field middle-arrows"><span class="fas fa-angle-double-right is-size-3"></span></div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-10">
                <div class="field">
                  <p>Other</p>
                  <input value="" class="input" type="text" />
                </div>
              </div>
              <div class="column">
                <div class="field bottom-arrows"><span class="fas fa-angle-double-right is-size-3 "></span></div>
              </div>
            </div>
          </div>
          <div class="column is-one-quarter">
            <p class="selected-title">Selected</p>
            <div class="box selected-parameters">
              <ul>
                <li>List 1</li>
                <li>List A</li>
                <li>Other</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:salt> </template>
      <template v-slot:brackish> </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '@/components/shared/Tabs';

export default {
  name: 'Parameters',
  components: { Tabs },
};
</script>

<style scoped lang="scss">
@import '../../../static/variables';

.selected-parameters {
  height: 100% !important;
}

.top-arrows {
  padding-top: 90px !important;
}

.middle-arrows {
  padding-top: 110px !important;
}

.bottom-arrows {
  padding-top: 25px !important;
}

.checkboxes-container {
  background-color: $darkBlue;
  padding: 20px !important;
  margin-top: 10px;
}

.selected-title {
  text-align: center;
}

.tab-content-params {
  margin-top: 10px;
}

.is-checkradio[type='checkbox'] + label::after,
.is-checkradio[type='checkbox'] + label:after {
  border-color: white;
}

.is-checkradio[type='checkbox']:hover:not([disabled]) + label:before,
.is-checkradio[type='checkbox'] + label:after {
  border-color: $lightBlue !important;
}
</style>
