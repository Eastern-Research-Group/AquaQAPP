<template>
  <div class="columns">
    <aside class="menu column is-one-quarter">
      <ol class="menu-list">
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
    </aside>
    <section class="column is-three-quarters">
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">Field 1</label>
          <input class="input" type="text" placeholder="Enter field 1" />
        </div>
        <div class="field">
          <label class="label">Field 2</label>
          <input class="input" type="text" placeholder="Enter field 2" />
        </div>
      </form>
    </section>
  </div>
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
.menu {
  border-right: 1px solid #00b0e6;
}
</style>
