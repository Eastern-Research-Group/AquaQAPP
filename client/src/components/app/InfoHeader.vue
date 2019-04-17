<template>
  <section class="info-header">
    <div class="container">
      <nav class="navbar" role="navigation">
        <div class="navbar-brand">
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="infoNav"
            @click="isActive = !isActive"
          >
            {{ $auth.user().name }}
          </a>
        </div>

        <div id="infoNav" :class="'navbar-menu' + (isActive ? ' is-active' : '')" v-if="isActive">
          <a class="navbar-item">
            Profile
          </a>
          <a class="navbar-item" @click="logout">
            Log Out
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item" v-if="currentQapp">
              {{ currentQapp.title }}
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link has-text-weight-semibold">
                {{ $auth.user().name }}
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Profile
                </a>
                <a class="navbar-item" @click="logout">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['userName'],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
  computed: {
    ...mapState('qapp', ['currentQapp']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.info-header {
  background-color: #e6e6e6;
  font-size: 0.8em;
  z-index: 50;

  .navbar, .navbar-brand, .navbar-burger {
    background-color: #e6e6e6;
    padding: 0;
    min-height: unset;
    height: 2.5em;
  }

  .navbar-burger {
    padding: 0.5em;
  }
}
</style>
