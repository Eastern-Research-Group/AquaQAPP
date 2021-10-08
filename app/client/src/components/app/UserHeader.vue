<template>
  <section class="user-header">
    <div>
      <a
        role="button"
        class="tablet-nav navbar-link"
        aria-label="menu"
        aria-expanded="false"
        data-target="infoNav"
        @click="isActive = !isActive"
      >
        {{ $auth.user().name }}
      </a>

      <div id="infoNav" :class="'tablet-nav navbar-menu' + (isActive ? ' is-active' : '')" v-if="isActive">
        <a class="navbar-item">
          Profile
        </a>
        <a class="navbar-item" @click="logout">
          Log Out
        </a>
      </div>

      <div class="navbar-item has-dropdown is-hoverable desktop-nav">
        <a class="navbar-link">
          {{ $auth.user().name }}
        </a>

        <div class="navbar-dropdown">
          <a
            class="navbar-item"
            @click="
              () => {
                shouldShowProfile = true;
                error = null;
                showSuccessProfileMessage = false;
              }
            "
          >
            Profile
          </a>
          <a class="navbar-item" @click="logout">
            Log Out
          </a>
        </div>
      </div>

      <SideNav
        v-if="shouldShowProfile"
        :handleClose="() => (shouldShowProfile = false)"
        title="Profile"
        class="profile-title"
      >
        <template #default="props">
          <form id="editProfile" @submit.prevent="handleProfileSubmit">
            <div class="field">
              <label for="name" class="label has-text-white">Full Name</label>
              <input
                id="name"
                class="input"
                type="text"
                required
                placeholder="Enter Full Name"
                v-model="name"
                maxlength="255"
              />
            </div>
            <div class="field">
              <label for="email" class="label has-text-white">Email</label>
              <input
                id="email"
                class="input"
                type="email"
                required
                placeholder="Enter email"
                v-model="email"
                maxlength="255"
              />
            </div>
            <div class="field">
              <label for="organization" class="label has-text-white">Organization</label>
              <input
                id="organization"
                class="input"
                type="text"
                required
                placeholder="Enter organization"
                v-model="organization"
                maxlength="255"
              />
            </div>
            <hr />
            <div class="field is-grouped">
              <div class="control">
                <Button label="Save" type="success" :isBusy="isSavingProfile" submit />
              </div>
              <div class="control">
                <Button label="Change Password" type="info" @click.native="changePasswordModal" />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <Button label="Cancel" type="cancel" :preventEvent="true" @click.native="props.close" />
              </div>
            </div>
          </form>
          <br />
          <Alert v-if="showSuccessProfileMessage" :message="successProfileMessage" type="success" />
          <Alert v-if="error" :message="error" type="error" />
        </template>
      </SideNav>
      <ExampleModal
        v-if="shouldShowChangePassword"
        :handleClose="
          () => {
            shouldShowChangePassword = false;
          }
        "
        class="changePassword"
      >
        <span class="title is-size-4">Change Password</span>
        <hr />
        <form id="changePassword" @submit.prevent="handleChangePassword">
          <div class="field">
            <label class="label has-text-white">Current Password</label>
            <input
              class="input"
              type="password"
              required
              placeholder="Enter Current Password"
              v-model="currentPassword"
              maxlength="255"
            />
          </div>
          <div class="field">
            <label class="label has-text-white"
              >New Password
              <HoverText :icon="true" hoverId="passwordInfo">
                Must be at least 8 characters in length and contain at least one lower-case and upper-case character and
                one number.
              </HoverText>
            </label>
            <input
              class="input"
              type="password"
              required
              placeholder="Enter New Password"
              v-model="newPassword"
              maxlength="255"
            />
          </div>
          <div class="field">
            <label class="label has-text-white">Confirm New Password</label>
            <input
              class="input"
              type="password"
              required
              placeholder="Confirm New Password"
              v-model="confirmNewPassword"
              maxlength="255"
            />
          </div>
          <div class="field">
            <Alert v-if="error" :message="error" type="error" />
          </div>
          <hr />
          <div class="field is-grouped">
            <div class="control">
              <Button label="Change" type="success" :isBusy="isChangingPassword" submit />
            </div>
            <div class="control">
              <Button
                label="Cancel"
                type="cancel"
                :preventEvent="true"
                @click.native="
                  () => {
                    shouldShowChangePassword = false;
                  }
                "
              />
            </div>
            <div class="control">
              <Alert v-if="showSuccessPasswordMessage" :message="successPasswordMessage" type="success" />
            </div>
          </div>
        </form>
      </ExampleModal>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Button from '@/components/shared/Button';
import SideNav from '@/components/shared/SideNav';
import Alert from '@/components/shared/Alert';
import ExampleModal from '@/components/shared/ExampleModal';
import HoverText from '@/components/shared/HoverText';

export default {
  props: ['userName'],
  components: { Button, SideNav, Alert, ExampleModal, HoverText },
  data() {
    return {
      name: this.$auth.user().name,
      email: this.$auth.user().email,
      organization: this.$auth.user().organization,
      isActive: false,
      error: null,
      shouldShowProfile: false,
      showSuccessProfileMessage: false,
      shouldShowChangePassword: false,
      showSuccessPasswordMessage: false,
      successProfileMessage: 'Your profile was successfully updated.',
      successPasswordMessage: 'Your password was successfully updated.',
    };
  },
  methods: {
    ...mapActions('user', ['saveProfile', 'changePassword']),
    logout() {
      this.$auth.logout();
    },
    async handleProfileSubmit() {
      try {
        await this.saveProfile({
          newName: this.name,
          newEmail: this.email,
          newOrganization: this.organization,
        });
        await this.$auth.fetch();
        this.name = this.$auth.user().name;
        this.email = this.$auth.user().email;
        this.organization = this.$auth.user().organization;
        this.showSuccessProfileMessage = true;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    changePasswordModal() {
      this.shouldShowChangePassword = !this.shouldShowChangePassword;
      this.showSuccessPasswordMessage = false;
      this.currentPassword = null;
      this.newPassword = null;
      this.confirmNewPassword = null;
    },
    async handleChangePassword() {
      try {
        await this.changePassword({
          data: {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmNewPassword,
          },
        });
        this.showSuccessPasswordMessage = true;
        this.currentPassword = null;
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  computed: {
    ...mapState('user', ['isSavingProfile', 'isChangingPassword']),
    ...mapGetters('qapp', ['title']),
    currentPassword: {
      get() {
        return this.$store.state.user.currentPassword;
      },
      set(value) {
        this.$store.commit('user/SET_CURRENT_PASSWORD', value);
      },
    },
    newPassword: {
      get() {
        return this.$store.state.user.newPassword;
      },
      set(value) {
        this.$store.commit('user/SET_NEW_PASSWORD', value);
      },
    },
    confirmNewPassword: {
      get() {
        return this.$store.state.user.confirmNewPassword;
      },
      set(value) {
        this.$store.commit('user/SET_PASSWORD_CONFIRMATION', value);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
@import '../../../static/variables';
.title {
  color: white;
}
.changePassword .modal-content {
  background: $darkBlue;
}

.tablet-nav {
  display: none;
}

.navbar-menu {
  padding: 0 0 0 0em;
}

.navbar-menu .is-active {
  padding-left: 1em;
}
@media only screen and (max-width: 1088px) {
  .desktop-nav {
    display: none;
  }

  .tablet-nav {
    display: inline-block;
  }
}
</style>
