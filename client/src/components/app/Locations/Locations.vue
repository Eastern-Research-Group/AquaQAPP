<template>
  <div>
    <Tabs :tabs="[{ id: 'list', name: 'List' }, { id: 'map', name: 'Map', isActive: true }]">
      <template v-slot:list>
        <LocationsTable
          :onAddLocationInfo="onAddLocationInfo"
          :rows="markers"
          :onEditRow="onEditRowInfo"
          :onDeleteRow="onDeleteRowInfo"
          :onDeleteAll="onDeleteAllRows"
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
        <div class="field">
          <label for="locationName">Location Name</label>
          <input id="locationName" class="input" type="text" v-model="locationName" required />
        </div>
        <div class="field">
          <label for="longitude">Longitude</label>
          <input id="longitude" class="input" type="text" v-model="longitude" required />
        </div>
        <div class="field">
          <label for="latitude">Latitude</label>
          <input id="latitude" class="input" type="text" v-model="latitude" required />
        </div>
        <div class="field">
          <label for="waterType">Water Type</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="waterType" value="fresh" v-model="waterType" />
              Fresh
            </label>
            <label class="radio">
              <input type="radio" name="waterType" value="brackish" v-model="waterType" />
              Brackish
            </label>
            <label class="radio">
              <input type="radio" name="waterType" value="salt" v-model="waterType" />
              Salt
            </label>
          </div>
        </div>
        <div class="field">
          <label for="concerns">Concerns</label>
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" name="concerns" value="quality" v-model="concerns" />
              Physical/Chemical Water Quality
            </label>
            <label class="checkbox">
              <input type="checkbox" name="concerns" value="benthic" v-model="concerns" />
              Benthic
            </label>
            <label class="checkbox">
              <input type="checkbox" name="concerns" value="recreation" v-model="concerns" />
              Recreation
            </label>
            <label class="checkbox">
              <input type="checkbox" name="concerns" value="other" v-model="concerns" />
              Other
            </label>
          </div>
        </div>
        <Button v-if="!shouldShowEdit" label="Add" type="success" submit />
        <Button v-if="shouldShowEdit" label="Edit" type="primary" submit />
      </form>
    </SideNav>
    <SideNav v-if="shouldShowDelete" title="Delete Location" :handleClose="() => (this.shouldShowDelete = false)">
      <template #default="props">
        <Alert v-if="shouldDeleteAll" :message="`Are you sure you want to delete all locations?`" type="warning" />
        <Alert v-if="shouldDeleteOne" :message="`Are you sure you want to delete ${locationName}?`" type="warning" />
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
  components: { Map, SideNav, Tabs, LocationsTable, Alert, Button },
  data() {
    return {
      isAddingLocation: false,
      isEnteringLocationInfo: false,
      locationName: '',
      longitude: null,
      latitude: null,
      waterType: null,
      concerns: [],
      markers: [],
      map: null,
      shouldShowDelete: false,
      shouldShowEdit: false,
      shouldDeleteAll: false,
      shouldDeleteOne: false,
      title: '',
    };
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
          this.longitude = e.latlng.lng;
          this.latitude = e.latlng.lat;
        });
      } else if (this.map) {
        this.map.off('click');
      }
    },
    addLocationData() {
      if (this.latitude && this.longitude) {
        this.markers.push({
          title: this.locationName,
          waterType: this.waterType,
          concerns: this.concerns,
          latLng: [this.latitude, this.longitude],
          lat: this.latitude,
          lng: this.longitude,
        });
      }
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
    onDeleteRowInfo() {
      this.shouldShowDelete = true;
      this.shouldDeleteOne = true;
      this.shouldDeleteAll = false;
    },
    onEditRowInfo() {
      this.isEnteringLocationInfo = true;
      this.shouldShowEdit = true;
    },
    onDeleteAllRows() {
      this.shouldShowDelete = true;
      this.shouldDeleteAll = true;
      this.shouldDeleteOne = false;
    },
  },
};
</script>
