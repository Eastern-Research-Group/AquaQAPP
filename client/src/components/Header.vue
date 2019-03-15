<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
            AquaQAPP
            </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>

            <v-btn
               v-if="!$store.state.isUserLoggedIn"
               @click="navigateTo({name: 'login'})"
               flat dark
            >Log In</v-btn>

            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                @click="navigateTo({name: 'register'})"
                flat dark
            >Sign Up</v-btn>

            <v-toolbar-title
                    class="mr-4 pt-3"
                    v-if="$store.state.isUserLoggedIn"
            >Welcome {{user_Name}}!</v-toolbar-title>

            <v-btn
                    v-if="$store.state.isUserLoggedIn"
                    @click="logout"
                    flat dark
            >Log Out</v-btn>



        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        props: [
            'userName'
        ],
        data: function () {
          return {
              user_Name: this.$store.state.user.userName
          }
        },
        methods: {
            navigateTo (route) {
                this.$router.push(route)
            },
            logout () {
                this.$store.dispatch('setToken', null);
                this.$store.dispatch('setUser', null);
                this.$router.push({name: 'root'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    cursor: pointer;
}
</style>
