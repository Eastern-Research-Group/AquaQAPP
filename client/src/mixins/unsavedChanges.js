import isEqual from 'lodash/isEqual';
import UnsavedWarning from '@/components/shared/UnsavedWarning';

export default {
  components: { UnsavedWarning },
  data() {
    return {
      currentEditData: {},
      shouldDisplayUnsavedWarning: false,
    };
  },
  methods: {
    checkSidenavData() {
      if (
        (!this.shouldShowEdit && Object.keys(this.pendingData).length) ||
        (this.shouldShowEdit && !isEqual(this.pendingData, this.currentEditData))
      ) {
        this.shouldDisplayUnsavedWarning = true;
        return false;
      }
      return true;
    },
    saveChanges() {
      this.shouldDisplayUnsavedWarning = false;
      console.log(this.$refs.form);
      if (!this.$refs.form.checkValidity()) {
        this.$refs.form.reportValidity();
        return;
      }
      this.submitData();
    },
    discardChanges() {
      this.pendingData = {};
      this.currentEditData = {};
      this.shouldDisplayUnsavedWarning = false;
      this.isEnteringInfo = false;
    },
  },
};
