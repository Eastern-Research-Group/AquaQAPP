<template>
  <div>
    <Tabs :tabs="[{ id: 'map', name: 'Map', isActive: true }, { id: 'list', name: 'List' }]">
      <template v-slot:list>
        <Table
          :columns="columns"
          :rows="markers"
          :shouldHaveActionsCol="true"
          :shouldHaveGlobalActions="true"
          noDataMessage="No locations have been added. Add a location to continue."
          @onEdit="onEdit"
          @onDelete="onDelete"
          @onAdd="onAddLocationInfo"
        />
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
      v-if="isEnteringInfo"
      :beforeClose="checkSidenavData"
      :handleClose="() => (this.isEnteringInfo = false)"
      :title="shouldShowEdit ? 'Edit Location' : 'Add Location'"
    >
      <form ref="form" @submit.prevent="submitLocationData">
        <Alert
          v-if="isFormIncomplete"
          ref="alert"
          type="error"
          message="All fields are required. Please enter all fields to submit."
          tabindex="0"
        />
        <div class="field" v-for="question in currentQuestions" :key="question.id">
          <label
            v-if="question.questionLabel !== 'Water Quality Concerns' || shouldShowConcerns()"
            class="label"
            :for="`question${question.id}`"
            >{{ question.questionLabel }}</label
          >
          <input
            v-if="question.dataEntryType === 'text'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            type="text"
            :placeholder="`Enter ${question.questionLabel}`"
            required
          />
          <input
            v-if="question.dataEntryType === 'number'"
            :id="`question${question.id}`"
            v-model="pendingData[question.questionName]"
            class="input"
            type="number"
            min="-180"
            max="180"
            step="0.000001"
            :placeholder="`Enter ${question.questionLabel}`"
            required
          />
          <template v-if="question.dataEntryType === 'radio'">
            <template v-for="(option, index) in getOptions(question.refName)">
              <input
                :key="index"
                :id="option.id"
                class="is-checkradio is-info"
                type="radio"
                :value="option.id"
                v-model="pendingData[question.questionName]"
              />
              <label :key="option.name" :for="option.id">{{ option.name }}</label>
            </template>
          </template>
          <div v-if="question.dataEntryType === 'select'">
            <multiselect
              v-if="question.questionName === 'mapWaterConcerns'"
              v-model="pendingData[question.questionName]"
              :options="getConcerns()"
              :placeholder="`Select ${question.questionLabel}`"
              label="label"
              track-by="code"
              :multiple="true"
            ></multiselect>
            <multiselect
              v-else
              v-model="pendingData[question.questionName]"
              :options="getOptions(question.refName)"
              :placeholder="`Select ${question.questionLabel}`"
              :label="question.questionName === 'horizCollectionMethod' ? 'name' : undefined"
              :track-by="question.questionName === 'horizCollectionMethod' ? 'id' : undefined"
              :multiple="false"
            ></multiselect>
          </div>
        </div>
        <SideNavSave />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldDisplayDeleteWarning"
      title="Delete Location"
      :itemLabel="selectedLocation ? selectedLocation['Location Name'] : 'all locations'"
      @close="() => (shouldDisplayDeleteWarning = false)"
      @onDelete="deleteLocationData"
      :disabled="selectedLocationHasParameters || (!selectedLocation && anyLocationHasParameters)"
      :message="deleteWarningMessage"
    />
    <UnsavedWarning
      v-if="shouldDisplayUnsavedWarning"
      @onClose="() => (shouldDisplayUnsavedWarning = false)"
      @onSave="saveChanges"
      @onDiscard="discardChanges"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapGetters } from 'vuex';
import unsavedChanges from '@/mixins/unsavedChanges';
import Map from './Map';
import SideNav from '@/components/shared/SideNav';
import SideNavSave from '@/components/shared/SideNavSave';
import Tabs from '@/components/shared/Tabs';
import Table from '@/components/shared/Table';
import DeleteWarning from '@/components/shared/DeleteWarning';
import Alert from '@/components/shared/Alert';
import '../../../../static/bulma-multiselect.css';

export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  components: { Map, SideNav, SideNavSave, Tabs, Multiselect, Table, DeleteWarning, Alert },
  mixins: [unsavedChanges],
  data() {
    return {
      markers: [],
      map: null,
      isAddingLocation: false,
      isEnteringInfo: false,
      shouldDisplayDeleteWarning: false,
      shouldShowEdit: false,
      shouldDeleteAll: false,
      shouldDeleteSingle: false,
      pendingData: {},
      selectedLocation: null,
      columns: [
        { key: 'Location ID', label: 'Location ID' },
        { key: 'Location Name', label: 'Location Name' },
        { key: 'waterConcerns', label: 'Water Quality Concerns' },
      ],
      isFormIncomplete: false,
    };
  },
  computed: {
    ...mapState({
      qappId: (state) => state.qapp.id,
    }),
    ...mapState('ref', [
      'locationTypes',
      'collectionMethods',
      'coordRefSystems',
      'concerns',
      'waterTypes',
      'parameters',
    ]),
    ...mapGetters('qapp', ['qappData']),
    currentQuestions() {
      if (this.qappData.differByLocation === 'N') {
        return this.questions.filter((q) => q.questionName !== 'mapWaterConcerns');
      }
      return this.questions;
    },
    selectedLocationHasParameters() {
      if (!this.selectedLocation || !this.qappData.parametersByLocation) return false;

      const paramsByLocationDatum = this.qappData.parametersByLocation.find(
        (p) => p.valueId === this.selectedLocation.valueId
      );
      if (paramsByLocationDatum) return true;
      return false;
    },
    anyLocationHasParameters() {
      if (!this.qappData.parametersByLocation) return false;
      let hasParams = false;
      this.markers.forEach((marker) => {
        if (this.qappData.parametersByLocation.find((p) => p.valueId === marker.valueId)) {
          hasParams = true;
        }
      });
      return hasParams;
    },
    deleteWarningMessage() {
      if (this.selectedLocationHasParameters) {
        return `${
          this.selectedLocation['Location Name']
        } is associated with one or more selected parameters that must be removed before deleting this location.`;
      }
      if (!this.selectedLocation && this.anyLocationHasParameters) {
        return 'One or more locations are associated with one or more selected parameters that must be removed before deleting all locations.';
      }
      return null;
    },
  },
  mounted() {
    this.refreshLocationData();
  },
  methods: {
    getOptions(refName) {
      // get reference data array based on refName field in questions table
      return this[refName];
    },
    onAddLocation(map) {
      this.selectedLocation = null;
      this.pendingData = {};
      this.shouldShowEdit = false;
      this.map = map;
      this.isAddingLocation = !this.isAddingLocation;
      // after clicking Add Location button, add click event to get Lat/Long of clicked area
      if (this.isAddingLocation) {
        this.map.on('click', (e) => {
          this.isFormIncomplete = false;
          this.isEnteringInfo = true;
          this.pendingData.locationLat = e.latlng.lat.toFixed(6);
          this.pendingData.locationLong = e.latlng.lng.toFixed(6);
        });
      } else if (this.map) {
        this.map.off('click');
      }
    },
    getLocationConcerns(location) {
      if (Array.isArray(location['Water Quality Concerns'])) {
        return location['Water Quality Concerns'].map((c) => c.label).join(', ');
      }
      if (location['Water Quality Concerns']) {
        const locationConcerns = this.concerns.filter((concern) =>
          location['Water Quality Concerns'].split(',').includes(concern.code)
        );
        location['Water Quality Concerns'] = locationConcerns;
        return locationConcerns.map((c) => c.label).join(', ');
      }
      const locationConcerns = this.concerns.filter((concern) =>
        this.qappData.waterConcerns.split(',').includes(concern.code)
      );
      return locationConcerns.map((c) => c.label).join(', ');
    },
    refreshLocationData() {
      const locations = [];
      if (this.qappData.locationId) {
        this.qappData.locationId.forEach((val) => {
          const location = { valueId: val.valueId };
          this.questions.forEach((q) => {
            if (this.qappData[q.questionName]) {
              const valueObj = this.qappData[q.questionName].find((datum) => datum.valueId === val.valueId);
              location[q.questionLabel] = valueObj ? valueObj.value : '';
            }
          });
          location.latLng = [parseFloat(location['Location Latitude']), parseFloat(location['Location Longitude'])];

          // Populate concerns in Locations table (if concerns do not differ by location, use all selected concerns)
          location.waterConcerns = this.getLocationConcerns(location);

          location['Horizontal Collection Method'] = this.collectionMethods.find(
            (m) => m.id === parseInt(location['Horizontal Collection Method'], 10)
          );
          locations.push(location);
        });
      }
      this.markers = locations;
    },
    async addLocationData() {
      // Push data to markers array to display markers on map with corresponding info
      const mapData = {};
      this.questions.forEach((q) => {
        mapData[q.questionLabel] = this.pendingData[q.questionName];
      });

      // A unique value id allows us to save multiple sets of locations to the DB, each tied to a value id
      let newValueId = 1;
      if (this.markers.length) {
        newValueId = Math.max(...this.markers.map((marker) => marker.valueId)) + 1;
      }

      // Markers array used to display pins and handle location data
      this.markers.push({
        ...mapData,
        latLng: [this.pendingData.locationLat, this.pendingData.locationLong],
        waterConcerns: this.getLocationConcerns(mapData),
        valueId: newValueId,
      });

      // Emit saveData to parent component to save to DB
      // this.pendingData.paramsByLocation =
      //   (this.pendingData.waterType === 'Fresh' && 'Freshwater') ||
      //   ((this.pendingData.waterType === 'Salt' || 'Brackish') && 'Saltwater');
      await this.$listeners.saveData(null, newValueId, this.cleanData(this.pendingData));

      // Close location side nav, clear inputs, and turn off click event for map
      this.isAddingLocation = false;
      this.isEnteringInfo = false;
      this.pendingData = {};
      if (this.map) this.map.off('click');
    },
    onAddLocationInfo() {
      this.isFormIncomplete = false;
      this.pendingData = {};
      this.isEnteringInfo = true;
      this.selectedLocation = null;
      this.shouldShowEdit = false;
    },
    onEdit(location) {
      this.isFormIncomplete = false;
      this.selectedLocation = location;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.questionName, location[q.questionLabel]);
      });
      this.currentEditData = { ...this.pendingData };
      this.isEnteringInfo = true;
      this.shouldShowEdit = true;
    },
    submitLocationData() {
      this.isFormIncomplete = false;
      // check that each field is completed before submitting
      this.questions.forEach((q) => {
        if (
          (!this.pendingData[q.questionName] && this.shouldShowConcerns()) ||
          (!this.pendingData[q.questionName] && !this.shouldShowConcerns() && q.questionName !== 'mapWaterConcerns')
        ) {
          this.isFormIncomplete = true;
        }
      });
      // nextTick waits until Alert is now displayed (based on its v-if), and then sets focus to the alert
      this.$nextTick().then(() => {
        if (this.$refs.alert) this.$refs.alert.$el.focus();
      });
      if (!this.isFormIncomplete && this.shouldShowEdit) {
        this.editLocationData();
      } else if (!this.isFormIncomplete) {
        this.addLocationData();
      }
    },
    async editLocationData() {
      await this.$store.dispatch('qapp/updateData', {
        qappId: this.qappId,
        valueId: this.selectedLocation.valueId,
        values: this.cleanData(this.pendingData),
      });
      this.refreshLocationData(); // refresh markers and table data after editing
      this.isEnteringInfo = false;
    },
    onDelete(location) {
      if (location) {
        this.shouldDeleteSingle = true;
        this.selectedLocation = location;
      } else {
        this.shouldDeleteAll = true;
      }
      this.shouldDisplayDeleteWarning = true;
    },
    async deleteLocationData() {
      let valueIds = [];
      if (this.shouldDeleteAll) {
        valueIds = this.markers.map((m) => m.valueId);
      } else {
        valueIds = [this.selectedLocation.valueId];
      }
      const questionIds = this.questions.map((q) => q.id);
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds, questionIds });
      this.refreshLocationData(); // refresh markers and table data after deleting
      this.shouldDisplayDeleteWarning = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
    cleanData() {
      // vue-multiselect sets values to objects - set values as id instead of the full object before posting to db
      const cleanedData = {};
      Object.keys(this.pendingData).forEach((qName) => {
        if (typeof this.pendingData[qName] === 'object') {
          // if array, store comma separate list of codes
          if (Array.isArray(this.pendingData[qName])) {
            const codesArray = this.pendingData[qName].map((datum) => {
              return datum.code;
            });
            cleanedData[qName] = codesArray.join(',');
          } else if (this.pendingData[qName]) {
            cleanedData[qName] = this.pendingData[qName].id;
          }
        } else {
          cleanedData[qName] = this.pendingData[qName];
        }
      });
      return cleanedData;
    },
    shouldShowConcerns() {
      return this.qappData.differByLocation === 'Y';
    },
    getConcerns() {
      const concerns = [];
      const selectedConcerns = this.qappData.waterConcerns;
      if (selectedConcerns) {
        this.concerns.forEach((concern) => {
          if (selectedConcerns.indexOf(concern.code) > -1) {
            concerns.push(concern);
          }
        });
      }
      return concerns;
    },
  },
};
</script>
