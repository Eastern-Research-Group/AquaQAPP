<template>
  <div>
    <Tabs :tabs="[{ id: 'list', name: 'List' }, { id: 'map', name: 'Map', isActive: true }]">
      <template v-slot:list>
        <!-- todo: add List component and insert here -->
        Coming Soon
      </template>
      <template v-slot:map>
        <Map :onAddLocation="onAddLocation" :isAddingLocation="isAddingLocation" :markers="markers" />
      </template>
    </Tabs>
    <SideNav
      v-if="isEnteringLocationInfo"
      :handleClose="() => (this.isEnteringLocationInfo = false)"
      title="Add Location"
    >
      <form @submit.prevent="addLocationData">
        <div class="field">
          <label for="locationName">Location Name</label>
          <input id="locationName" class="input" type="text" v-model="locationName" />
        </div>
        <div class="field">
          <label for="coords">Latitude, Longitude</label>
          <input id="coords" class="input" type="text" v-model="selectedCoordinates" />
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
        <button class="button is-success">Add</button>
      </form>
    </SideNav>
  </div>
</template>

<script>
import Map from './Map';
import SideNav from '@/components/shared/SideNav';
import Tabs from '@/components/shared/Tabs';

export default {
  components: { Map, SideNav, Tabs },
  data() {
    return {
      isAddingLocation: false,
      isEnteringLocationInfo: false,
      locationName: '',
      selectedCoordinates: null,
      waterType: null,
      concerns: [],
      markers: [],
      map: null,
    };
  },
  methods: {
    onAddLocation(map) {
      this.map = map;
      this.isAddingLocation = !this.isAddingLocation;
      // after clicking Add Location button, add click event to get Lat/Long of clicked area
      if (this.isAddingLocation) {
        this.map.on('click', (e) => {
          this.isEnteringLocationInfo = true;
          this.selectedCoordinates = `${e.latlng.lat}, ${e.latlng.lng}`;
        });
      } else {
        this.map.off('click');
      }
    },
    addLocationData() {
      const coordsArray = this.selectedCoordinates.split(', ');
      if (coordsArray.length === 2) {
        this.markers.push({
          title: this.locationName,
          waterType: this.waterType,
          concerns: this.concerns,
          latLng: coordsArray,
        });
      }
      this.isAddingLocation = false;
      this.isEnteringLocationInfo = false;
      this.map.off('click');
    },
  },
};
</script>
