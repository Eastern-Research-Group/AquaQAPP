<template>
  <section class="is-12 aq-tabs-container">
    <div class="tabs aq-tabs is-boxed">
      <ul>
        <li v-for="tab in tabs" :key="tab.id" :class="tab.id === activeTabId ? 'is-active' : ''">
          <button @click="activeTabId = tab.id">{{ tab.name }}</button>
        </li>
      </ul>
    </div>
    <slot :name="activeTabId" />
  </section>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTabId: this.tabs.find((t) => t.isActive) ? this.tabs.find((t) => t.isActive).id : this.tabs[0].id,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../static/variables';

.aq-tabs-container {
  clear: both;

  .tabs.aq-tabs {
    margin-bottom: 0;

    ul {
      border-bottom: 8px solid $lightBlue;

      li {
        min-width: 5em;

        button {
          align-items: center;
          background-color: $darkBlue;
          border: none;
          border-radius: 4px 4px 0 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 1rem;
          height: unset;
          justify-content: center;
          margin-right: 0.2em;
          margin-bottom: 0;
          padding: 0.6em 1.5em;
          vertical-align: top;

          &:hover {
            background-color: darken($darkBlue, 10);
          }
        }

        &.is-active button {
          background-color: $lightBlue;
          color: #363636;
          font-weight: bold;

          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
}
</style>
