<template>
  <div class="aq-map-container">
    <div class="aq-map-add-btn">
      <Button
        :label="this.isAddingLocation ? 'Cancel' : 'Add Location'"
        type="dark"
        @click.native="$emit('onAddLocation', map)"
      />
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
      <template v-if="markers.length">
        <LMarker v-for="(marker, index) in markers" :key="index" :latLng="marker.latLng">
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
import { LMap, LMarker, LPopup } from 'vue2-leaflet';
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
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 4,
      center: [39.8333333, -98.585522],
      bounds: null,
      map: null,
      label: '',
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
  },
  mounted() {
    // provide easier access to the leaflet map object
    this.map = this.$refs.map.mapObject;

    // Add satellite imagery layer
    esri
      .tiledMapLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      })
      .addTo(this.map);

    esri
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

.leaflet-bottom {
  z-index: 400;
}
</style>
<style>
.compass-alert {
  display: none !important;
}
</style>
