<template>
  <div class="aq-map-container">
    <div class="aq-map-add-btn">
      <Button
        :label="isAddingLocation ? 'Cancel' : 'Add Location'"
        type="dark"
        @click.native="$emit('onAddLocation', map)"
      />
      <span v-if="isAddingLocation" class="has-text-black">Select a location on the map to add.</span>
    </div>
    <div class="aq-map-toggle-btn">
      <Button
        :label="currentBasemap === 'satellite' ? 'Street View' : 'Satellite View'"
        type="link"
        @click.native="toggleBasemap"
      />
      <Button
        :label="isViewingIds ? 'View Markers' : 'View Location IDs'"
        type="link"
        @click.native="isViewingIds = !isViewingIds"
      />
    </div>
    <LMap
      ref="map"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <template v-if="markers.length">
        <LMarker v-for="(marker, index) in markers" :key="index" :latLng="marker.latLng">
          <LIcon v-if="isViewingIds" class-name="id-marker">
            <div class="location-id">{{ marker['Location ID'] }}</div>
          </LIcon>
          <LPopup>
            <p>{{ marker['Location Name'] }} (ID: {{ marker['Location ID'] }})</p>
            <div class="field is-grouped">
              <div class="control">
                <Button
                  label="Edit"
                  type="primary"
                  icon="edit"
                  :shouldShowIcon="true"
                  @click.native="$emit('onEdit', marker)"
                />
              </div>
              <div class="control">
                <Button
                  label="Delete"
                  type="danger"
                  icon="trash-alt"
                  :shouldShowIcon="true"
                  @click.native="$emit('onDelete', marker)"
                />
              </div>
            </div>
          </LPopup>
        </LMarker>
      </template>
    </LMap>
  </div>
</template>

<script>
import Button from '@/components/shared/Button';
import { LIcon, LMap, LMarker, LPopup } from 'vue2-leaflet';
import { Icon, featureGroup, marker, control } from 'leaflet';
import 'leaflet-compass/dist/leaflet-compass.min';
import 'leaflet-compass/dist/leaflet-compass.min.css';
import * as esri from 'esri-leaflet';
import 'leaflet/dist/leaflet.css';

// required by vue2-leaflet library to fix icon issue
delete Icon.Default.prototype._getIconUrl; // eslint-disable-line
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  components: {
    LIcon,
    LMap,
    LMarker,
    LPopup,
    Button,
  },
  props: {
    isAddingLocation: {
      type: Boolean,
      required: false,
    },
    markers: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    markers() {
      this.fitMapToMarkers();
    },
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_ESRI_API_KEY,
      currentBasemap: 'satellite',
      hydroLayer: null,
      satelliteLayer: null,
      satelliteLabelLayer: null,
      streetLayer: null,
      // streetLabelLayer: null,
      zoom: 4,
      center: [39.8333333, -98.585522],
      bounds: null,
      map: null,
      isViewingIds: false,
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
    fitMapToMarkers() {
      if (!this.markers.length) return;
      const pins = this.markers.map((m) => marker(m.latLng));
      const toBounds = new featureGroup(pins).getBounds().pad(0.1); // eslint-disable-line
      this.map.flyToBounds(toBounds, { duration: 0.5, maxZoom: 11 });
    },
    toggleBasemap() {
      if (this.currentBasemap === 'satellite') {
        this.currentBasemap = 'street';
        this.map.removeLayer(this.satelliteLayer);
        this.map.removeLayer(this.satelliteLabelLayer);
        this.map.addLayer(this.streetLayer);
        // this.map.addLayer(this.streetLabelLayer);
        this.map.removeLayer(this.hydroLayer);
        this.map.addLayer(this.hydroLayer);
      } else {
        this.currentBasemap = 'satellite';
        this.map.removeLayer(this.streetLayer);
        // this.map.removeLayer(this.streetLabelLayer);
        this.map.addLayer(this.satelliteLayer);
        this.map.addLayer(this.satelliteLabelLayer);
        this.map.removeLayer(this.hydroLayer);
        this.map.addLayer(this.hydroLayer);
      }
    },
  },
  mounted() {
    // provide easier access to the leaflet map object
    this.map = this.$refs.map.mapObject;

    this.satelliteLayer = esri.basemapLayer('Imagery', { apikey: this.apiKey, apikey: this.apiKey, token: this.apiKey }).addTo(this.map);
    this.satelliteLabelLayer = esri.basemapLayer('ImageryLabels', { apikey: this.apiKey }).addTo(this.map);

    this.streetLayer = esri.basemapLayer('Streets', { apikey: this.apiKey });
    // this.streetLabelLayer = esri.basemapLayer('GrayLabels', { apiKey: this.apiKey });

    // Display hydro layer on all map views
    this.hydroLayer = esri
      .tiledMapLayer({
        url:
          'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Overlay/MapServer',
      })
      .addTo(this.map);

    this.fitMapToMarkers();

    control.scale().addTo(this.map);
    control.compass().addTo(this.map);
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

.aq-map-toggle-btn {
  position: absolute;
  z-index: 500;
  right: 65px;
  top: 11px;

  .button {
    margin-left: 0.5rem;
  }
}

.id-marker {
  background-color: aqua;
  color: #363636;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 0 20px 20px 20px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;

  .location-id {
    font-size: 14px;
    max-width: 75px;
    overflow-wrap: break-word;
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

.leaflet-container {
  font: unset;
}

.leaflet-top, .leaflet-bottom {
  z-index: 400;
}
</style>
<style>
.compass-alert {
  display: none !important;
}
</style>
