<template>
  <div>
    <label class="label is-size-4">Monitoring Locations</label>
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
      v-if="isEnteringLocationInfo"
      :handleClose="() => (this.isEnteringLocationInfo = false)"
      :title="shouldShowEdit ? 'Edit Location' : 'Add Location'"
    >
      <form @submit.prevent="submitLocationData">
        <Alert
          v-if="isFormIncomplete"
          ref="alert"
          type="error"
          message="All fields are required. Please enter all fields to submit."
          tabindex="0"
        />
        <div class="field" v-for="question in questions" :key="question.id">
          <label
            v-if="question.questionLabel !== 'Water Quality Concerns' || shouldShowConcerns()"
            class="label"
            :for="`question${question.id}`"
            >{{ question.questionLabel }}</label
          >
          <input
            v-if="question.dataEntryType === 'text'"
            :id="`question${question.id}`"
            v-model="pendingData[question.id]"
            class="input"
            type="text"
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
                v-model="pendingData[question.id]"
              />
              <label :key="option.name" :for="option.id">{{ option.name }}</label>
            </template>
          </template>
          <div v-if="question.dataEntryType === 'select'">
            <multiselect
              v-if="question.questionLabel === 'Water Quality Concerns' && shouldShowConcerns()"
              v-model="pendingData[question.id]"
              :options="getConcerns()"
              :placeholder="`Select ${question.questionLabel}`"
              :custom-label="question.refName === 'coordRefSystems' ? nameWithDesc : undefined"
              label="label"
              track-by="code"
              :multiple="true"
            ></multiselect>
            <multiselect
              v-else-if="question.questionLabel !== 'Water Quality Concerns'"
              v-model="pendingData[question.id]"
              :options="getOptions(question.refName)"
              :placeholder="`Select ${question.questionLabel}`"
              :custom-label="question.refName === 'coordRefSystems' ? nameWithDesc : undefined"
              label="name"
              track-by="name"
            ></multiselect>
          </div>
        </div>
        <Button
          :label="shouldShowEdit ? 'Save' : 'Add and Save'"
          :type="shouldShowEdit ? 'primary' : 'success'"
          submit
        />
      </form>
    </SideNav>
    <DeleteWarning
      v-if="shouldShowDelete"
      title="Delete Location"
      :itemLabel="shouldDeleteAll ? 'all locations' : selectedLocation['Location Name']"
      @close="() => (shouldShowDelete = false)"
      @onDelete="deleteLocationData"
      :disabled="disabled"
      :message="
        (disabledAll &&
          shouldDeleteAll &&
          `One or more locations are associated with one or more selected parameters that must be removed before deleting all locations.`) ||
          (disabled &&
            `${
              selectedLocation['Location Name']
            } is associated with one or more selected parameters that must be removed before deleting this location.`)
      "
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapGetters } from 'vuex';
import getQuestionIdByName from '@/utils/getQuestionIdByName';
import Map from './Map';
import SideNav from '@/components/shared/SideNav';
import Tabs from '@/components/shared/Tabs';
import Button from '@/components/shared/Button';
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
  components: { Map, SideNav, Tabs, Button, Multiselect, Table, DeleteWarning, Alert },
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
      latQuestionId: getQuestionIdByName(this.questions, 'locationLat'),
      lngQuestionId: getQuestionIdByName(this.questions, 'locationLong'),
      pendingData: {},
      selectedLocation: null,
      columns: [
        { key: 'Location ID', label: 'Location ID' },
        { key: 'Location Name', label: 'Location Name' },
        { key: 'Location Latitude', label: 'Latitude' },
        { key: 'Location Longitude', label: 'Longitude' },
      ],
      isFormIncomplete: false,
      disabled: false,
      disabledAll: false,
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
    ...mapState({
      allQuestions: (state) => state.structure.questions,
    }),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', [
      'concernsQuestionId',
      'concernsDifferByLocQuestionId',
      'locConcernsQuestionId',
      'parametersQuestionId',
    ]),
  },
  mounted() {
    this.refreshLocationData();
  },
  methods: {
    onDisableDelete(location) {
      if (location) {
        const selectedParams = this.qappData[this.parametersQuestionId].split(',');
        const filteredParams = [];
        this.parameters.forEach((param) => {
          if (selectedParams.some((p) => parseInt(p, 10) === param.id)) {
            filteredParams.push(param);
          }
        });
        if (location['Water Type'] === 'Fresh' && !!filteredParams.find((p) => p.waterType === 'Freshwater')) {
          this.disabled = true;
          this.disabledAll = true;
        } else if (location['Water Type'] === 'Salt' && !!filteredParams.find((p) => p.waterType === 'Saltwater')) {
          this.disabled = true;
          this.disabledAll = true;
        }
      }
    },
    getOptions(refName) {
      // get reference data array based on refName field in questions table
      return this[refName];
    },
    nameWithDesc(option) {
      // set custom label for coordRefSystems, since name is a code
      return `${option.name} - ${option.description}`;
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
          this.isEnteringLocationInfo = true;
          this.pendingData[this.latQuestionId] = e.latlng.lat.toFixed(6);
          this.pendingData[this.lngQuestionId] = e.latlng.lng.toFixed(6);

          // Set default metadata automatically when user selects location by map
          this.pendingData[getQuestionIdByName(this.questions, 'horizCollectionMethod')] = this.collectionMethods.find(
            (v) => v.id === 18
          );
          this.pendingData[getQuestionIdByName(this.questions, 'horizCoordinateSystem')] = this.coordRefSystems.find(
            (v) => v.id === 16
          );
        });
      } else if (this.map) {
        this.map.off('click');
      }
    },
    refreshLocationData() {
      this.markers = [];

      // Add markers to map if location data already exists
      const locations = {};

      // Logic to loop through existing qapp data and set up markers to be used by leaflet map
      Object.keys(this.qappData).forEach((qId) => {
        const datum = this.qappData[qId];
        const question = this.questions.find((q) => q.id === parseInt(qId, 10));
        if (Array.isArray(datum) && question) {
          const key = question.questionLabel;
          datum.forEach((locationField) => {
            if (typeof locations[locationField.valueId] === 'undefined') locations[locationField.valueId] = {};
            if (question.refName === 'concerns') {
              locations[locationField.valueId][key] = this.concerns.filter(
                (r) => locationField.value && locationField.value.indexOf(r.code) > -1
              );
            } else if (question.dataEntryType === 'select') {
              locations[locationField.valueId][key] = this[question.refName].find(
                (r) => r.id === parseInt(locationField.value, 10)
              );
            } else {
              locations[locationField.valueId][key] = locationField.value;
            }
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
      if (this.markers.length) {
        newValueId = Math.max(...this.markers.map((marker) => marker.valueId)) + 1;
      }

      // Markers array used to display pins and handle location data
      this.markers.push({
        ...mapData,
        latLng: [this.pendingData[this.latQuestionId], this.pendingData[this.lngQuestionId]],
        valueId: newValueId,
      });

      // Emit saveData to parent component to save to DB
      this.$emit('saveData', null, newValueId, this.cleanData(this.pendingData));

      // Close location side nav, clear inputs, and turn off click event for map
      this.isAddingLocation = false;
      this.isEnteringLocationInfo = false;
      this.pendingData = {};
      if (this.map) this.map.off('click');
    },
    onAddLocationInfo() {
      this.isFormIncomplete = false;
      this.pendingData = {};
      this.isEnteringLocationInfo = true;
      this.selectedLocation = null;
      this.shouldShowEdit = false;
    },
    onEdit(location) {
      this.isFormIncomplete = false;
      this.selectedLocation = location;
      // Set pending data by questionId from location by questionLabel
      this.questions.forEach((q) => {
        this.$set(this.pendingData, q.id, location[q.questionLabel]);
      });
      this.isEnteringLocationInfo = true;
      this.shouldShowEdit = true;
    },
    submitLocationData() {
      this.isFormIncomplete = false;
      // check that each field is completed before submitting
      this.questions.forEach((q) => {
        if (
          (!this.pendingData[q.id] && this.shouldShowConcerns()) ||
          (!this.pendingData[q.id] && !this.shouldShowConcerns() && q.id !== this.locConcernsQuestionId)
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
      this.isEnteringLocationInfo = false;
    },
    onDelete(location) {
      this.shouldShowDelete = true;
      this.disabled = false;
      if (location) {
        this.selectedLocation = location;
        this.shouldDeleteAll = false;
        this.shouldDeleteSingle = true;
        this.onDisableDelete(this.selectedLocation);
      } else if (this.disabledAll) {
        this.disabled = true;
        this.shouldDeleteAll = true;
      } else {
        this.disabledAll = false;
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
      const questionIds = this.questions.map((q) => q.id);
      await this.$store.dispatch('qapp/deleteData', { qappId: this.qappId, valueIds, questionIds });
      this.refreshLocationData(); // refresh markers and table data after deleting
      this.shouldShowDelete = false;
      this.shouldDeleteSingle = false;
      this.shouldDeleteAll = false;
    },
    cleanData() {
      // vue-multiselect sets values to objects - set values as id instead of the full object before posting to db
      const cleanedData = {};
      Object.keys(this.pendingData).forEach((qId) => {
        if (typeof this.pendingData[qId] === 'object') {
          // if array, store comma separate list of codes
          if (Array.isArray(this.pendingData[qId])) {
            const codesArray = this.pendingData[qId].map((datum) => {
              return datum.code;
            });
            cleanedData[qId] = codesArray.join(',');
          } else {
            cleanedData[qId] = this.pendingData[qId].id;
          }
        } else {
          cleanedData[qId] = this.pendingData[qId];
        }
      });
      return cleanedData;
    },
    shouldShowConcerns() {
      return this.qappData[this.concernsDifferByLocQuestionId] === 'Y';
    },
    getConcerns() {
      const concerns = [];
      const selectedConcerns = this.qappData[this.concernsQuestionId];
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
