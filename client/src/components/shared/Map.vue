<template>
  <section>
    <div class="aq-map-container">
      <div class="aq-map-add-btn">
        <button type="button" class="button is-link" @click="onAddLocation">
          {{ isAddingLocation ? 'Cancel' : 'Add Location' }}
        </button>
        <span v-if="isAddingLocation" class="has-text-black">Select a location on the map to add.</span>
      </div>
      <LMap
        ref="map"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <LTileLayer :url="url" />
        <template v-if="markers.length">
          <LMarker v-for="(marker, index) in markers" :key="index" :latLng="marker.latLng">
            <LPopup> {{ marker.title }}<br /> </LPopup>
          </LMarker>
        </template>
      </LMap>
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
  </section>
</template>

<script>
import SideNav from '@/components/shared/SideNav';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// required by vue2-leaflet library to fix icon issue
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  components: {
    LMap,
    LMarker,
    LPopup,
    LTileLayer,
    SideNav,
  },
  props: {},
  data() {
    return {
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 4,
      center: [39.8333333, -98.585522],
      bounds: null,
      isAddingLocation: false,
      isEnteringLocationInfo: false,
      map: null,
      locationName: '',
      selectedCoordinates: null,
      waterType: null,
      concerns: [],
      markers: [],
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    onAddLocation() {
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
  mounted() {
    // provide easier access to the leaflet map object
    this.map = this.$refs.map.mapObject;
  },
};
</script>

<style lang="scss">
.aq-map-container {
  position: relative;
  height: 500px;
}

.aq-map-add-btn {
  position: absolute;
  z-index: 500;
  left: 53px;
  top: 11px;

  span {
    display: inline-block;
    margin-left: 1em;
    padding: 5px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    background: white;
    border-radius: 4px;
  }
}

.checkbox {
  width: 100%;
}

.checkbox,
.radio {
  &:hover {
    color: #00b0e6;
  }
}
</style>
