<template>
  <section>
    <b-row>
      <b-col class="side-nav">
        <ol>
          <li>Step 1</li>
          <li>Step 2</li>
          <li>Step 3</li>
          <li>Step 4</li>
          <li>Step 5</li>
          <li>Step 6</li>
          <li>Step 7</li>
          <li>Step 8</li>
          <li>Step 9</li>
          <li>Step 10</li>
        </ol>
      </b-col>
      <b-col cols="9" class="entry-section">
        <b-form>
          <b-form-group
              label="Field 1"
              label-for="field1"
          >
            <b-form-input
                id="field1"
                type="text"
                v-model="field1"
                required
                placeholder="Enter Field 1" />
          </b-form-group>

          <b-form-group
              label="Field 2"
              label-for="field2"
          >
            <b-form-input
                id="field2"
                type="text"
                v-model="field2"
                required
                placeholder="Enter Field 2" />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      field1: '',
      field2: '',
    };
  },
};
</script>

<style scoped>
.side-nav {
  padding-top: 1em;
  border-right: 1px solid #3B81D1;
}
.entry-section {
  padding-top: 1em;
}
</style>
