<template>
  <div>
    <Modal v-if="shouldDisplayConcernsWarning" @close="closeConcernsWarningModal">
      <Alert
        message="Selecting No will remove all selected concerns from existing monitoring locations."
        type="warning"
      />
      <div class="btn-container">
        <Button label="Continue" type="success" @click.native="removeConcerns" />
        <Button label="Cancel" type="danger" @click.native="cancelYesNo" />
      </div>
    </Modal>
    <HoverText
      v-if="locationConcerns.length"
      class="hover-warning"
      hoverId="concernsInfo"
      linkText="Why are some concerns disabled?"
    >
      There are monitoring locations associated with these concerns. You must delete these locations before the concerns
      can be removed.
    </HoverText>
    <fieldset class="field">
      <legend class="is-sr-only">{{ concernsQuestion.label }}</legend>
      <div class="columns is-multiline">
        <CheckboxButton
          v-for="option in getOptions('concerns')"
          :key="option.id"
          :id="option.code"
          :name="option.label"
          :value="option.code"
          :disabled="locationConcerns.indexOf(option.code) > -1"
          :checked="!!(pendingData.waterConcerns && pendingData.waterConcerns.indexOf(option.code) > -1)"
          @check="updateConcern"
        />
      </div>
    </fieldset>
    <fieldset>
      <label :for="`question${concernsDifferByLocationQuestion.id}`" class="label is-size-4">
        {{ concernsDifferByLocationQuestion.questionLabel }}
      </label>
      <legend class="is-sr-only">{{ concernsDifferByLocationQuestion.questionLabel }}</legend>
      <div class="columns is-multiline">
        <CheckboxButton
          v-for="option in getOptions(concernsDifferByLocationQuestion.refName)"
          :key="option.id"
          :id="option.code"
          :name="option.label"
          :isSingleSelect="true"
          :singleSelectId="concernsDifferByLocationQuestion.questionName"
          :value="option.code"
          :checked="
            !!(
              pendingData[concernsDifferByLocationQuestion.questionName] &&
              pendingData[concernsDifferByLocationQuestion.questionName].indexOf(option.code) > -1
            )
          "
          @check="$emit('updateData', $event, concernsDifferByLocationQuestion)"
          @click.native="triggerConcernsWarningModal(option.code)"
        />
      </div>
    </fieldset>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Alert from '@/components/shared/Alert';
import Button from '@/components/shared/Button';
import CheckboxButton from '@/components/shared/CheckboxButton';
import HoverText from '@/components/shared/HoverText';
import Modal from '@/components/shared/Modal';

export default {
  name: 'Concerns',
  props: {
    questions: {
      type: Array,
      required: true,
    },
    pendingData: {
      type: Object,
    },
  },
  components: { Alert, Button, CheckboxButton, HoverText, Modal },
  data() {
    return {
      shouldDisplayConcernsWarning: false,
    };
  },
  computed: {
    ...mapState('ref', ['concerns', 'yesNo']),
    ...mapGetters('qapp', ['qappData']),
    ...mapGetters('structure', ['getQuestionId']),
    // This section has two questions - one for concerns, and one for whether concerns differ by location. Get them here to reference in the template above
    concernsQuestion() {
      return this.questions[0];
    },
    concernsDifferByLocationQuestion() {
      return this.questions[1];
    },
    /**
     * Check here if user has added monitoring locations and they have been associated with specific concerns.
     * If so, we must not allow the user to uncheck those concerns here, since they are being used in the locations section.
     * If this method returns concerns, we use above to disable and display a message to the user explaining this scenario.
     * */
    locationConcerns() {
      let concerns = [];
      if (this.qappData.mapWaterConcerns) {
        this.qappData.mapWaterConcerns.forEach((location) => {
          if (location.value) {
            concerns = concerns.concat(location.value.split(','));
          }
        });
      }
      return concerns;
    },
  },
  methods: {
    triggerConcernsWarningModal(value) {
      if (value === 'N' && this.qappData.mapWaterConcerns && this.qappData.locationId) {
        this.shouldDisplayConcernsWarning = true;
      }
    },
    closeConcernsWarningModal() {
      this.shouldDisplayConcernsWarning = false;
    },
    async removeConcerns() {
      this.shouldDisplayConcernsWarning = false;

      // Find all existing location concern values, and delete them in the database
      await this.$store.dispatch('qapp/deleteData', {
        qappId: this.$store.state.qapp.id,
        valueIds: this.qappData.mapWaterConcerns.map((c) => c.valueId),
        questionIds: [this.getQuestionId('mapWaterConcerns')],
      });
      this.$emit('updateData', { target: { value: 'N' } }, this.concernsDifferByLocationQuestion);
    },
    cancelYesNo() {
      this.shouldDisplayConcernsWarning = false;
      this.$emit('updateData', { target: { value: 'Y' } }, this.concernsDifferByLocationQuestion);
    },
    getOptions(refName) {
      return this[refName];
    },
    updateConcern(event) {
      const checkedValue = event.target.value;

      // Unchecking GEHPHYS unchecks GENBENTHIC
      if (
        checkedValue === 'GENPHYS' &&
        this.pendingData.waterConcerns.includes('GENBENTHIC') &&
        !event.target.checked
      ) {
        this.$emit('updateData', { target: { value: 'GENBENTHIC' } }, this.concernsQuestion);
      }
      // Checking GENBENTHIC unchecks GENPHYS
      else if (
        checkedValue === 'GENBENTHIC' &&
        !this.pendingData.waterConcerns.includes('GENPHYS') &&
        event.target.checked
      ) {
        this.$emit('updateData', { target: { value: 'GENPHYS' } }, this.concernsQuestion);
      }

      this.$emit('updateData', event, this.concernsQuestion);
    },
  },
};
</script>

<style lang="scss" scoped>
.hover-warning {
  display: inline-block;
  margin-bottom: 1rem;
}

.btn-container .button {
  margin-right: 1em;
}
</style>
