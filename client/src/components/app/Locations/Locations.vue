<template>
  <div>
    <Tabs :tabs="[{ id: 'map', name: 'Map', isActive: true }, { id: 'list', name: 'List' }]">
      <template v-slot:list>
        <LocationsTable
          :onAddLocationInfo="onAddLocationInfo"
          :rows="markers"
          :onEditRow="onEditRowInfo"
          :onDeleteRow="onDeleteSingle"
          :onDeleteAll="onDeleteAll"
        />
      </template>
      <template v-slot:map>
        <Map :onAddLocation="onAddLocation" :isAddingLocation="isAddingLocation" :markers="markers" />
      </template>
    </Tabs>
    <SideNav
      v-if="isEnteringLocationInfo"
      :handleClose="() => (this.isEnteringLocationInfo = false)"
      :title="this.shouldShowEdit ? 'Edit Location' : 'Add Location'"
    >
      <form @submit.prevent="addLocationData">
        <div class="field" v-for="question in questions" :key="question.id">
          <label class="label" :for="`question${question.id}`">{{ question.questionLabel }}</label>
          <input
            v-if="question.dataEntryType === 'text'"
            :id="`question${question.id}`"
            :value="pendingData[question.id]"
            class="input"
            type="text"
            :placeholder="`Enter ${question.questionLabel}`"
            required
            @input="updateData($event, question.id)"
          />
          <div v-if="question.dataEntryType === 'select'" :class="`select ${!qappData[question.id] ? '' : ''}`">
            <select
              :id="`question${question.id}`"
              class="select"
              type="text"
              :placeholder="`Enter ${question.questionLabel}`"
              @change="updateData($event, question.id)"
              required
            >
              <option value="" disabled selected hidden>Select {{ question.questionLabel }}...</option>
              <option value="test1">Test 1</option>
              <option value="test2">Test 2</option>
            </select>
          </div>
        </div>
        <Button
          v-if="!shouldShowEdit"
          :label="shouldShowEdit ? 'Edit and Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <SideNav v-if="shouldShowDelete" title="Delete Location" :handleClose="() => (this.shouldShowDelete = false)">
      <template #default="props">
        <Alert v-if="shouldDeleteAll" :message="`Are you sure you want to delete all locations?`" type="warning" />
        <Alert v-if="shouldDeleteSingle" :message="`Are you sure you want to delete ${locationName}?`" type="warning" />
        <hr />
        <div class="field is-grouped">
          <div class="control">
            <Button label="Delete" type="info" />
          </div>
          <div class="control">
            <Button label="Cancel" type="cancel" :preventEvent="true" @click.native="props.close" />
          </div>
        </div>
      </template>
    </SideNav>
  </div>
</template>

<script>
import Map from './Map';
import SideNav from '@/components/shared/SideNav';
import Tabs from '@/components/shared/Tabs';
import LocationsTable from '@/components/app/Locations/LocationsTable';
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';

export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Map, SideNav, Tabs, LocationsTable, Alert, Button },
  data() {
    return {
      markers: [],
      map: null,
      isAddingLocation: false,
      isEnteringLocationInfo: false,
      shouldShowDelete: false,
      shouldShowEdit: false,
      shouldDeleteAll: false,
      shouldDeleteSingle: false,
      latQuestionId: this.questions.find((q) => q.questionLabel === 'Location Latitude').id,
      lngQuestionId: this.questions.find((q) => q.questionLabel === 'Location Longitude').id,
      qappData: {},
      pendingData: {},
      locationName: '',
    };
  },
  mounted() {
    // Get latest qapp data from getter in order to pre-populate markers
    this.qappData = this.$store.getters['qapp/qappData'];

    // Add markers to map if location data already exists
    let locations = [];
    if (Array.isArray(this.qappData[this.latQuestionId])) {
      locations = this.qappData[this.latQuestionId];
    } else if (this.qappData[this.latQuestionId]) {
      locations = [this.qappData[this.latQuestiponId]];
    }
    locations.forEach((lat, index) => {
      const mapData = {};
      this.questions.forEach((q) => {
        mapData[q.questionLabel] = this.qappData[q.id][index];
      });
      this.markers.push({
        ...mapData,
        latLng: [
          parseFloat(this.qappData[this.latQuestionId][index]),
          parseFloat(this.qappData[this.lngQuestionId][index]),
        ],
        lat: parseFloat(this.qappData[this.latQuestionId][index]),
        lng: parseFloat(this.qappData[this.lngQuestionId][index]),
      });
    });
  },
  methods: {
    onAddLocation(map) {
      this.locationName = '';
      this.shouldShowEdit = false;
      this.map = map;
      this.isAddingLocation = !this.isAddingLocation;
      // after clicking Add Location button, add click event to get Lat/Long of clicked area
      if (this.isAddingLocation) {
        this.map.on('click', (e) => {
          this.isEnteringLocationInfo = true;
          this.pendingData[this.latQuestionId] = e.latlng.lat.toFixed(6);
          this.pendingData[this.lngQuestionId] = e.latlng.lng.toFixed(6);
        });
      } else if (this.map) {
        this.map.off('click');
      }
    },
    updateData(e, qId) {
      this.pendingData[qId] = e.target.value;
    },
    addLocationData() {
      // Push data to markers array to display markers on map with corresponding info
      const mapData = {};
      this.questions.forEach((q) => {
        mapData[q.questionLabel] = this.pendingData[q.id];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (Array.isArray(this.qappData[this.lngQuestionId])) {
        newValueId = this.qappData[this.latQuestionId].length + 1;
      } else if (this.qappData[this.latQuestionId]) {
        newValueId = 2;
      }

      this.markers.push({
        ...mapData,
        latLng: [this.pendingData[this.latQuestionId], this.pendingData[this.lngQuestionId]],
        lat: this.pendingData[this.latQuestionId],
        lng: this.pendingData[this.lngQuestionId],
        valueId: newValueId,
      });

      this.$emit('saveData', null, newValueId, this.pendingData);

      // Close location side nav and turn off click event for map
      this.isAddingLocation = false;
      this.isEnteringLocationInfo = false;
      if (this.map) this.map.off('click');
    },
    onAddLocationInfo() {
      this.isEnteringLocationInfo = true;
      this.locationName = '';
      this.latitude = null;
      this.longitude = null;
      this.shouldShowEdit = false;
    },
    onEditRowInfo() {
      this.isEnteringLocationInfo = true;
      this.shouldShowEdit = true;
    },
    onDeleteSingle(location) {
      // TODO: consider using "parentId" instead of "valueId" in database
      this.locationName = location['Location Name'];
      this.shouldShowDelete = true;
      this.shouldDeleteSingle = true;
      this.shouldDeleteAll = false;
    },
    onDeleteAll() {
      this.shouldShowDelete = true;
      this.shouldDeleteAll = true;
      this.shouldDeleteSingle = false;
    },
  },
};
</script>
