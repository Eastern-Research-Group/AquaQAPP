<template>
  <div>
    <Tabs :tabs="[{ id: 'map', name: 'Map', isActive: true }, { id: 'list', name: 'List' }]">
      <template v-slot:list>
        <LocationsTable :rows="markers" @onAddLocationInfo="onAddLocationInfo" @onEdit="onEdit" @onDelete="onDelete" />
      </template>
      <template v-slot:map>
        <Map
          :markers="markers"
          :isAddingLocation="isAddingLocation"
          @onAddLocation="onAddLocation"
          @onEdit="onEdit"
          @onDelete="onDelete"
        />
      </template>
    </Tabs>
    <SideNav
      v-if="isEnteringLocationInfo"
      :handleClose="() => (this.isEnteringLocationInfo = false)"
      :title="shouldShowEdit ? 'Edit Location' : 'Add Location'"
    >
      <form @submit.prevent="submitLocationData">
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
          :label="shouldShowEdit ? 'Edit and Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <SideNav v-if="shouldShowDelete" title="Delete Location" :handleClose="() => (this.shouldShowDelete = false)">
      <template #default="props">
        <Alert v-if="shouldDeleteAll" :message="`Are you sure you want to delete all locations?`" type="warning" />
        <Alert
          v-if="shouldDeleteSingle"
          :message="`Are you sure you want to delete ${selectedLocation['Location Name']}?`"
          type="warning"
        />
        <hr />
        <div class="field is-grouped">
          <div class="control">
            <Button label="Delete" type="info" @click.native="deleteLocation()" />
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
import { mapState } from 'vuex';
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
      selectedLocation: null,
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
  },
  mounted() {
    this.refreshLocationData();
  },
  methods: {
    onAddLocation(map) {
      this.selectedLocation = null;
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
    refreshLocationData() {
      // Get latest qapp data from getter in order to pre-populate markers
      this.qappData = this.$store.getters['qapp/qappData'];
      this.markers = [];

      // Add markers to map if location data already exists
      const locations = {};

      // Logic to loop through existing qapp data and set up markers to be used by leaflet map
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        if (Array.isArray(datum)) {
          const key = this.questions.find((q) => q.id === parseInt(qId, 10)).questionLabel;
          datum.forEach((locationField) => {
            if (typeof locations[locationField.valueId] === 'undefined') locations[locationField.valueId] = {};
            locations[locationField.valueId][key] = locationField.value;
          });
        }
      });

      Object.keys(locations).forEach((locationId) => {
        const monLoc = locations[locationId];
        this.markers.push({
          ...monLoc,
          valueId: locationId,
          latLng: [parseFloat(monLoc['Location Latitude']), parseFloat(monLoc['Location Longitude'])],
        });
      });
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

      // Markers array used to display pins and handle location data
      this.markers.push({
        ...mapData,
        latLng: [this.pendingData[this.latQuestionId], this.pendingData[this.lngQuestionId]],
        lat: this.pendingData[this.latQuestionId],
        lng: this.pendingData[this.lngQuestionId],
        valueId: newValueId,
      });

      // Emit saveData to parent component to save to DB
      this.$emit('saveData', null, newValueId, this.pendingData);

      // Close location side nav, clear inputs, and turn off click event for map
      this.isAddingLocation = false;
      this.isEnteringLocationInfo = false;
      this.pendingData = {};
      if (this.map) this.map.off('click');
    },
    onAddLocationInfo() {
      this.pendingData = {};
      this.isEnteringLocationInfo = true;
      this.selectedLocation = null;
      this.shouldShowEdit = false;
    },
    onEdit(e, location) {
      this.selectedLocation = location;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.pendingData[q.id] = location[q.questionLabel];
      });
      this.isEnteringLocationInfo = true;
      this.shouldShowEdit = true;
    },
    submitLocationData() {
      if (this.shouldShowEdit) {
        this.editLocationData();
      } else {
        this.addLocationData();
      }
    },
    async editLocationData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedLocation.valueId,
        values: this.pendingData,
      });
      this.refreshLocationData(); // refresh markers and table data after editing
      this.isEnteringLocationInfo = false;
    },
    onDelete(e, location) {
      this.shouldShowDelete = true;
      if (location) {
        this.selectedLocation = location;
        this.shouldDeleteAll = false;
        this.shouldDeleteSingle = true;
      } else {
        this.shouldDeleteSingle = false;
        this.shouldDeleteAll = true;
      }
    },
    async deleteLocationData() {
      let valueIds = [];
      if (this.shouldDeleteSingle) {
        valueIds = [this.selectedLocation.valueId];
      } else {
        valueIds = this.markers.map((m) => m.valueId);
      }
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds });
      this.refreshLocationData(); // refresh markers and table data after deleting
      this.shouldShowDelete = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
  },
};
</script>
