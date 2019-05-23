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
      <LTileLayer :url="url" />
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
                  @click.native="$emit('onEdit', $event, marker)"
                />
              </div>
              <div class="control">
                <Button
                  label="Delete"
                  type="danger"
                  icon="trash-alt"
                  :shouldShowIcon="true"
                  @click.native="$emit('onDelete', $event, marker)"
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
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import { Icon } from 'leaflet';
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
    LTileLayer,
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
